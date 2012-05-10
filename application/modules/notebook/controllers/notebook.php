<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Notebook extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	
	private $deletions=array();  // свойство класса Notebook, которое импользуется для удаления категорий
	 
	public function __construct() {
		
		parent::__construct();

		$this->load->database();
		$this->load->helper(array('form', 'url'));

	}  
	 
	public function index()
	{
		$this->load->view('index');
	}
	
	// функция check_cat() , возвращающая json-строку из всех существующих категорий  
	
	public function check_cat() {
		
		$data = array();
		
		$this->db->select('idCategories as id,name');
		$this->db->from('categories');
		
		$query = $this->db->get();
		
		$data['records'] = json_encode($query->result());
		$data['error'] = json_last_error();
		
		if (($data['error'] !== JSON_ERROR_NONE)||($data['records'] === '[]')) {
				unset($data['records']);
				$data['records'] = '[]';
				$data['json'] = '{"success":false,"category":' .$data['records'] .'}';
				
			} else  $data['json'] = '{"success":true,"category":' .$data['records'] .'}';
				
	
		// вивід результату
		// $this->load->view('test_json.php',$data);
		echo $data['json'];
		
		
	}
	
	// функция check_masters() , возвращающая json-строку из всех существующих мастеров
	
	public function check_masters() {
		
		$data = array();
		
		$this->db->select('idMasters as id,name');
		$this->db->from('masters');
		
		$query = $this->db->get();
		
		$data['records'] = json_encode($query->result());
		$data['error'] = json_last_error();
		
		if (($data['error'] !== JSON_ERROR_NONE)) {
				unset($data['records']);
				$data['records'] = '[]';
				$data['json'] = '{"success":false,"master":' .$data['records'] .'}';
				
			} else  $data['json'] = '{"success":true,"master":' .$data['records'] .'}';
				
	
		// вивід результату
		// $this->load->view('test_json.php',$data);
		echo $data['json'];
		
		
	}
	
	// функция get_categories() , возвращающая json-строку дерева категорий и заказов 
	// по указанному id родительской категории
		
	public function get_categories($node=0) {
		$node = $this->input->get('node');	// принимаем параметр родительской категории из url
		// для начала преобразуем строку формата "сID" из url в строку с номером родительской категории	
		$node = preg_replace("/[^0-9]/", '', $node);
		$data = array();
		
		// если parentID не указан, то выбираем все корневые категории
		
		if ($node==0) {
		
		// записываем список id существующих корневых категорий в массив $data['categories']
		// и подсчитываем ихнее количество
		
		$this->db->select('idCategories');
		$query = $this->db->get_where('categories',array('parentID'=>$node));
		$data['categories'] = $query->result();
		
		$data['count'] = count($data['categories']);
			
		
		// делаем выборку необходимых полей корневых категорий
		
		$this->db->where('categories.parentID',$node);
		$this->db->select('idCategories as id,name');
		$this->db->from('categories');
		
		$query = $this->db->get();
		
		// кодируем json
		$data['records'] = json_encode($query->result());	
		$data['error'] = json_last_error();
		
		// проверяем ошибки и отсутсвие категорий
		if (($data['error'] !== JSON_ERROR_NONE)||($data['records'] === '[]')) {
				unset($data['records']);
				$data['records'] = '[]';
				$data['json'] = '{"success":false,"product":' .$data['records'] .'}';
		// якщо помилок немає і запис знайдено, то формуємо json-строку зі значенням true 		
			} else { 
				// если ошибок нет, компонируем нужную строку, заменняя id категорий на формaт "сID"
			
				$data['json'] = '{"success":true,"product":' .$data['records'] .'}';
					foreach ($data['categories'] as $category) {
						foreach ($category as $field => $value) {
							$data['json'] = str_replace('"' .$value .'"','"c' .$value .'"',$data['json']);
						}
					}
			}
		
		} else {
			/* если parentID указан, то выбираем категории c parentID равным указанному параметру,
			   а также все заказы CategoryID которых равен данному параметру. 	
			*/
			
							
			// записываем список id существующих корневых категорий в массив $data['categories']
		    // и подсчитываем ихнее количество
					
				$this->db->select('idCategories');
				$query = $this->db->get_where('categories',array('parentID'=>$node));
				$data['categories'] = $query->result();
				
				$data['count_cat'] = count($data['categories']);
			
			// аналогично для заказов с CategoryID равным нашему параметру
				
				$this->db->select('idOrders');
				$query = $this->db->get_where('orders',array('categoryId'=>$node));
				$data['orders'] = $query->result();
				
				$data['count_ord'] = count($data['orders']);
				
			// sql-запрос, производящий выборку нужных полей из двух таблиц - категорий и заказов
				
				$sql = "SELECT idCategories as id,name FROM ".$this->db->dbprefix('categories')." WHERE parentID = ? UNION ALL SELECT idOrders, product FROM ".$this->db->dbprefix('orders')." WHERE categoryId = ?";
				$query = $this->db->query($sql, array($node, $node));   
			

			$data['records'] = json_encode($query->result());	
			$data['error1'] = json_last_error();
			
			//проверка ошибок
			if (($data['error1'] !== JSON_ERROR_NONE)) {
				unset($data['records']);
				$data['records'] = '[]';
				$data['json'] = '{"success":false,"product":' .$data['records'] .'}';
				
			} else  {
				
				// если ошибок нет, формируем нужную строку с заменой id категорий на формaт "сID",
				// а id-заказов на формат "pID"
				$data['json'] = '{"success":true,"product":' .$data['records'] .'}';

				foreach ($data['categories'] as $category) {
						
					foreach ($category as $field => $value) {
							$data['json'] = preg_replace('"' .$value .'"','c' .$value,$data['json'],1);

						}			
				}

				foreach ($data['orders'] as $order) {
						foreach ($order as $field => $value) {
							$data['json'] = str_replace('"' .$value .'"','"p' .$value .'"',$data['json']);
						}
					}
				
					
		}

		}
		
		//$this->load->view('test_json.php',$data);
		echo $data['json'];
		
	}
	
	// функция add_cat(), добавляющая новую категорию
	// * принимает в качестве параметра имя и id родительской категории, либо 0 в случае создания корневого каталога
	// функция выводит json-строку в формате '{"success": TRUE/FALSE,"message":"..."}'
	public function add_category($name='',$parent=0) {
		
		$name = $this->input->get('name');
		$parent = $this->input->get('parent');
		$parent = preg_replace("/[^0-9]/", '', $parent); // преобразуем строку формата "сParentID" из url в строку с номером родительской категории
		
		if (!$name)
		{
			echo '{"success":false,"message":"Помилка при створенні категорії"}';
			return;
		}
				
		$return='';
		$data = array();
		
		$data['parentID']  = $parent;
		$data['name']  = $name;
		
		$query = $this->db->insert('categories',$data);
	
			if ($query===TRUE)
			{
				$return = '{"success":true,"message":"Категорія була успішно створена"}';
			} else
			{
				$return = '{"success":false,"message":"Помилка при створенні категорії"}';
			}
		
		echo $return;
		
	}
	
	// функция update_cat(), позволяющая переименовать существующую категорию
	// * принимает в качестве параметра новое имя и id категории
	// функция выводит json-строку в формате '{"success": TRUE/FALSE,"message":"..."}'
	public function update_category($name='',$id='') {
		
		$name = $this->input->get('name');
		$id = $this->input->get('id');
		$id = preg_replace("/[^0-9]/", '', $id); // преобразуем строку формата "сID" из url в строку с номером категории
		
		if ((!$id)||(!$name)) { echo '{"success":false,"message":"Помилка при перейменуванні категорії"}'; return;}
		$return='';
		$data = array();
		
		$data['name']  = $name;
		
		$this->db->where('idCategories', $id);
		$query = $this->db->update('categories', $data);
		
		if ($query===TRUE)
			{
				$return = '{"success":true,"message":"Категорія була успішно перейменована"}';
			} else
			{
				$return = '{"success":false,"message":"Помилка при перейменуванні категорії"}';
			}
		
		echo $return;		
	}
	
	// функция remove_category(), позволяющая удалить существующую категорию, а также
	// все подкатегории и заказы с подзаказами
	public function remove_category($id='') {
	
		$id = $this->input->get('id'); // принимаем параметр категории из url
		$id = preg_replace("/[^0-9]/", '', $id); // преобразуем строку формата "сID" из url в строку с номером категории	
		
		// в случае отсутствия параметра - ошибка
		if (!$id) {
			echo '{"success":false,"message":"Помилка при видаленні категорії"}'; 
			return;
		}
		
		// записываем в свойство deletions класса Notebook id удаляемой категории
		$this->deletions[]=$id;
		
		// обращаемся к вспомагательной приватной функции _find_category(), передавая ей
		// в качестве параметра id удаляемой категории
		$this->_find_category($id);
	
		// для всех значений id из массива-свойства $deletions удаляем все заказы,	
		// для которых id категории совпадает с данным значением
		foreach ($this->deletions as $record) {

			$query1 = $this->db->delete('orders', array('categoryId' => $record));
				if ($query1===FALSE) {
					echo '{"success":false,"message":"Помилка при видаленні категорії"}'; 
					return;
				}
			
				}
		
		// для всех значений id из массива-свойства $deletions удаляем все категории
		foreach ($this->deletions as $record) {

			$query2 = $this->db->delete('categories', array('idCategories' => $record));
			
				if ($query2===FALSE) {
						echo '{"success":false,"message":"Помилка при видаленні категорії"}'; 
						return;
					}
				
				}
		
		echo '{"success":true,"message":"Категорія та всі її підкатегорії були успішно видалені"}';
		
		
	}
	
	private function _find_category($node='') {
		
		// находим в таблице категорий все, у которых id родительской категории
		// совпадает с принимаемым параметром
		
		$this->db->select('idCategories');
		$query = $this->db->get_where('categories',array('parentID'=>$node));
		$data['categories'] = $query->result_array();
		
		/* для каждой такой категории берем значение id и записываем в массив $deletions,
		   являющийся свойством класса Notebook,
		   после чего рекурсивно обращаемся к фунции _find_category(), 
		   передавая ей в качестве параметра id текущей категории
		*/
		foreach ($data['categories'] as $category) {
						
					foreach ($category as $field => $value) {
							$this->deletions[]=$value;
							$this->_find_category($value);
						}			
				}
				
				
	}
	
	
}

/* End of file notebook.php */
/* Location: ./application/controllers/notebook.php */