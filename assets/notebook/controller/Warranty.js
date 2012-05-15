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


