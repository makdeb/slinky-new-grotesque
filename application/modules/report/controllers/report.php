<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Report extends CI_Controller {

	public function index($tpl = null, $id = null)
	{
		$this->load->model('Report_model', 'Model');
		$this->load->library('mpdf');
		
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
		$phones = 'д. '.$res['hphone'].'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;р. '.$res['wphone'].'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;м. '.$res['phone'];

		$details = $res[11];
		$notes = $res[9];
		$worksum = $res['worksum'];
		$worksum2 = $res['worksum2'];
		$transportation = $res['transportation'];
		eval("\$sum = $worksum + $worksum2;");
		eval("\$transport = $transportation + 0;");
		
		$html = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/assets/tpl/'.$tpl.'/index.html');
		
		// zamena {} na znachenije
		$html = str_replace('{ID}', $id, $html);
		$html = str_replace('{DATE_START}', $date_start, $html);
		$html = str_replace('{PRODUCT}', $res['product'], $html);
		$html = str_replace('{OWNER}', $res['name'], $html);
		$html = str_replace('{ADDRESS}', $res['address'], $html);
		$html = str_replace('{PHONES}', $phones, $html);
		$html = str_replace('{COMPLAINTS}', $res['complaints'], $html);
		$html = str_replace('{PERFORMANCE}', $res['performance'], $html);
		$html = str_replace('{NOTES}', $res['notes'], $html);
		$html = str_replace('{DETAILS}', $res['details'], $html);
		$html = str_replace('{WORKSUM}', $sum, $html);
		$html = str_replace('{DATE_END}', $date_end, $html);
		$html = str_replace('{DATE_GUARANTEE}', $date_guarantee, $html);
		$html = str_replace('{MASTER}', $res['master_name'], $html);
		$html = str_replace('{COMMENTS}', $res['comments'], $html);
		$html = str_replace('{TRANSPORT}', $transport, $html);
		$html = str_replace('{TOTAL}', $res['total'], $html);
		
		$mpdf = new mPDF();
		$mpdf->SetDisplayMode('fullpage');

		$stylesheet = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/assets/tpl/'.$tpl.'/style.css');
		$mpdf->WriteHTML($stylesheet, 1);
		$mpdf->WriteHTML($html);
		$mpdf->Output();
		exit;
	//	$this->load->view('welcome_message');
	}
}