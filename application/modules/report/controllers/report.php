<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Report extends CI_Controller {

	public function index($id = null)
	{
		$this->load->model('Report_model', 'Model');
		$this->load->library('mpdf');
		
		if ($id != 999999) {
			$res = $this->Model->getReportData($id);
			//print_r($res);
			/*foreach($res as $k=>$v) {
				$html .= $k.' => '.$v.'<br>';
			}*/
			
			$date_start = date('d.m.Y', strtotime($res['date_start']));
			if ($res['date_end'] != '') {
				$date_end = date('d.m.Y', strtotime($res['date_end']));
			}
			if ($res['gdate'] != '') {
				$date_guarantee = date('d.m.Y', strtotime($res['gdate']));
			}
			$phones = '<table width="495" border="0" cellspacing="0" cellpadding="0">
					   <tr><td width="165">д. '.$res['hphone'].'</td><td width="165">р. '.$res['wphone'].'</td><td width="165">м. '.$res['phone'].'</td></tr></table>';
	
			$details = $res[11];
			$notes = $res[9];
			$worksum = $res['worksum'];
			$worksum2 = $res['worksum2'];
			$transportation = $res['transportation'];
			eval("\$sum = $worksum + $worksum2;");
			eval("\$transport = $transportation + 0;");
			
			$product = $res['product'].' '.$res['model'].' '.$res['serialnum'].' '.$res['factorynum'];
			$name = $res['name'];
			$address = $res['address'];
			if (strlen($res['complaints']) > 235) {
				$tail = substr($res['complaints'], 235);
				$points = strpos($tail, ' ');
				$complaints = substr($res['complaints'], 0, 235).substr($tail, 0, $points).' ...';
			}
			else {
				$complaints = $res['complaints'];
			}
			if (strlen($res['performance']) > 480) {
				$tail = substr($res['performance'], 480);
				$points = strpos($tail, ' ');
				$performance = substr($res['performance'], 0, 480).substr($tail, 0, $points).' ...';
			}
			else {
				$performance = $res['performance'];
			}
			if (strlen($res['notes']) > 130) {
				$tail = substr($res['notes'], 130);
				$points = strpos($tail, ' ');
				$notes = substr($res['notes'], 0, 130).substr($tail, 0, $points).' ...';
			}
			else {
				$notes = $res['notes'];
			}
			$details = $res['details'];
			$master_name = $res['master_name'];
		//	$comments = $res['comments'];
			$total = $res['total'];
		}
		else {
			$id = '';
			$date_start = date('d.m.Y',time());
			$phones = '<table width="495" border="0" cellspacing="0" cellpadding="0">
					   <tr><td width="165">д. </td><td width="165">р. </td><td width="165">м. </td></tr></table>';
			$sum = '';
			$date_end = '';
			$date_guarantee = '';
			$transport = '';
			$product = '';
			$name = '';
			$address = '';
			$complaints = '';
			$performance = '';
			$notes = '';
			$details = '';
			$master_name = '';
			$total = '';
		}
		
		$html = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/assets/tpl/index.html');
		
		// zamena {} na znachenije
		$html = str_replace('{ID}', $id, $html);
		$html = str_replace('{DATE_START}', $date_start, $html);
		$html = str_replace('{PRODUCT}', $product, $html);
		$html = str_replace('{OWNER}', $name, $html);
		$html = str_replace('{ADDRESS}', $address, $html);
		$html = str_replace('{PHONES}', $phones, $html);
		$html = str_replace('{COMPLAINTS}', $complaints, $html);
		$html = str_replace('{PERFORMANCE}', $performance, $html);
		$html = str_replace('{NOTES}', $notes, $html);
		$html = str_replace('{DETAILS}', $details, $html);
		$html = str_replace('{WORKSUM}', $sum, $html);
		$html = str_replace('{DATE_END}', $date_end, $html);
		$html = str_replace('{DATE_GUARANTEE}', $date_guarantee, $html);
		$html = str_replace('{MASTER}', $master_name, $html);
		//$html = str_replace('{COMMENTS}', $comments, $html);
		$html = str_replace('{TRANSPORT}', $transport, $html);
		$html = str_replace('{TOTAL}', $total, $html);
		
		$mpdf = new mPDF();
		$mpdf->SetDisplayMode('fullpage');

		$stylesheet = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/assets/tpl/style.css');
		$mpdf->WriteHTML($stylesheet, 1);
		$mpdf->WriteHTML($html);
		$mpdf->Output();
		exit;
	//	$this->load->view('welcome_message');
	}
}