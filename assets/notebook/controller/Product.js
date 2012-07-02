Ext.define('Notebook.controller.Product', {
    extend: 'Ext.app.Controller',
    models: [
        'Product',
        'SearchField'
    ],
    stores: [
        'Product',
        'SearchField'
    ],    
    views: [
        'product.List',
        'product.Edit',
        'product.Delete',
        'product.Search'
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
                itemclick: this.warLoad
            },
            '#nb-search-product': {
                click: this.searchProd
            }
        });
    },
    editCatList: function (button) {
        //створюємо екземпляр вюшки для додання\редагування категорії
        this.catEdtWin=this.getView('product.Edit').create(); 
        //отримуємо nb-cat-win-container крнтейнер
        var catEdtWinCont=this.catEdtWin.getComponent('nb-cat-edt-win-container');
        //отримуємо кеземпляр моделі для вибраної вузла
        this.catEdtWin.selCat=Ext.getCmp('nb-product-tree').getSelectionModel().getSelection()[0];
        //в залежності від того, додаємо нову чи редагуємо існуючу категорію,
        //встановлюємо властивість екземпляра вюшки catAdd,
        //прописуємо відповідне повідомлення у вікні
        if (button.id=='nb-add-cat') {
            //Якщо вибрано запис, але цей запис не категорія, то просимо вибрати категорію
            if (this.catEdtWin.selCat!=undefined) {
                if (this.catEdtWin.selCat.get('id').substr(0,1)!='c') {
                    Ext.Msg.alert('Сообщение','Выберите категорию');
                    this.catEdtWin.close();
                    return;                    
                }
            }
            this.catEdtWin.catAdd=true;            
            catEdtWinCont.getComponent('nb-cat-edt-win-message')
                            .update('Добавить новую подкатегорию');         
        }
        else {
            //якщо вибраний вузел категорія, то встановлюємо значення відповідного поля у вюшці
            if (this.catEdtWin.selCat!=undefined && this.catEdtWin.selCat.get('id').substr(0,1)=='c') {
                catEdtWinCont.getComponent('nb-cat-edt-win-cat-name')
                                .setRawValue(this.catEdtWin.selCat.get('name'));
            }
            else {
                Ext.Msg.alert('Сообщение','Выберите категорию');
                this.catEdtWin.close();
                return;
            }              
            this.catEdtWin.catAdd=false;            
            catEdtWinCont.getComponent('nb-cat-edt-win-message')
                            .update('Редактировать категорию');  
            //ховаємо чекбокс
            catEdtWinCont.getComponent('nb-cat-edt-win-no-parent').hide();
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
            //залежно від того, чи додаємо ми категорію чи редагуємо, налаштовується конфігурація AJAX запиту
            if (this.catEdtWin.catAdd) {
                ajaxConf.url='notebook/add_unit';
            }
            else {
                ajaxConf.url='notebook/update_unit';              
            }
            ajaxConf.params={};
            ajaxConf.params.table='categories';
            ajaxConf.params.name=catEdtWinCont.getComponent('nb-cat-edt-win-cat-name').getValue();
            if (this.catEdtWin.catAdd){
                //якшо при доданні не вибрана батьківська категорія, то передаємо в parent значення 0
                if (this.catEdtWin.selCat!=undefined && !catEdtWinCont.getComponent('nb-cat-edt-win-no-parent').getValue()) {
                    ajaxConf.params.parent=this.catEdtWin.selCat.get('id');
                }
                else {
                    ajaxConf.params.parent=0;
                }                
            }
            else {
                if (this.catEdtWin.selCat!=undefined) {
                    ajaxConf.params.id=this.catEdtWin.selCat.get('id');
                }
                else {
                    ajaxConf.params.id=0;
                }                
            }
            ajaxConf.success=function (resp,opts) {
                var json=Ext.decode(resp.responseText);
                //якшо серввер повернув повідомлення про успішне виконання
                if (json.success) {    
                    //перезавантажуємо Store...
                    Ext.getCmp('nb-product-tree').getStore().load();                                       
                    Ext.getCmp('nb-war-cat').getStore().load();                     
                    Ext.Msg.alert('Сообщение',json.message);
                }
                else {
                    Ext.Msg.alert('Сообщение',json.message);
                }
            }
            ajaxConf.failure=function () {
                Ext.Msg.alert('Сообщение','Ошибка AJAX запроса');
            }
            //виконуємо запит
            Ext.Ajax.request(ajaxConf);            
        }
        this.catEdtWin.close();
    },
    catEdtWinCancel: function () {
        this.catEdtWin.close();
    },
    delCat: function () {
        this.catDelWin=this.getView('product.Delete').create();
        //отримуємо вибраний вузол
        var selCat=Ext.getCmp('nb-product-tree').getSelectionModel().getSelection()[0];
        //якшо вибраний вузол - категорія, то відображаємо повідомлення про видалення
        if (selCat!=undefined && selCat.get('id').substr(0,1)=='c') {                    
            this.catDelWin.selCat=selCat;
            this.catDelWin.getComponent('nb-cat-del-win-container')
                                .getComponent('nb-cat-del-win-message')
                                    .update('Удалить категорию '+selCat.get('name')+' и все ее подкатегории?');
            this.catDelWin.show();
        }
        else {
            Ext.Msg.alert('Сообщение','Выберите категорию');
            this.catDelWin.close();
        }
    },
    catDelWinOk: function () {
        //якщо видалення категорії підтверджено, то відправляємо запит на видалення
        var ajaxConf={
            method: 'GET'
        };
        ajaxConf.url='notebook/remove_unit';
        ajaxConf.params={};
        ajaxConf.params.table='categories';
        ajaxConf.params.id=this.catDelWin.selCat.get('id');
        ajaxConf.success=function (resp,opts) {
            var json=Ext.decode(resp.responseText);
            if (json.success) {    
                Ext.getCmp('nb-product-tree').getStore().load(); 
                Ext.getCmp('nb-war-cat').getStore().load();
                //відміняємо вибір категорії
                Ext.getCmp('nb-product-tree').getSelectionModel().deselectAll(false);
                Ext.Msg.alert('Сообщение',json.message);
            }
            else {
                Ext.Msg.alert('Сообщение',json.message);
            }
        }
        ajaxConf.failure=function () {
            Ext.Msg.alert('Сообщение','Ошибка AJAX запроса');
        }
        //виконуємо запит
        Ext.Ajax.request(ajaxConf);
        this.catDelWin.close();
    },
    catDelWinCancel: function () {
        this.catDelWin.close();
    },
    warLoad: function (view,record,item,index,e,eOpts) {
        var warId=record.get('id');
        //перевіряємо чи клікнули по замовленню, а не по категорії
        if (warId.substr(0,1)=='p') {
            //викликаємо метод контроллера, що заповнює форму
            this.getController('Warranty').fillForm(warId);
        }
    },
    searchProd: function () {
        //alert('ddd');
        var prodSearch=this.getView('product.Search').create();
        prodSearch.show();
    }
});