Ext.define('Notebook.controller.Dictionary',{
    extend: 'Ext.app.Controller',
    models: [
        'Master',
        'Seller',
        'Notetpl',
        'Status'
    ],
    stores: [
        'Master',
        'Seller',
        'Notetpl',
        'Status'
    ],
    views: [
        'dictionary.Master',
        'dictionary.Seller',
        'dictionary.Notetpl',
        'dictionary.Status'        
    ],
    init: function () {
        this.control({
            '#nb-dict-grid': {
                beforeedit: function(editor,eObj,eOpts) {
                    if (this.edtRecId) {
                        if (eObj.record.get('id')!=this.edtRecId) {
                            Ext.Msg.alert('Сообщение','Сначала сохраните предидущие изменения');
                            return false;
                        }
                    }
                    //else {
                    //    this.edtRecId=eObj.record.get('id');
                    //}
                },
                edit: function(editor,eObj,eOpts) {
                    if (!this.edtRecId) {
                        if (eObj.value!=eObj.originalValue) {
                            this.edtRecId=eObj.record.get('id');
                        }
                    }        
                }                
            },           
            'dict button#nb-dict-win-add': {
                click: this.dictAdd
            },            
            'dict button#nb-dict-win-del': {
                click: this.dictDel
            },
            'dict button#nb-dict-win-save': {
                click: this.dictSave
            },
            'dict button#nb-dict-win-close': {
                click: this.dictClose
            }            
        });
    },
    dictCreateWin: function (type) {
        switch (type){
            case 'Masters':
                this.store='Master';
                this.table='masters';
                this.dictWin=this.getView('dictionary.Master').create();
                break;
            case 'Sellers':
                this.store='Seller';
                this.table='sellers';
                this.dictWin=this.getView('dictionary.Seller').create();
                break;    
            case 'Notetpls':
                this.store='Notetpl';
                this.table='notestpl';
                this.dictWin=this.getView('dictionary.Notetpl').create();
                break;  
            case 'Statuses':
                this.store='Status';
                this.table='blacklist';
                this.dictWin=this.getView('dictionary.Status').create();
                break;                 
            default:
                this.store='Master';
                this.table='masters';
                this.dictWin=this.getView('dictionary.Master').create();
        }
        this.edtRecId=false;
        this.dictWin.show();        
    },
    dictAdd: function () {
        if (!this.edtRecId) {
            var dictStore=this.getStore(this.store);
            dictStore.add({id: 'NaN',name: 'Новый'});
            this.edtRecId='NaN';
        }
        else {
            Ext.Msg.alert('Сообщение','Сначала сохраните предидущие изменения');
        }
    },
    dictDel: function () {
        //var dictStore=this.getStore('Master');
        var dictGridSelModel=Ext.getCmp('nb-dict-grid').getSelectionModel();
        if (dictGridSelModel.hasSelection()) {
            //dictStore.remove(dictGridSelModel.getSelection());
            Ext.Msg.confirm('Сообщение','Удалить запись?',function (btn) {
                if (btn=='yes') {
                    var thisController=this;
                    var ajaxConf={
                        url: 'notebook/remove_unit',
                        method: 'GET'
                    };
                    ajaxConf.params={};
                    ajaxConf.params.table=this.table;
                    ajaxConf.params.id=dictGridSelModel.getSelection()[0].get('id');
                    ajaxConf.success=function (resp,opts) {
                        var json=Ext.decode(resp.responseText);
                        if (json.success) {
                            thisController.getStore(thisController.store).load();
                            Ext.Msg.alert('Сообщение',json.message);
                        }
                        else {
                            Ext.Msg.alert('Сообщение',json.message);
                        }
                    };
                    ajaxConf.failure=function () {
                        Ext.Msg.alert('Сообщение','Ошибка при AJAX запросе');
                    };
                    Ext.Ajax.request(ajaxConf);
                }
            },this);
        }
        else {
            Ext.Msg.alert('Сообщение','Выберите запись');
        }
    },
    dictSave: function () {        
        if (this.edtRecId) {
            var dictStore=this.getStore(this.store);
            var thisController=this;
            var ajaxConf={
                method: 'GET'
            };
            ajaxConf.params={};
            ajaxConf.params.table=this.table;
            ajaxConf.params.name=dictStore.getById(this.edtRecId).get('name');
            ajaxConf.success=function (resp,opts) {
                var json=Ext.decode(resp.responseText);
                if (json.success) {
                    thisController.getStore(thisController.store).load();
                    thisController.edtRecId=false;
                    Ext.Msg.alert('Сообщение',json.message);
                }
                else {
                    Ext.Msg.alert('Сообщение',json.message);
                }
            };
            ajaxConf.failure=function () {
                Ext.Msg.alert('Сообщение','Ошибка при AJAX запросе');
            };            
            if (this.edtRecId=='NaN') {
                ajaxConf.url='notebook/add_unit';
            }
            else {
                ajaxConf.url='notebook/update_unit';
                ajaxConf.params.id=this.edtRecId;
            }
            Ext.Ajax.request(ajaxConf);
        }
    },
    dictClose: function () {
        var dictStore=this.getStore(this.store);
        dictStore.rejectChanges();
        this.dictWin.close();
    }
});