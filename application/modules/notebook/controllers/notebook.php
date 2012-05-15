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
	
	// функция check_guarantee() , возвращающая json-строку из всех существующих гарантий
	
	public function check_guarantee() {
		
		$data = array();
		
		$this->db->select('idGuarantee as id,name');
		$this->db->from('guarantee');
		
		$query = $this->db->get();
		
		$data['records'] = json_encode($query->result());
		$data['error'] = json_last_error();
		
		if (($data['error'] !== JSON_ERROR_NONE)) {
				unset($data['records']);
				$data['records'] = '[]';
				$data['json'] = '{"success":false,"guarantee":' .$data['records'] .'}';
				
			} else  $data['json'] = '{"success":true,"guarantee":' .$data['records'] .'}';
				
	
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
		if ($id==1) { echo '{"success":false,"message":"Помилка при перейменуванні категорії"}'; return;} // запрет переименования Корзины
		
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
		
		// в случае отсутствия параметра или попытки удалить Корзину - ошибка
		if ((!$id)||($id==1)) {
			echo '{"success":false,"message":"Помилка при видаленні категорії"}'; 
			return;
		}
		
		$data = array();
		$data['categoryId']  = 1; // id корзины
		
		// записываем в свойство deletions класса Notebook id удаляемой категории
		$this->deletions[]=$id;
		
		// обращаемся к вспомагательной приватной функции _find_category(), передавая ей
		// в качестве параметра id удаляемой категории
		$this->_find_category($id);
	
		// для всех значений id из массива-свойства $deletions удаляем все заказы,	
		// для которых id категории совпадает с данным значением
		foreach ($this->deletions as $record) {
			
			$this->db->where('categoryId', $record);
			$query1 = $this->db->update('orders', $data);
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
	
	// функция remove_order(), позволяющая удалить (перенести в корзину) существующий заказ
	public function remove_order($id=0) {
		$id = $this->input->get('id');  // принимаем параметр заказа из url
		$id = preg_replace("/[^0-9]/", '', $id);  // преобразуем строку формата "рID" из url в строку с номером заказа
		
		// в случае отсутствия параметра - ошибка
		if (!$id) { echo '{"success":false,"message":"Помилка при видаленні замовлення"}'; return;}
		
		$data = array();
		$data['categoryId']  = 1; // id корзины
		
		// для заданного id удаляем заказ
		$this->db->where('idOrders', $id);
		$query = $this->db->update('orders', $data);
				if ($query===FALSE) {
					echo '{"success":false,"message":"Помилка при видаленні замовлення"}'; 
					return;
				}
		// вывод json-строки
		echo '{"success":true,"message":"Замовлення було успішно перенесено до корзини"}';	
		
	}
	
	
	// функция fill_order(), реализующая автозаполнение формы
	public function fill_order($id=0) {
		$id = $this->input->get('id');  // принимаем параметр заказа из url
		$id = preg_replace("/[^0-9]/", '', $id); // преобразуем строку формата "рID" из url в строку с номером заказа
		
		$data = array();
		
		//вибір замовлення із заданим id
		
		if (!$id) {
			{ echo '{"success":false,"message":"Помилка отримання данних"}'; return;}
		} else {
				$this->db->where('orders.idOrders', $id); 
				
			// вибір тільки потрібних полів	і об'єднання з іншими таблицями
				$this->db->select('idOrders as id,type,date_start,date_end,product,idCategories,customers.name as customer,address,phone,wphone,hphone,complaints,performance,notes,sum,details,idMasters,idGuarantee,certificate,gdate,comments,posted,pstartdate,penddate,notified');
				$this->db->from('orders');
				$this->db->join('categories', 'categories.idCategories = orders.categoryID');
				$this->db->join('customers', 'customers.idCustomers = orders.customerID');
				$this->db->join('masters', 'masters.idMasters = orders.masterID');
				$this->db->join('guarantee', 'guarantee.idGuarantee = orders.guaranteeID');

			$query = $this->db->get();
			$data['records'] = json_encode($query->row());	
			$data['error'] = json_last_error();
			
		// перевірка помилок, або відсутності запису під даним id
		// якщо є помилки або відсутній запис з даним id, стираємо масив і записуємо у нього строкове значення '[]'
		// після чого формуємо json-строку зі значенням false	
			if (($data['error'] !== JSON_ERROR_NONE)||($data['records'] === '[]')) {
				unset($data['records']);
				$data['records'] = '[]';
				$data['json'] = '{"success":false,"message":"Помилка отримання данних"}';
		// якщо помилок немає і запис знайдено, то формуємо json-строку зі значенням true 		
			} else { $data['json'] = '{"success":true,"order":' .$data['records'] .'}';
					$data['json'] = str_replace(':null',':""',$data['json']);
				}
		} 
		echo $data['json'];
	}
	
	
	// функция update_order(), реализующая изменение данных заказа
	public function update_order($id=0) {
		$id = $this->input->get('id'); // принимаем параметр заказа из url
		$id = preg_replace("/[^0-9]/", '', $id); // преобразуем строку формата "рID" из url в строку с номером заказа
		
		// в случае отсутствия id заказа - ошибка
		if (!$id) {
			echo '{"success":false,"message":"Помилка збереження данних"}'; 
			return;
		}
		
		$data = array();
		$new = array();
			
		// заполняем массив $data данными из формы
		$data['type']  = $this->input->post('type');
		$data['product']  = $this->input->post('product');
		$data['categoryID']  = $this->input->post('categoryID');
		$data['complaints']  = $this->input->post('complaints');
		$data['performance']  = $this->input->post('performance');
		$data['notes']  = $this->input->post('notes');
		$data['sum']  = $this->input->post('sum');
		$data['details']  = $this->input->post('details');
		$data['masterID']  = $this->input->post('masterID');
		$data['guaranteeID']  = $this->input->post('guaranteeID');
		$data['certificate']  = $this->input->post('certificate');
		$data['comments']  = $this->input->post('comments');
		$data['posted']  = $this->input->post('posted');
	
		// для полей типа date производим проверку наличия значения в поле.
		// При отсутствии такого значения записываем NULL,
		// при наличии - преобразованное из строки в тип date значение
		if (!$this->input->post('gdate')) {
			$data['gdate'] = NULL;
		} else {
			$date =	DateTime::createFromFormat('Y-m-d',$this->input->post('gdate'));
			$data['gdate']  = $date->format('Y-m-d');
		}
		
		if (!$this->input->post('pstartdate')) {
			$data['pstartdate'] = NULL;
		} else {
			$date =	DateTime::createFromFormat('Y-m-d',$this->input->post('pstartdate'));
			$data['pstartdate']  = $date->format('Y-m-d');
		}
		
		if (!$this->input->post('penddate')) {
			$data['penddate'] = NULL;
		} else {
			$date =	DateTime::createFromFormat('Y-m-d',$this->input->post('penddate'));
			$data['penddate']  = $date->format('Y-m-d');
		}
		
		if (!$this->input->post('notified')) {
			$data['notified'] = NULL;
		} else {
			$date =	DateTime::createFromFormat('Y-m-d',$this->input->post('notified'));
			$data['notified']  = $date->format('Y-m-d');
		}
	
		// выбираем id заказчика данного заказа	
		$query = $this->db->get_where('orders', array('idOrders' => $id));
		$row  = $query->row();
		$new['customer'] = $row->customerID;
		
		// обновляем данные
		$this->db->where('idOrders', $id);
		$query = $this->db->update('orders', $data);
		
			if ($query===FALSE) {
					echo '{"success":false,"message":"Помилка збереження данних"}'; 
					return;
				}
		
		// очистка массива для записи новых данных
		unset($data);
		$data = array();
		
		// наполнение массива данными, относящимися только к заказчику
		$data['name']  = $this->input->post('name');
		$data['address']  = $this->input->post('address');
		$data['phone']  = $this->input->post('phone');
		$data['wphone']  = $this->input->post('wphone');
		$data['hphone']  = $this->input->post('hphone');
		
		// обновляем данные заказчика
		$this->db->where('idCustomers', $new['customer']);
		$query = $this->db->update('customers', $data);
		
			if ($query===FALSE) {
						echo '{"success":false,"message":"Помилка збереження данних"}'; 
						return;
					}
					
		// вывод json-строки
		echo '{"success":true,"message":"Замовлення було успішно змінено"}';	
		
	}	
	
	
}

/* End of file notebook.php */
/* Location: ./application/controllers/notebook.php */