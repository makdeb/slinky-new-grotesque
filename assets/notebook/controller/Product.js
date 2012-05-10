Ext.define('Notebook.controller.Product', {
    extend: 'Ext.app.Controller',
    models: [
        'Product'
    ],
    stores: [
        'Product'
    ],    
    views: [
        'product.List',
        'product.Edit',
        'product.Delete'
    ],
    init: function () {
        this.control({
            '#nb-add-cat': {
                click: this.editCatList
            },
            '#nb-edit-cat': {
                click: this.editCatList
            },  
            '#nb-cat-edt-win-save': {
                click: this.catEdtWinSave
            },             
            '#nb-cat-edt-win-cancel': {
                click: this.catEdtWinCancel
            },  
            '#nb-del-cat': {
                click: this.delCat
            },              
            '#nb-cat-del-win-ok': {
                click: this.catDelWinOk
            },
            '#nb-cat-del-win-cancel': {
                click: this.catDelWinCancel
            },            
            '#nb-product-tree': {
                itemclick: function () {
                    alert('click');
                }
            }           
        });
    },
    //фікс для бага в ExtJs: не спрацьовує метод load при завантаженні даних для root 
    cleanUpProductList: function (nodeId) {
        var delNode;
        var selNode=Ext.getCmp('nb-product-tree').getStore().getNodeById(nodeId);
        while (delNode = selNode.childNodes[0]) {
            selNode.removeChild(delNode);
        }        
    },
    editCatList: function (button) {
        //створюємо екземпляр вюшки для додання\редагування категорії
        this.catEdtWin=this.getView('product.Edit').create(); 
        //отримуємо nb-cat-win-container крнтейнер
        var catEdtWinCont=this.catEdtWin.getComponent('nb-cat-edt-win-container');
        //отримуємо кеземпляр моделі для вибраної вузла
        this.catEdtWin.selCat=Ext.getCmp('nb-product-tree').getSelectionModel().getSelection()[0];
        //в залкжності від того, додаємо нову чи редагуємо існуючу категорію,
        //встановлюємо властивість екземпляра вюшки catAdd,
        //прописуємо відповідне повідомлення у вікні
        if (button.id=='nb-add-cat') {
            this.catEdtWin.catAdd=true;            
            catEdtWinCont.getComponent('nb-cat-edt-win-message')
                            .update('Додати нову підкатегорію в категорію');
        }
        else {
            //якщо вибраний вузел категорія, то встановлюємо значення відповідного поля у вюшці
            if (this.catEdtWin.selCat!=undefined && this.catEdtWin.selCat.get('id').substr(0,1)=='c') {
                catEdtWinCont.getComponent('nb-cat-edt-win-cat-name')
                                .setRawValue(this.catEdtWin.selCat.get('name'));
            }
            else {
                Ext.Msg.alert('Повідомлення','Виберіть категорію');
                this.catEdtWin.close();
                return;
            }              
            this.catEdtWin.catAdd=false;            
            catEdtWinCont.getComponent('nb-cat-edt-win-message')
                            .update('Редагувати підкатегорію в категорії');                               
        }   
        //відображаємо вюшку
        this.catEdtWin.show();
    },
    catEdtWinSave: function () {
        //отримуємо nb-cat-win-container крнтейнер
        var catEdtWinCont=this.catEdtWin.getComponent('nb-cat-edt-win-container');   
        //перевіряємо на валідність поле вводу назви категорії
        if (catEdtWinCont.getComponent('nb-cat-edt-win-cat-name').isValid()) {
            //створюємо обєкт-конфігурацію для аякс запиту
            var ajaxConf={
                method: 'GET'
            };
            ajaxConf.thisController=this;
            if (this.catEdtWin.catAdd) {
                ajaxConf.url='notebook/add_category';
                ajaxConf.params={};
                ajaxConf.params.name=catEdtWinCont.getComponent('nb-cat-edt-win-cat-name').getValue();
                if (this.catEdtWin.selCat!=undefined) {
                    ajaxConf.params.parent=this.catEdtWin.selCat.get('id');
                }
                else {
                    ajaxConf.params.parent=0;
                }
            }
            else {
                ajaxConf.url='notebook/update_category';
                ajaxConf.params={};
                ajaxConf.params.name=catEdtWinCont.getComponent('nb-cat-edt-win-cat-name').getValue();
                if (this.catEdtWin.selCat!==undefined) {
                    ajaxConf.params.id=this.catEdtWin.selCat.get('id');
                }
                else {
                    ajaxConf.params.id=0;
                }                
            }
            ajaxConf.success=function (resp,opts) {
                var json=Ext.decode(resp.responseText);
                if (json.success) {    
                    ajaxConf.thisController.cleanUpProductList('root');
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
        }
        this.catEdtWin.close();
    },
    catEdtWinCancel: function () {
        this.catEdtWin.close();
    },
    delCat: function () {
        var selCat=Ext.getCmp('nb-product-tree').getSelectionModel().getSelection()[0];
        if (selCat!=undefined && selCat.get('id').substr(0,1)=='c') {        
            this.catDelWin=this.getView('product.Delete').create();
            this.catDelWin.selCat=selCat;
            this.catDelWin.getComponent('nb-cat-del-win-container').getComponent('nb-cat-del-win-message').update('Видалити категорію '+selCat.get('name')+' та всі її підкатегорії?');
            this.catDelWin.show();
        }
        else {
            Ext.Msg.alert('Повідомлення','Виберіть категорію');
            this.catDelWin.close();
        }
    },
    catDelWinOk: function () {
        var ajaxConf={
            method: 'GET'
        };
        ajaxConf.thisController=this;
        ajaxConf.url='notebook/remove_category';
        ajaxConf.params={};
        ajaxConf.params.id=this.catDelWin.selCat.get('id');
        ajaxConf.success=function (resp,opts) {
            var json=Ext.decode(resp.responseText);
            if (json.success) {    
                ajaxConf.thisController.cleanUpProductList('root');
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
        this.catDelWin.close();
    },
    catDelWinCancel: function () {
        this.catDelWin.close();
    }
});