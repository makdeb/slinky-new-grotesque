<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Category_model extends CI_Model {
	
	protected $table = "categories";
	
		public function __construct()
	{
		$this->load->database();
	}
	
	//  функция возврата списка id категорий, являющихся подкатегориями заданной параметром
		public function get_id($parentID=FALSE) 
	{
	
		// записываем список id существующих корневых категорий в массив $data['categories']
		$this->db->select('id');
		$query = $this->db->get_where($this->table,array('parentID'=>$parentID));
		return $query->result();	
	}
	
	//  функция возврата списка id и имен категорий, являющихся подкатегориями заданной параметром
	public function get_categories($parentID=FALSE) 
	{
		$this->db->where('parentID',$parentID);
		$this->db->select('id,name');
		$this->db->from($this->table);
		
		$query = $this->db->get();
		if ($query->num_rows() > 0)
		{
			return $query->result();
		} else { return FALSE; }

	}

}
