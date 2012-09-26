<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Orders_model extends CI_Model {
	
	protected $table = "orders";
	
		public function __construct()
	{
		$this->load->database();
	}
	
	//  функция возврата заказа, id которого равен заданному параметром
		public function get_unit($id=FALSE) 
	{
		$this->db->select('id');
		$query = $this->db->get_where($this->table,array('id'=>$id));
		
		if ($query->num_rows() > 0) {
			return $query->result();
		}  else { return FALSE; }
	}
	
	//  функция возврата списка id заказов, относящихся к конкретной категории
		public function get_id($categoryID=FALSE,$filter=FALSE,$done=FALSE) 
	{
		$this->db->select('id');
		if ($filter) {
			$query = $this->db->get_where($this->table,array('categoryID'=>$categoryID,'done'=>$done));
		} else {
			$query = $this->db->get_where($this->table,array('categoryID'=>$categoryID));
		}
		return $query->result();	
	}
	
	// 	функция возврата id заказчика заданного параметром заказа	
		public function get_custom_id($order=FALSE) 
	{
		$this->db->select('customerID');
		$query = $this->db->get_where($this->table,array('id'=>$order));
		
		if ($query->num_rows() > 0) {
			$row = $query->row();
			return $row->customerID;
		} else {
			return FALSE;
		}
	}	
	
	// 	функция возврата идентификатора($done==0 или 1) выполнения заказа, заданного параметром id	
		public function get_done_id($order=FALSE) 
	{
		$this->db->select('done');
		$query = $this->db->get_where($this->table,array('id'=>$order));
		
		if ($query->num_rows() > 0) {
			$row = $query->row();
			return $row->done;
		} else {
			return FALSE;
		}
	}	
	
	// 	функция проверки наличия заказа в Корзине (т.е categoryID=1)
		public function is_in_trash($id=FALSE) 
	{
		$this->db->select('categoryID');
		$query = $this->db->get_where($this->table,array('id'=>$id));
		$row = $query->row();
		
		if ($row->categoryID==1) {
			return TRUE;
		} else return FALSE;
	}	
	
	//  функция обновляет значение id удаляемого елемента на значение по умолчанию (т.е 1)
	//* в случае, когда $item='', подразумевается что удаляется весь заказ, и второй параметр
	//  указывает на id данного заказа.
		public function update_itemid($item=FALSE,$itemID=FALSE,$data=array()) 
	{
		if (($item!='category')and($item!='master')and($item!='seller')) 
		{
			$this->db->where('id', $itemID);
		} else {
			$this->db->where($item .'ID', $itemID);
		}
		$query = $this->db->update($this->table, $data);
		return $query;
	}
	
	// функция добавления нового елемента в таблицу заказов
	// * возвращает id нового елемента		
		public function insert_data($data=array())
	{
		$query = $this->db->insert($this->table,$data);
		return $this->db->insert_id();
	}
	
	// функция search_id() возвращает ассоц. масив порядковых номеров заказов,
	// найденных по критериям $terms в поле $field (а также, если необходимо, с проверкой диапазона дат приема заказов, если параметр $between не равен нулю)
	public function search_id($field=FALSE,$terms='',$between=0,$first_date='',$second_date='',$filter=0,$done=0) 
	{	
		// если поля даты - преобразовываем дату в нужный формат
		if (($field=='date_start')or($field=='date_end')or($field=='notified')or($field=='gdate')or($field=='sold'))
		{
			$date = DateTime::createFromFormat('d.m.Y',$terms);
			$terms = $date->format('Y-m-d');
		}
		$this->db->select('id');
		if (($field=='id')or($field=='total')or($field=='masterID')or($field=='sellerID')or($field=='customerID')) {
			$this->db->where($field, $terms); // если поля числовые, то совпадение точное
		} else {
			$this->db->like($field, $terms);
		}
		// проверяем, равен ли нулю параметр $between. Если нет, ставим ограничения 
		// по дате приема заказов от $first_date до $second_date
		if ($between) {
			$date = DateTime::createFromFormat('d.m.Y',$first_date);
			$first_date = $date->format('Y-m-d');
			
			$date = DateTime::createFromFormat('d.m.Y',$second_date);
			$second_date = $date->format('Y-m-d');
			
			$this->db->where('date_start >=', $first_date); 
			$this->db->where('date_start <=', $second_date); 
		}
		if ($filter) {
			$this->db->where('done',$done);
		}
		$this->db->where_not_in('categoryID', 1); // исключаем корзину
		$query = $this->db->get($this->table);
		
		if ($query->num_rows() > 0)
		{
			return $query->result();
		} else { return FALSE; }
	}
	
	// функция search() возвращает ассоц. масив порядковых номеров заказов и назв. продукта,
	// найденных по критериям $terms в поле $field (а также, если необходимо, с проверкой диапазона дат приема заказов, если параметр $between не равен нулю)
	public function search($field=FALSE,$terms='',$between=0,$first_date='',$second_date='',$filter=0,$done=0)  
	{	
		// если поля даты - преобразовываем дату в нужный формат
		if (($field=='date_start')or($field=='date_end')or($field=='notified')or($field=='gdate')or($field=='sold'))
		{
			$date = DateTime::createFromFormat('d.m.Y',$terms);
			$terms = $date->format('Y-m-d');
		}
		
		$this->db->select('id,product as name');
		if (($field=='id')or($field=='total')or($field=='masterID')or($field=='sellerID')or($field=='customerID')) {
			$this->db->where($field, $terms); // если поля числовые, то совпадение точное
		} else {
			$this->db->like($field, $terms);
		}
		// проверяем, равен ли нулю параметр $between. Если нет, ставим ограничения 
		// по дате приема заказов от $first_date до $second_date
		if ($between) {
			$date = DateTime::createFromFormat('d.m.Y',$first_date);
			$first_date = $date->format('Y-m-d');
			
			$date = DateTime::createFromFormat('d.m.Y',$second_date);
			$second_date = $date->format('Y-m-d');
			
			$this->db->where('date_start >=', $first_date); 
			$this->db->where('date_start <=', $second_date); 
		}
		if ($filter) {
			$this->db->where('done',$done);
		}
		$this->db->where_not_in('categoryID', 1)->order_by('id','desc'); // исключаем корзину
		$query = $this->db->get($this->table);
		
		if ($query->num_rows() > 0)
		{
			return $query->result();
		} else { return FALSE; }
	}	
}
