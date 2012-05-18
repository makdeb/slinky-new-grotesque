Ext.define('Notebook.controller.Warranty',{
    extend: 'Ext.app.Controller',
    models: [
        'Category',
        'Master',
        'Guarantee'
    ],
    stores: [
        'Category',
        'Master',
        'Guarantee'
    ],    
    views: [
        'warranty.Form'
    ],  
    init: function () {
        this.control({
            'warranty-form button#nb-rec-warranty': {
                click: this.recWarranty
            },
            'warranty-form button#nb-save-warranty': {
                click: this.saveWarranty
            },             
            'warranty-form button#nb-print-warranty': {
                click: this.warPrint
            }
        });
    },
    fillForm: function (warId) {
        var ajaxConf={
            method: 'GET',
            url: 'notebook/fill_order',
            params: {
                id: warId
            },
            success: function (resp,opts) {
//                    address: "Чоп Зализничников 2/34"
//                    category: "С/М"
//                    certificate: "" svidoctvo
//                    comments: "19.07.200 v garantii
//                    complaints: "Заклинило барабан"
//                    customer: "Кульчинский Олег Иванович"
//                    date_end: "2005-10-05"
//                    date_start: "2005-10-03"
//                    details: "" zapch
//                    gdate: "" garantia do
//                    guarantee: ""
//                    hphone: "711451"
//                    id: "4"
//                    master: "Алекс"
//                    notes: "!!! В барабане застряло белье, не могут вынуть Леше отмечено"
//                    notified: ""
//                    penddate: "" otrum
//                    performance: "Расклинивание по гарантии"
//                    phone: "80506611910"
//                    posted: "" vidpravleno tekst
//                    product: "С/М INDESIT"
//                    pstartdate: "" vidpr
//                    sum: "38" robota
//                    type: "0"
//                    wphone: ""                    
                var json=Ext.decode(resp.responseText);
                if (json.success) {
                    Ext.getCmp('nb-war-id').setValue(json.order.id);
                    Ext.getCmp('nb-war-prod').setValue(json.order.product);
                    Ext.getCmp('nb-war-cat').setValue(json.order.idCategories);
                    Ext.getCmp('nb-war-date-start').setValue(Ext.Date.parse(json.order.date_start,'Y-m-d'));
                    Ext.getCmp('nb-war-date-end').setValue(Ext.Date.parse(json.order.date_end,'Y-m-d'));
                    Ext.getCmp('nb-war-cust').setValue(json.order.customer);
                    Ext.getCmp('nb-war-adr').setValue(json.order.address);
                    Ext.getCmp('nb-war-hphone').setValue(json.order.hphone);
                    Ext.getCmp('nb-war-wphone').setValue(json.order.wphone);
                    Ext.getCmp('nb-war-phone').setValue(json.order.phone);
                    Ext.getCmp('nb-war-date-notif').setValue(Ext.Date.parse(json.order.notified,'Y-m-d'));
                    Ext.getCmp('nd-war-compl').setValue(json.order.complaints);
                    Ext.getCmp('nb-war-pref').setValue(json.order.performance);
                    Ext.getCmp('nb-war-notes').setValue(json.order.notes);
                    Ext.getCmp('nb-war-guar').setValue(json.order.idGuarantee);
                    Ext.getCmp('nb-war-guar-cer').setValue(json.order.certificate);
                    Ext.getCmp('nb-war-guar-comm').setValue(json.order.comments);
                    Ext.getCmp('nb-war-post').setValue(json.order.posted);
                    Ext.getCmp('nb-war-psdate').setValue(Ext.Date.parse(json.order.pstartdate,'Y-m-d'));
                    Ext.getCmp('nb-war-pedate').setValue(Ext.Date.parse(json.order.penddate,'Y-m-d'));
                    Ext.getCmp('nb-war-type').items.items[json.order.type].setValue(true);
                    Ext.getCmp('nb-war-mas').setValue(json.order.idMasters);                    
                    Ext.getCmp('nb-war-det').setValue(json.order.details); 
                    Ext.getCmp('nb-war-work').setValue(json.order.sum); 
                    Ext.getCmp('nb-war-wdate').setValue(json.order.gdate); 
                    //alert(Ext.getCmp('nb-war-type').getValue()['rb']);                   
                }
                else {
                    Ext.Msg.alert('Повідомлення',json.message);
                }
            },
            failure: function () {
                Ext.Msg.alert('Повідомлення','Помилка при AJAX запиті');
            }
        };
        Ext.Ajax.request(ajaxConf);
    },
    recWarranty: function() {
        var ajaxConf={};
        ajaxConf.method='POST';
        ajaxConf.url='notebook/add_order';
        ajaxConf.success=function (resp,opts) {
            var json=Ext.decode(resp.responseText);
            if (json.success) {
                //success
            }
            else {
                //failure
            }
        }
        ajaxConf.failure=function () {
            //
        }        
        Ext.Ajax.request(ajaxConf);
    },
    saveWarranty: function () {
//        $data['type']  = $this->input->post('type');
//        $data['product']  = $this->input->post('product');
//        $data['categoryID']  = $this->input->post('categoryID');
//        $data['complaints']  = $this->input->post('complaints');
//        $data['performance']  = $this->input->post('performance');
//        $data['notes']  = $this->input->post('notes');
//        $data['sum']  = $this->input->post('sum');
//        $data['details']  = $this->input->post('details');
//        $data['masterID']  = $this->input->post('masterID');
//        $data['guaranteeID']  = $this->input->post('guaranteeID');
//        $data['certificate']  = $this->input->post('certificate');
//        $data['comments']  = $this->input->post('comments');
//        $data['posted']  = $this->input->post('posted');        
        var warProd=Ext.getCmp('nb-war-prod');
        var warCat=Ext.getCmp('nb-war-cat');
        var warStartDate=Ext.getCmp('nb-war-date-start');
        var warEndDate=Ext.getCmp('nb-war-date-end');
        var warCust=Ext.getCmp('nb-war-cust');
        var warAdr=Ext.getCmp('nb-war-adr');
        var warHPhone=Ext.getCmp('nb-war-hphone');
        var warWPhone=Ext.getCmp('nb-war-wphone');
        var warPhone=Ext.getCmp('nb-war-phone');
        var warNotifDate=Ext.getCmp('nb-war-date-notif');
        var warCompl=Ext.getCmp('nd-war-compl');
        var warPref=Ext.getCmp('nb-war-pref');
        var warNotes=Ext.getCmp('nb-war-notes');
        var warGuar=Ext.getCmp('nb-war-guar');
        var warGuarCer=Ext.getCmp('nb-war-guar-cer');
        var warGuarComm=Ext.getCmp('nb-war-guar-comm');
        var warPost=Ext.getCmp('nb-war-post');
        var warPSDate=Ext.getCmp('nb-war-psdate');
        var warPEDate=Ext.getCmp('nb-war-pedate');
        var warType=Ext.getCmp('nb-war-type');
        var warMas=Ext.getCmp('nb-war-mas');                    
        var warDet=Ext.getCmp('nb-war-det'); 
        var warWork=Ext.getCmp('nb-war-work'); 
        var warWDate=Ext.getCmp('nb-war-wdate');
        if (!warProd.isValid()) {
            Ext.Msg.alert('Повідомлення','Невірно заповнене поле "Виріб"');
            return;
        }
        if (!warCust.isValid()) {
            Ext.Msg.alert('Повідомлення','Невірно заповнене поле "Власник"');
            return;
        }  
        if (!warAdr.isValid()) {
            Ext.Msg.alert('Повідомлення','Невірно заповнене поле "Адреса"');
            return;
        }   
        if (!warHPhone.isValid()) {
            Ext.Msg.alert('Повідомлення','Невірно заповнене поле "Телефон"');
            return;
        }   
        if (!warWPhone.isValid()) {
            Ext.Msg.alert('Повідомлення','Невірно заповнене поле "Телефон"');
            return;
        } 
        if (!warPhone.isValid()) {
            Ext.Msg.alert('Повідомлення','Невірно заповнене поле "Телефон"');
            return;
        }             
        if (!warDet.isValid()) {
            Ext.Msg.alert('Повідомлення','Невірно заповнене поле "Деталі"');
            return;
        }   
        if (!warWork.isValid()) {
            Ext.Msg.alert('Повідомлення','Невірно заповнене поле "Робота"');
            return;
        }           
        var ajaxConf={};
        ajaxConf.method='POST';
        ajaxConf.url='notebook/update_order';
        ajaxConf.params={};
        ajaxConf.params.id=Ext.getCmp('nb-war-id').getValue();
        ajaxConf.params.type=warType.getValue()['nb-war-type-rb'];
        ajaxConf.params.product=warProd.getValue();
        ajaxConf.params.categoryID=warCat.getValue();
        ajaxConf.params.complaints=warCompl.getValue();
        ajaxConf.params.performance=warPref.getValue();
        ajaxConf.params.sum=warWork.getValue();
        ajaxConf.params.details=warDet.getValue();
        ajaxConf.params.masterID=warMas.getValue();
        ajaxConf.params.guaranteeID=warGuar.getValue();
        ajaxConf.params.certificate=warGuarCer.getValue();
        ajaxConf.params.comments=warGuarComm.getValue();
        ajaxConf.params.posted=warPost.getValue();
        ajaxConf.params.name=warCust.getValue();
        ajaxConf.params.address=warAdr.getValue();
        ajaxConf.params.phone=warPhone.getValue();
        ajaxConf.params.wphone=warWPhone.getValue();
        ajaxConf.params.hphone=warHPhone.getValue();
        ajaxConf.params.gdate=Ext.Date.format(warWDate.getValue(),'d.m.Y');
        ajaxConf.params.pstartdate=Ext.Date.format(warPSDate.getValue(),'d.m.Y');
        ajaxConf.params.penddate=Ext.Date.format(warPEDate.getValue(),'d.m.Y');
        ajaxConf.params.notified=Ext.Date.format(warNotifDate.getValue(),'d.m.Y');       
        ajaxConf.success=function (resp,opts) {
            var json=Ext.decode(resp.responseText);
            if (json.success) {
                Ext.getCmp('nb-product-tree').getStore().load();
                Ext.Msg.alert('Повідомлення',json.message);
            }
            else {
                Ext.Msg.alert('Повідомлення',json.message);
            }
        }
        ajaxConf.failure=function () {
            Ext.Msg.alert('Повідомлення','Помилка при AJAX запиті');
        }        
        Ext.Ajax.request(ajaxConf);        
    },
    warPrint: function () {
        var selWar=Ext.getCmp('nb-war-id').getValue();
        if (selWar!=undefined && selWar!='') {
            window.open(print_url+'?id='+selWar,'_blank');
        }
        else {
            Ext.Msg.alert('Повідомлення','Виберіть замовлення або збережіть зміни, якщо додається нове.');
        }
    }
});


