Ext.define('Notebook.controller.Dictionary',{
    extend: 'Ext.app.Controller',
    models: [
        'Master'
    ],
    stores: [
        'Master'
    ],
    views: [
        'dictionary.Master'
    ],
    init: function () {
        this.control({
            '#nb-dict-mast-grid': {
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
            'dict-master button#nb-dict-mast-win-add': {
                click: this.dictAdd
            },            
            'dict-master button#nb-dict-mast-win-del': {
                click: this.dictDel
            },
            'dict-master button#nb-dict-mast-win-save': {
                click: this.dictSave
            }
        });
    },
    dictCreateWin: function (type) {
        switch (type){
            case 'Masters':
                this.type=type;
                this.dictWin=this.getView('dictionary.Master').create();
                break;
            default:
                this.type='Masters';
                this.dictWin=this.getView('dictionary.Master').create();
        }
        this.edtRecId=false;
        this.dictWin.show();        
    },
    dictAdd: function () {
        if (!this.edtRecId) {
            var dictStore=this.getStore('Master');
            dictStore.add({id: 'NaN',name: 'Новый'});
            this.edtRecId='NaN';
        }
        else {
            Ext.Msg.alert('Сообщение','Сначала сохраните предидущие изменения');
        }
    },
    dictDel: function () {
        //var dictStore=this.getStore('Master');
        var dictGridSelModel=Ext.getCmp('nb-dict-mast-grid').getSelectionModel();
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
                    ajaxConf.params.table='masters';
                    ajaxConf.params.id=dictGridSelModel.getSelection()[0].get('id');
                    ajaxConf.success=function (resp,opts) {
                        var json=Ext.decode(resp.responseText);
                        if (json.success) {
                            thisController.getStore('Master').load();
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
        var dictStore=this.getStore('Master');
        alert(dictStore.getRemovedRecords().length);
    }
});