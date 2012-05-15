Ext.define('Notebook.controller.Warranty',{
    extend: 'Ext.app.Controller',
    models: [
        'Category',
        'Master'
    ],
    stores: [
        'Category',
        'Master'
    ],    
    views: [
        'warranty.Form'
    ],  
    init: function () {
        this.control({
            'warranty-form button#nb-rec-warranty': {
                click: this.recWarranty
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
                    //Ext.getCmp('nb-war-guar').setValue(json.order.guarantee);
                    //Ext.getCmp('nb-war-guar-cer').setValue(json.order.certificate);
                    //Ext.getCmp('nb-war-guar-comm').setValue(json.order.comments);
                    Ext.getCmp('nb-war-post').setValue(json.order.posted);
                    Ext.getCmp('nb-war-psdate').setValue(Ext.Date.parse(json.order.pstartdate,'Y-m-d'));
                    Ext.getCmp('nb-war-pedate').setValue(Ext.Date.parse(json.order.penddate,'Y-m-d'));
                    Ext.getCmp('nb-war-type').items.items[json.order.type].setValue(true);
                    Ext.getCmp('nb-war-mas').setValue(json.order.master);                    
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


