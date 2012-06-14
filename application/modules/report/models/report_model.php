<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Report_model extends CI_Model {

	function __construct() {
		parent::__construct();
	}
	
	function getReportData($order_id) {
		$this->db->select('Orders.*, Customers.*, Masters.name as master_name');
		$this->db->from('Orders');
		$this->db->join('Customers', 'Orders.customerID = Customers.id', 'left');
		$this->db->join('Masters', 'Orders.masterID = Masters.id', 'left');
		$this->db->where('Orders.id', $order_id); // , false);
		
		$query = $this->db->get();
		if ($query->num_rows() > 0)
		{
			$rows = $query->result_array();
			return $rows[0];
		}
		return false;
	}
}