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
            'warranty-form button#ololo': {
                click: function () {
                    alert('dddjjj');
                }
            },
            'warranty-form button#nb-rec-warranty': {
                click: this.recWarranty
            }
        });
    },
    fillForm: function (warId) {
        //
        var ajaxConf={
            method: 'GET',
            url: 'notebook/fill_order',
            params: {
                id: warId
            },
            success: function (resp,opts) {
//                    address: "Чоп Зализничников 2/34"
//                    category: "С/М"
//                    certificate: ""
//                    comments: "19.07.2005"
//                    complaints: "Заклинило барабан"
//                    customer: "Кульчинский Олег Иванович"
//                    date_end: "2005-10-05"
//                    date_start: "2005-10-03"
//                    details: ""
//                    gdate: ""
//                    guarantee: ""
//                    hphone: "711451"
//                    id: "4"
//                    master: "Алекс"
//                    notes: "!!! В барабане застряло белье, не могут вынуть Леше отмечено"
//                    notified: ""
//                    penddate: ""
//                    performance: "Расклинивание по гарантии"
//                    phone: "80506611910"
//                    posted: ""
//                    product: "С/М INDESIT"
//                    pstartdate: ""
//                    sum: "38"
//                    type: "0"
//                    wphone: ""                    
                var json=Ext.decode(resp.responseText);
                if (json.success) {
                    //alert(resp.responseText)
                    Ext.getCmp('nb-war-id').setValue(json.order.id);
                    Ext.getCmp('nb-war-prod').setValue(json.order.product);
                    alert(Ext.getCmp('nb-war-cat').getStore().getCount());
                    Ext.getCmp('nb-war-cat').setValue(json.order.idCategories);
                    //Ext.getCmp('nb-war-date-start').initValue();
                    Ext.getCmp('nb-war-date-start').setValue(Ext.Date.parse(json.order.date_start,'Y-m-d'));
                    Ext.getCmp('nb-war-date-end').setValue(Ext.Date.parse(json.order.date_end,'Y-m-d'));
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
    }
});


