<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Notebook_model extends CI_Model {

		public function __construct()
	{
		$this->load->database();
	}
	
	// функция возврата данных, необходимых для отображения ВСЕХ категорий,
	// мастеров, продавцов, шаблонов или причин ЧС в зависимости от $table. 
	// * id если указан, указывает на порядковый номер елемента в таблице
		public function get_units($table=FALSE,$id=FALSE) 
	{
		$this->db->select('id,name');
		$this->db->from($table);
		if ($id) {
			$this->db->where('id', $id);
		}
		
		$query = $this->db->get();
		if ($query->num_rows() > 0) {
			return $query->result();
		}  else { return FALSE; }

	}	
	
	// функция возврата данных, необходимых для отображения боковой панели
	// осуществляет выборку id и имен категорий и заказов на одном уровне дерева каталогов
	// с учетом размера "порции"($limit) и позиции первого заказа($from) 
	public function get_treeview($id=FALSE,$from=0,$limit=0)
	{
		$cat_list=array(); // вспомогательный массив
		// если $from=0, то отображение и категорий и заказов в первой "порции", в противном случае - отображаем только заказы
		if (!$from) {
			// sql-запрос, производящий выборку нужных полей из таблицы категорий
			$sql = "SELECT id,name FROM ".$this->db->dbprefix('categories')." WHERE parentID = ? ORDER BY id DESC";
			$query1 = $this->db->query($sql, array($id));  
			$cat_list = $query1->result();
		}
		// sql-запрос, производящий выборку нужных полей из таблицы заказов
		$sql = "SELECT id,product FROM ".$this->db->dbprefix('orders')." WHERE categoryID = ? ORDER BY id DESC LIMIT ".$from .",".$limit;
		$query2 = $this->db->query($sql, array($id));
		
		return array_merge($cat_list,$query2->result());
	}
	
	// функция возврата данных, необходимых для отображения боковой панели
	// осуществляет выборку id и имен категорий и заказов на одном уровне дерева каталогов, 
	// с учетом того, в мастерской заказ($done=0) или уже выполнен ($done=1),
	// а также с учетом размера "порции"($limit) и позиции первого заказа($from) 
	public function get_treeview_filtered($id=FALSE,$done=FALSE,$from=0,$limit=0)
	{
		$cat_list=array();
		// вспомогательный массив
		// если $from=0, то отображение и категорий и заказов в первой "порции", в противном случае - отображаем только заказы
		if (!$from) {
			// sql-запрос, производящий выборку нужных полей из таблицы категорий
			$sql = "SELECT id,name FROM ".$this->db->dbprefix('categories')." WHERE parentID = ? ORDER BY id DESC";
			$query1 = $this->db->query($sql, array($id));  
			$cat_list = $query1->result();
		}
		// sql-запрос, производящий выборку нужных полей из таблицы заказов
		$sql = "SELECT id,product FROM ".$this->db->dbprefix('orders')." WHERE categoryID = ? AND done = ? ORDER BY id DESC LIMIT ".$from .",".$limit;
		$query2 = $this->db->query($sql, array($id,$done));
		
		return array_merge($cat_list,$query2->result());
	}
	
	// функция добавления данных в нужную таблицу
		public function add_units($table=FALSE,$data=array()) 
	{
		$query = $this->db->insert($table,$data);
		return $query;
	}	
	
	// функция обновления данных в нужной таблице
		public function update_units($table=FALSE,$id=FALSE,$data=array()) 
	{
		$this->db->where('id', $id);
		$query = $this->db->update($table,$data);
		return $query;
	}	
	
		public function delete_units($table=FALSE,$id=FALSE)
	{
		$query = $this->db->delete($table, array('id' => $id));
		return $query;
	}	
	
	// функция выбора всех необходимых данных заказа для заполнения формы
		public function get_all_fields($id=FALSE) 
	{	
		// вибір тільки потрібних полів	і об'єднання з іншими таблицями
	    $this->db->where('orders.id', $id); 
		$this->db->select('orders.id,categories.id as idCategories,date_start,date_end,done,model,product,serialnum,factorynum,customers.name as customer,address,phone,wphone,hphone,personaldata,notified,complaints,performance,notes,sellers.id as idSellers,check,comments,masters.id as idMasters,master2ID as id2Masters,worksum,worksum2,details,transportation,total,sold,gdate,file');
		$this->db->from('orders');
		$this->db->join('categories', 'categories.id = orders.categoryID');
		$this->db->join('customers', 'customers.id = orders.customerID');
		$this->db->join('masters', 'masters.id = orders.masterID');
		$this->db->join('sellers', 'sellers.id = orders.sellerID');

		$query = $this->db->get();
		
		if ($query->num_rows() > 0)
		{
			return $query->row();
		} else { return FALSE; }
	}
	
}
