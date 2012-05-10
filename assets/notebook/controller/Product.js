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
            '#nb-cat-win-save': {
                click: this.catWinSave
            },             
            '#nb-cat-win-cancel': {
                click: this.catWinCancel
            },  
            '#nb-del-cat': {
                click: this.delCat
            },              
            '#nb-cat-del-ok': {
                click: this.catDelOk
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
        this.catWin=this.getView('product.Edit').create(); 
        //отримуємо nb-cat-win-container крнтейнер
        var catWinCont=this.catWin.getComponent('nb-cat-win-container');
        //отримуємо кеземпляр моделі для вибраної вузла
        this.catWin.selCat=Ext.getCmp('nb-product-tree').getSelectionModel().getSelection()[0];
        //в залкжності від того, додаємо нову чи редагуємо існуючу категорію,
        //встановлюємо властивість екземпляра вюшки catAdd,
        //прописуємо відповідне повідомлення у вікні
        if (button.id=='nb-add-cat') {
            this.catWin.catAdd=true;            
            catWinCont.getComponent('nb-cat-win-message')
                            .update('Додати нову підкатегорію в категорію');
        }
        else {
            //якщо вибраний вузел категорія, то встановлюємо значення відповідного поля у вюшці
            if (this.catWin.selCat!=undefined && this.catWin.selCat.get('id').substr(0,1)=='c') {
                catWinCont.getComponent('nb-cat-win-cat-name')
                                .setRawValue(this.catWin.selCat.get('name'));
            }
            else {
                Ext.Msg.alert('Повідомлення','Виберіть категорію');
                this.catWin.close();
                return;
            }              
            this.catWin.catAdd=false;            
            catWinCont.getComponent('nb-cat-win-message')
                            .update('Редагувати підкатегорію в категорії');                               
        }   
        //відображаємо вюшку
        this.catWin.show();
    },
    catWinSave: function () {
        //отримуємо nb-cat-win-container крнтейнер
        var catWinCont=this.catWin.getComponent('nb-cat-win-container');   
        //перевіряємо на валідність поле вводу назви категорії
        if (catWinCont.getComponent('nb-cat-win-cat-name').isValid()) {
            //створюємо обєкт-конфігурацію для аякс
            var ajaxConf={
                method: 'GET'
            };
            ajaxConf.thisController=this;
            if (this.catWin.catAdd) {
                ajaxConf.url='notebook/add_category';
                ajaxConf.params={};
                ajaxConf.params.name=catWinCont.getComponent('nb-cat-win-cat-name').getValue();
                if (this.catWin.selCat!=undefined) {
                    ajaxConf.params.parent=this.catWin.selCat.get('id');
                }
                else {
                    ajaxConf.params.parent=0;
                }
            }
            else {
                ajaxConf.url='notebook/update_category';
                ajaxConf.params={};
                ajaxConf.params.name=catWinCont.getComponent('nb-cat-win-cat-name').getValue();
                if (this.catWin.selCat!==undefined) {
                    ajaxConf.params.id=this.catWin.selCat.get('id');
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
//            if (this.catWin.selCat==undefined) {
//                this.cleanUpProductList('root');
//                Ext.getCmp('nb-product-tree').getStore().load();
//            }
//            else {
//                if (this.catWin.catAdd) {
//                    this.cleanUpProductList(this.catWin.selCat.get('id'));
//                    Ext.getCmp('nb-product-tree').getStore().load({node: this.catWin.selCat});
//                }
//                else {
//                    if (this.catWin.selCat.parentNode.get('id')!='root') {
//                        //alert(this.catWin.selCat.parentNode.get('name'));
//                        this.catWin.selCat.parentNode.collapse();
//                        this.cleanUpProductList(this.catWin.selCat.parentNode.get('id'));
//                        Ext.getCmp('nb-product-tree').getStore().load({node: this.catWin.selCat.parentNode});
//                    }
//                    else {
//                        this.cleanUpProductList('root');
//                        Ext.getCmp('nb-product-tree').getStore().load();
//                    }
//                }                
//            }             
        }
        this.catWin.close();
    },
    catWinCancel: function () {
        this.catWin.close();
    },
    delCat: function () {
        var selCat=Ext.getCmp('nb-product-tree').getSelectionModel().getSelection()[0];
        if (selCat!=undefined && selCat.get('id').substr(0,1)=='c') {        
            this.catDel=this.getView('product.Delete').create();
            this.catDel.selCat=selCat;
            this.catDel.getComponent('nb-cat-del-container').getComponent('nb-cat-del-message').update('Видалити категорію '+selCat.get('name')+' та всі її підкатегорії?');
            this.catDel.show();
        }
    },
    catDelOk: function () {
        var ajaxConf={
            method: 'GET'
        };
        ajaxConf.thisController=this;
        ajaxConf.url='notebook/remove_category';
        ajaxConf.params={};
        ajaxConf.params.id=this.catDel.selCat.get('id');
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
        this.catDel.close();
    }
});