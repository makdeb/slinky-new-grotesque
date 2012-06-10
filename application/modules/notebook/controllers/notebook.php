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
	
	private $deletions=array();  // свойство класса Notebook, которое используется для удаления категорий
	 
	public function __construct() {
		parent::__construct();
		
		$this->load->helper(array('form', 'url'));
		$this->load->model(array('notebook_model','category_model','orders_model','customers_model'));
	} 
	 
	public function index()
	{
		$this->load->view('index');
	}
	
	// функция check() , возвращающая json-строку из всех существующих категорий,
	// продавцов, мастеров, шаблонов или причин черного списка, в зависимости
	// от параметра $table 
	
	public function check($table='') {
		$table = $this->input->get('table'); // принимаем параметр из url
		
		// преобразуем параметр из названия таблицы в "удобный" формат
		switch ($table):
				    case 'sellers':
				        $unit = "seller";
				        break;
				    case 'masters':
				        $unit = "master";
				        break;
				    case 'categories':
				        $unit = "category";
				        break;
					case 'notestpl':
				        $unit = "template";
				        break;
					case 'blacklist':
				        $unit = "reason";
				        break;	
					default:
				        $unit = FALSE;
				endswitch;
		
		// если параметр не указывает на существующую таблицу -- ошибка		
		if (!$unit) {
			echo '{"success":false,"message":"Ошибка получения данных"}';
			return;
		}		
				
		$data = array();
		
		// кодируем json-строку из полученного масива данных 
		$data['records'] = json_encode($this->notebook_model->get_units($table));
		$data['error'] = json_last_error();
		
		// проверка ошибок
		if (($data['error'] !== JSON_ERROR_NONE)||($data['records'] === '[]')) {
				unset($data['records']);
				$data['records'] = '[]';
				$data['json'] = '{"success":false,"' .$unit .'":' .$data['records'] .'}';
				
			} else  $data['json'] = '{"success":true,"' .$unit .'":' .$data['records'] .'}';
		
		// вывод результата		
		echo $data['json'];	
	}

	
	// функция treeview() , возвращающая json-строку дерева категорий и заказов 
	// по указанному id родительской категории
	
	public function treeview($node=0) {
		$node = $this->input->get('node');	// принимаем параметр родительской категории из url
		// для начала преобразуем строку формата "сID" из url в строку с номером родительской категории	
		$node = preg_replace("/[^0-9]/", '', $node);
		
		$data = array();
	
		// если parentID не указан, то выбираем все корневые категории
		if ($node==0) {
		
		// записываем список id существующих корневых категорий в массив $data['categories']
		// и подсчитываем ихнее количество
		$data['categories'] = $this->category_model->get_id($node);
		$data['count'] = count($data['categories']);
	
		// кодируем json
		$data['records'] = json_encode($this->category_model->get_categories($node));	
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
		
		} 
		 else {
			/* 
				если parentID указан, то выбираем категории c parentID равным указанному параметру,
				а также все заказы CategoryID которых равен данному параметру. 	
			*/
			
			// записываем список id существующих корневых категорий в массив $data['categories']
		    // и подсчитываем ихнее количество
				$data['categories'] = $this->category_model->get_id($node);
				$data['count_cat'] = count($data['categories']);
			
			// аналогично для заказов с CategoryID равным нашему параметру
				$data['orders'] = $this->orders_model->get_id($node);
				$data['count_ord'] = count($data['orders']);
				
			// кодируем json-строку из результатов выборки
			$data['records'] = json_encode($this->notebook_model->get_treeview($node));	
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

				foreach ($data['orders'] as $order)	{
						foreach ($order as $field => $value) {
							$data['json'] = str_replace('"' .$value .'"','"p' .$value .'"',$data['json']);
						}
				}
			}	
		}
		
		//вывод результата
		echo $data['json'];
		
	}
	
	// функция add_unit(), добавляющая новую категорию, нового мастера, продавца,
	// шаблон, или елемент ЧС. 
	// * принимает в качестве параметра имя таблицы, имя нового елемента и id родительской категории, либо 0 в случае создания корневого каталога
	// функция выводит json-строку в формате '{"success": TRUE/FALSE,"message":"..."}'
	
	public function add_unit($table='',$name='',$parent=0) {
		$table = $this->input->get('table'); // принимаем параметры из url
		$name = $this->input->get('name');
		$parent = $this->input->get('parent');
		
		// если 3й параметр задан, преобразовываем его
		if (($parent!=='')and($parent!=NULL))
			{
				$parent = preg_replace("/[^0-9]/", '', $parent);
			}
		
		// преобразуем параметр из названия таблицы в "удобный" формат
		switch ($table):
				    case 'sellers':
				        $unit = "seller";
				        break;
				    case 'masters':
				        $unit = "master";
				        break;
				    case 'categories':
				        $unit = "category";
				        break;
					case 'notestpl':
				        $unit = "template";
				        break;
					case 'blacklist':
				        $unit = "reason";
				        break;	
					default:
				        $unit = FALSE;
				endswitch;
		
		// если параметр $table не указывает на существующую таблицу -- ошибка		
		if (!$unit) {
			echo '{"success":false,"message":"Ошибка выбора данных для добавления"}';
			return;
		}	
		// если параметр $name не указан -- ошибка		
		if (!$name)
		{
			echo '{"success":false,"message":"Ошибка имени елемента"}';
			return;
		}
		
		// если мы добавляем новую категорию, и не получили коректный параметр родительской категории -- ошибка
		if (($unit=='category')and(!$parent)and($parent!=='0')) {
			echo '{"success":false,"message":"Ошибка выбора родительской категории"}'; return;
		}
		
		// проверка существования категории, для которой создаваемая станет дочерней
		// *в случае не корневой категории
		if (($unit=='category')and($parent)and($this->category_model->get_categories($parent)===FALSE)) {
		
			{
				echo '{"success":false,"message":"Ошибка создания категории"}'; return;
			}
		}
		
		$data = array();
		
		$data['name']  = $name;
		
		if ($unit=='category') {
			$data['parentID']  = $parent;
		}
		
		$query = $this->notebook_model->add_units($table,$data);		
		
		if ($query===TRUE)
			{
				echo '{"success":true,"message":"Елемент был успешно создан"}';
			} else
			{
				echo '{"success:false,"message":"Ошибка при создании нового елемента"}';
			}
	}
	
	// функция update_unit((), позволяющая переименовать существующую категорию, мастера, продавца,
	// шаблон, или елемент ЧС. 
	// * принимает в качестве параметра имя таблицы,новое имя елемента и id порядковый номер записи
	// функция выводит json-строку в формате '{"success": TRUE/FALSE,"message":"..."}'
	
	public function update_unit($table='',$name='',$id='') {
		$table = $this->input->get('table'); // принимаем параметры из url
		$name = $this->input->get('name');
		$id = $this->input->get('id');
		
		if (($id!=='')and($id!=NULL)) 
		{
			$id = preg_replace("/[^0-9]/", '', $id); // преобразуем строку формата "сID" из url в строку с числовым значением	
		}
		// преобразуем параметр из названия таблицы в "удобный" формат
		switch ($table):
				    case 'sellers':
				        $unit = "seller";
				        break;
				    case 'masters':
				        $unit = "master";
				        break;
				    case 'categories':
				        $unit = "category";
				        break;
					case 'notestpl':
				        $unit = "template";
				        break;
					case 'blacklist':
				        $unit = "reason";
				        break;	
					default:
				        $unit = FALSE;
				endswitch;
		
		// если параметр $table не указывает на существующую таблицу -- ошибка		
		if (!$unit) {
			echo '{"success":false,"message":"Ошибка выбора данных для обновления"}';
			return;
		}	
		
		// если параметры $name и $id не указаны -- ошибка	
		if ((!$id)||(!$name)) {
			 echo '{"success":false,"message":"Ошибка при переименовании елемента"}'; 
			 return;
		 }
		// запрет переименования Корзины
		if (($unit=='category')and($id==1)) {
			echo '{"success":false,"message":"Ошибка при переименовании Корзины"}';
		 	return;
		 } 
		// проверка существования записи с заданым id
		if ($this->notebook_model->get_units($table,$id)===FALSE) {
			echo '{"success":false,"message":"Ошибка выбора елемента для обновления"}';
		 	return;
		}
		
		$data = array();
		$data['name']  = $name;
		
		$query = $this->notebook_model->update_units($table,$id,$data);
		
		if ($query===TRUE)
			{
				echo '{"success":true,"message":"Елемент был успешно обновлен"}';
			} else
			{
				echo '{"success:false,"message":"Ошибка при обновлении елемента"}';
			}
		
	}
	
	// функция remove_unit(), позволяющая удалить существующую категорию, 
	// все подкатегории и заказы с подзаказами, а также любой елемент в справочнике
	// * принимает в качестве параметра имя таблицы и id порядковый номер записи
	// функция выводит json-строку в формате '{"success": TRUE/FALSE,"message":"..."}'
	public function remove_unit($table='',$id='') {
		$table = $this->input->get('table'); // принимаем параметры из url
		$id = $this->input->get('id');
		
		if (($id!=='')and($id!=NULL)) 
		{
			$id = preg_replace("/[^0-9]/", '', $id); // преобразуем строку формата "сID" из url в строку с числовым значением	
		}
		// преобразуем параметр из названия таблицы в "удобный" формат
		switch ($table):
				    case 'sellers':
				        $unit = "seller";
				        break;
				    case 'masters':
				        $unit = "master";
				        break;
				    case 'categories':
				        $unit = "category";
				        break;
					case 'notestpl':
				        $unit = "template";
				        break;
					case 'blacklist':
				        $unit = "blacklist";
				        break;	
					default:
				        $unit = FALSE;
				endswitch;
		
		// если параметр $table не указывает на существующую таблицу -- ошибка		
		if (!$unit) {
			echo '{"success":false,"message":"Ошибка выбора данных для удаления"}';
			return;
		}	
		
		// если параметр $id не указан или он недопустим -- ошибка	
		if ((!$id)||($id==1)) {
			 echo '{"success":false,"message":"Ошибка при удалении елемента"}'; 
			 return;
		 }
		
		// проверка существования записи с заданым id
		if ($this->notebook_model->get_units($table,$id)===FALSE) {
			echo '{"success":false,"message":"Ошибка выбора елемента для удаления"}';
		 	return;
		}
		
		$data = array();
		$data[$unit .'ID']  = 1; // id корзины или елемента по умолчанию
		
		// записываем в свойство deletions класса Notebook id удаляемой категории или записи
		$this->deletions[]=$id;
		
		if ($unit=='category') {
			// обращаемся к вспомагательной приватной функции _find_category(), передавая ей
			// в качестве параметра id удаляемой категории
			$this->_find_category($id);
		}	
		
		foreach ($this->deletions as $record) {
			if (($unit!='blacklist')and($unit!='template')) {
				$query = $this->orders_model->update_itemid($unit ,$record, $data);
				if ($query===FALSE) {
					echo '{"success":false,"message":"Ошибка удаления категории"}'; 
					return;
				}
			} elseif ($unit=='blacklist') {
				$query = $this->customers_model->update_blackid($unit ,$record, $data);
				if ($query===FALSE) {
					echo '{"success":false,"message":"Ошибка удаления елемента ЧС"}'; 
					return;
				}
			} else {
				break;
			}
		}
		
		// для всех значений id из массива-свойства $deletions удаляем все категории или записи
		foreach ($this->deletions as $record) {

			$query = $this->notebook_model->delete_units($table,$record);
			
				if ($query===FALSE) {
						echo '{"success":false,"message":"Ошибка удаления"}'; 
						return;
					}
				
				}
		
		echo '{"success":true,"message":"Елемент был успешно удален"}';
				
	}
	
	// вспомагательная функция _find_category(), используемая в remove_unit()
	// для проверки дочерних категорий удаляемой категории
	private function _find_category($node='') {
		
		// находим в таблице категорий все, у которых id родительской категории
		// совпадает с принимаемым параметром

		//	$data['categories'] = $query->result_array();
		$data['categories'] = $this->category_model->get_id($node);
		
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
	public function remove_order($id='') {
		$id = $this->input->get('id');  // принимаем параметр заказа из url
				
		if (($id!=='')and($id!=NULL)) 
		{
			$id = preg_replace("/[^0-9]/", '', $id); // преобразуем строку формата "pID" из url в строку с числовым значением	
		}
		
		// в случае отсутствия параметра - ошибка
		if (!$id) { 
			echo '{"success":false,"message":"Ошибка при удалении заказа"}';
			return;
		 }
		
		// проверка существования записи с заданым id
		if ($this->orders_model->get_unit($id)===FALSE) {
			echo '{"success":false,"message":"Ошибка выбора елемента для удаления"}';
		 	return;
		}
		
		// проверка отсутствия удаляемого заказа в Корзине
		if ($this->orders_model->is_in_trash($id)) {
			echo '{"success":false,"message":Заказ уже находится в Корзине"}';
		 	return;
		}
		
		$data = array();
		$data['categoryID']  = 1; // id корзины
		
		// для заданного id удаляем заказ (меняем текущее значение categoryID на значение корзины)
		$query = $this->orders_model->update_itemid('',$id, $data);
				if ($query===FALSE) {
					echo '{"success":false,"message":"Ошибка удаления"}'; 
					return;
				}
		
		// вывод json-строки
		echo '{"success":true,"message":"Заказ был успешно перенесён в Корзину"}';	
		
	}
	
	// функция fill_order(), реализующая автозаполнение формы
	public function fill_order($id=0) {
		$id = $this->input->get('id');  // принимаем параметр заказа из url
		
		if (($id!=='')and($id!=NULL)) 
		{
			$id = preg_replace("/[^0-9]/", '', $id); // преобразуем строку формата "рID" из url в строку с номером заказа
		}
		
		// в случае отсутствия параметра - ошибка
		if (!$id) { 
			echo '{"success":false,"message":"Ошибка выбора заказа"}';
			return;
		 }
		
		$data = array();
		
		//вибір замовлення із заданим id
			$query_result = $this->notebook_model->get_all_fields($id);
			if ($query_result===FALSE) {
				echo '{"success":false,"message":"Ошибка выбора елемента"}}'; // в случае отсутствия заказа с указанным id -- ошибка
				return;
			};
			$data['records'] = json_encode($query_result);	
			$data['error'] = json_last_error();
			
		// перевірка помилок, або відсутності запису під даним id
		// якщо є помилки або відсутній запис з даним id, стираємо масив і записуємо у нього строкове значення '[]'
		// після чого формуємо json-строку зі значенням false	
			if (($data['error'] !== JSON_ERROR_NONE)||($data['records'] === '[]')) {
				unset($data['records']);
				$data['records'] = '[]';
				$data['json'] = '{"success":false,"message":"Ошибка получения данных"}';
		// якщо помилок немає і запис знайдено, то формуємо json-строку зі значенням true 		
			} else { $data['json'] = '{"success":true,"order":' .$data['records'] .'}';
					$data['json'] = str_replace(':null',':""',$data['json']);
				}
		echo $data['json'];
	}

	// функция fill_customer(), реализующая создание нового заказа на осонове данных клиента
	// *принимает параметр заказа, из которого осуществляется копирование.
	public function fill_customer($id=0) {
		$id = $this->input->get('id');  // принимаем параметр заказа из url
		
		if (($id!=='')and($id!=NULL)) 
		{
			$id = preg_replace("/[^0-9]/", '', $id); // преобразуем строку формата "рID" из url в строку с номером заказа
		}
		
		// в случае отсутствия параметра - ошибка
		if (!$id) { 
			echo '{"success":false,"message":"Ошибка выбора заказа"}';
			return;
		 }
		
		// проверка существования записи с заданым id
		if ($this->orders_model->get_unit($id)===FALSE) {
			echo '{"success":false,"message":"Ошибка выбора елемента"}';
		 	return;
		}
		
		$data = array();
		$result = array();	
		
		// установка временной зоны
		date_default_timezone_set('Europe/Kiev');
		
		// заполняем массив $data данными из формы.
		// * записываем данные только заказчика
		$data['name']  = $this->input->post('name');
		$data['address']  = $this->input->post('address');
		$data['phone']  = $this->input->post('phone');
		$data['wphone']  = $this->input->post('wphone');
		$data['hphone']  = $this->input->post('hphone');
		$data['personaldata'] = $this->input->post('personaldata');
		if (!($data['blacklistID']  = $this->input->post('blacklistID'))) {
			$data['blacklistID'] = 1;
		};
		
		// порядковый номер нового клиента
		$insert_id = $this->customers_model->insert_data($data);
		if ($insert_id==FALSE) {
						echo '{"success":false,"message":"Ошибка сохранения данных"}'; 
						return;
					}
		
		// очистка массива $data и заполнение оного остальными данными заказа
		//* для полей без значений по умолчанию будет записыватся NULL
		unset($data);
		$data = array();
		
		$data['customerID'] = $insert_id; // запись номера заказчика
		$data['date_start'] = date("Y-m-d");  // сегодняшняя дата

		// записываем значения по умочанию
		$data['categoryID'] = 2;
		$data['sellerID'] = 1;
		$data['masterID'] = 1;
		
		$new_order = $this->orders_model->insert_data($data);
		$result['ID'] = $new_order;
		
		//вибір замовлення із нвоствореним id
			$query_result = $this->notebook_model->get_all_fields($result['ID']);
			if ($query_result===FALSE) {
				echo '{"success":false,"message":"Ошибка получения елемента"}}'; // в случае отсутствия заказа с новым id -- ошибка
				return;
			};
			$data['records'] = json_encode($query_result);	
			$data['error'] = json_last_error();
			
		// перевірка помилок
		// якщо є помилки , стираємо масив і записуємо у нього строкове значення '[]'
		// після чого формуємо json-строку зі значенням false	
			if (($data['error'] !== JSON_ERROR_NONE)||($data['records'] === '[]')) {
				unset($data['records']);
				$data['records'] = '[]';
				$data['json'] = '{"success":false,"message":"Ошибка получения данных"}';
		// якщо помилок немає і запис знайдено, то формуємо json-строку зі значенням true 		
			} else { $data['json'] = '{"success":true,"order":' .$data['records'] .'}';
					$data['json'] = str_replace(':null',':""',$data['json']);
				}
		echo $data['json'];
	}
	
	// функция update_order(), реализующая изменение данных заказа
	public function update_order() {
		
		$id = $this->input->post('id'); // принимаем параметр заказа
		
		// в случае отсутствия id заказа - ошибка
		if (!$id) {
			echo '{"success":false,"message":"Ошибка выбора заказа"}'; 
			return;
		}
		
		// проверка существования записи с заданым id
		if ($this->orders_model->get_unit($id)===FALSE) {
			echo '{"success":false,"message":"Ошибка выбора елемента"}';
		 	return;
		}
		
		$data = array();
		$new = array();
			
		// заполняем массив $data данными из формы

		$data['categoryID']  = $this->input->post('categoryID');
		$data['type']  = $this->input->post('type');
		$data['model'] = $this->input->post('model');
		// проверка заполнения поля "Виріб"
		if (!($data['product']  = $this->input->post('product'))) {
			echo '{"success":false,"message":"Поле "Изделие:" должно быть заполнено"}'; 
			return;
		};
		$data['serialnum'] = $this->input->post('serialnum');
		$data['factorynum'] = $this->input->post('factorynum');
		$data['guarantee']  = $this->input->post('guarantee');
		
		// для полей типа date производим проверку наличия значения в поле.
		// При отсутствии такого значения записываем NULL,
		// при наличии - преобразованное из строки в тип date значение
		if (!$this->input->post('notified')) {
			$data['notified'] = NULL;
		} else {
			$date =	DateTime::createFromFormat('d.m.Y',$this->input->post('notified'));
			$data['notified']  = $date->format('Y-m-d');
		}
		
		$data['complaints']  = $this->input->post('complaints');
		$data['performance']  = $this->input->post('performance');
		$data['notes']  = $this->input->post('notes');
		$data['sellerID']  = $this->input->post('sellerID');
		$data['check']  = $this->input->post('check');
		$data['comments']  = $this->input->post('comments');
		$data['masterID']  = $this->input->post('masterID');
		$data['master2ID']  = $this->input->post('master2ID');
		
		$data['worksum']  = $this->input->post('worksum');
		$data['worksum2']  = $this->input->post('worksum2');
		$data['details']  = $this->input->post('details');
		$data['transportation']  = $this->input->post('transportation');
		$data['total']  = $this->input->post('total');
		
		if (!$this->input->post('gdate')) {
			$data['gdate'] = NULL;
		} else {
			$date =	DateTime::createFromFormat('d.m.Y',$this->input->post('gdate'));
			$data['gdate']  = $date->format('Y-m-d');
		}
		
		// выбираем id заказчика данного заказа	
		$new['customer'] = $this->orders_model->get_custom_id($id);
		
		// обновляем данные
		$query = $this->orders_model->update_itemid('',$id,$data);
		
			if ($query===FALSE) {
					echo '{"success":false,"message":"Ошибка сохранения данных"}'; 
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
		$data['personaldata'] = $this->input->post('personaldata');
		$data['blacklistID']  = $this->input->post('blacklistID');
		
		// обновляем данные заказчика
		$query = $this->customers_model->update_blackid('',$new['customer'],$data);
		
			if ($query===FALSE) {
						echo '{"success":false,"message":"Ошибка сохранения данных"}'; 
						return;
					}
					
		// вывод json-строки
		echo '{"success":true,"message":"Заказ был успешно сохранен"}';	
		
	}	
	
	// функция create_order(), реализующая создание нового заказа
	public function create_order() {
	
		$data = array();
		$result = array();	
		
		// установка временной зоны
		date_default_timezone_set('Europe/Kiev');
		
		// заполняем массив $data данными из формы.
		// * первоначально записываем данные нового заказчика
		$data['name']  = $this->input->post('name');
		$data['address']  = $this->input->post('address');
		$data['phone']  = $this->input->post('phone');
		$data['wphone']  = $this->input->post('wphone');
		$data['hphone']  = $this->input->post('hphone');
		$data['personaldata'] = $this->input->post('personaldata');
		if (!($data['blacklistID']  = $this->input->post('blacklistID'))) {
			$data['blacklistID'] = 1;
		};
				
		$insert_id = $this->customers_model->insert_data($data);

		if ($insert_id==FALSE) {
						echo '{"success":false,"message":"Ошибка сохранения данных"}'; 
						return;
					}
		
		// очистка массива $data и заполнение оного остальными данными заказа
		unset($data);
		$data = array();
		
		$data['customerID'] = $insert_id; // запись номера заказчика
		$data['date_start'] = date("Y-m-d");  // сегодняшняя дата
		
		// проверка номера категории,
		// если отсутствует - записываем значение по умочанию
		if (!($data['categoryID']  = $this->input->post('categoryID'))) {
			$data['categoryID'] = 2;
		};
		$data['type']  = $this->input->post('type');
		$data['model'] = $this->input->post('model');
		// проверка заполнения поля "Виріб"
		if (!($data['product']  = $this->input->post('product'))) {
			echo '{"success":false,"message":"Поле "Изделие:" должно быть заполнено"}'; 
			return;
		};
		$data['serialnum'] = $this->input->post('serialnum');
		$data['factorynum'] = $this->input->post('factorynum');
		$data['guarantee']  = $this->input->post('guarantee');
		
		// для полей типа date производим проверку наличия значения в поле.
		// При отсутствии такого значения записываем NULL,
		// при наличии - преобразованное из строки в тип date значение
		if (!$this->input->post('notified')) {
			$data['notified'] = NULL;
		} else {
			$date =	DateTime::createFromFormat('d.m.Y',$this->input->post('notified'));
			$data['notified']  = $date->format('Y-m-d');
		}
		
		$data['complaints']  = $this->input->post('complaints');
		$data['performance']  = $this->input->post('performance');
		$data['notes']  = $this->input->post('notes');
		// проверка номера продавца,
		// если отсутствует - записываем значение по умочанию
		if (!($data['sellerID']  = $this->input->post('sellerID'))) {
			$data['sellerID']  = 1;
		}
		$data['check']  = $this->input->post('check');
		$data['comments']  = $this->input->post('comments');
		// проверка номера мастера,
		// если отсутствует - записываем значение по умочанию
		if (!($data['masterID']  = $this->input->post('masterID'))) {
			$data['masterID'] = 1;
		};
		$data['master2ID']  = $this->input->post('master2ID');
		$data['worksum']  = $this->input->post('worksum');
		$data['worksum2']  = $this->input->post('worksum2');
		$data['details']  = $this->input->post('details');
		$data['transportation']  = $this->input->post('transportation');
		$data['total']  = $this->input->post('total');
		
		if (!$this->input->post('gdate')) {
			$data['gdate'] = NULL;
		} else {
			$date =	DateTime::createFromFormat('d.m.Y',$this->input->post('gdate'));
			$data['gdate']  = $date->format('Y-m-d');
		}
		
		$new_order = $this->orders_model->insert_data($data);
		
		if ($new_order==FALSE) {
						echo '{"success":false,"message":"Ошибка при сохранении записи"}'; 
						return;
					}

		$result['ID'] = $new_order;
		$result['date'] = $data['date_start'];
		
		// вывод результирующей строки
		echo '{"success":true,"id":"' .$result['ID'] .'","date":"' .$result['date'] .'","message":"Заказ был успешно сохранен"}'; 
	}
	
}

/* End of file notebook.php */
/* Location: ./application/controllers/notebook.php */