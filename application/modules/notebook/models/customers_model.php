<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Customers_model extends CI_Model {
	
	protected $table = "customers";
	
		public function __construct()
	{
		$this->load->database();
	}

	//  функция обновляет значение id черного списка удаляемого елемента на значение по умолчанию (т.е 1)
	//  для каждого заказчика 	
	// * в случае $item='' - обновляются все данные заказчика с порядковым номером $itemID.
	public function update_blackid($item=FALSE,$itemID=FALSE,$data=array()) 
	{	
		if ($item!='blacklist') {
			$this->db->where('id', $itemID);
		} else {
			$this->db->where($item .'ID', $itemID);
		}
		$query = $this->db->update($this->table, $data);
		return $query;
	}
	
	// функция добавления нового елемента в таблицу заказчиков
	// * возвращает id нового елемента	
		public function insert_data($data=array())
	{
		$query = $this->db->insert($this->table,$data);
		return $this->db->insert_id();
	
	}

	
}
