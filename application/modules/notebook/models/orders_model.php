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
		public function get_id($categoryID=FALSE) 
	{
		$this->db->select('id');
		$query = $this->db->get_where($this->table,array('categoryID'=>$categoryID));
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
}
