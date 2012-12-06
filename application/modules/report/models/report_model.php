<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Report_model extends CI_Model {

	function __construct() {
		parent::__construct();
	}
	
	function getReportData($order_id) {
		$this->db->select('orders.*, customers.*, masters.name as master_name');
		$this->db->from('orders');
		$this->db->join('customers', 'orders.customerID = customers.id', 'left');
		$this->db->join('masters', 'orders.masterID = masters.id', 'left');
		$this->db->where('orders.id', $order_id); // , false);
		
		$query = $this->db->get();
		if ($query->num_rows() > 0)
		{
			$rows = $query->result_array();
			return $rows[0];
		}
		return false;
	}
}