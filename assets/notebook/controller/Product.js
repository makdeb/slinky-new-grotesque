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
        //this.getStore('SearchField').addListener('load',function () {alert('loaded');});
        //this.getStore('SearchField').load();
        this.control({
        	'product-list button#nb-prod-filter': {
        		click: this.refreshCat
        	},
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
            },
            'product-search #nb-prod-srch-field': {
                change: this.searchProdFieldChange
            },
            'product-search button#nb-prod-srch-win-search': {
                click: this.searchWinOk
            },
            'product-search button#nb-prod-srch-win-close': {
                click: this.searchWinClose
            }, 
            '#nb-search-product-reset': {
                click: this.searchProdReset
            }
        });
    },
    refreshCat: function (button) {   
    	button.disable();
    	prodStore=this.getStore('Product');
    	prodStore.clearOnLoad=true;
    	if (Ext.getCmp('nb-prod-filter-all').getValue()) {
    		prodStore.getProxy().extraParams.filter=0;
    		prodStore.getProxy().extraParams.done=0;
    	}
    	else {
    		prodStore.getProxy().extraParams.filter=1;
        	if (Ext.getCmp('nb-prod-filter-in-ws').getValue()) {
        		prodStore.getProxy().extraParams.done=0;
        	}
        	else {
        		prodStore.getProxy().extraParams.done=1;
        	}
    	}
        var prodLoadParams={};
        prodLoadParams.scope=this;
        prodLoadParams.callback=function(records, operation, success) { 
        	button.enable();
        }    	
        prodStore.load(prodLoadParams);
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
    	var parentCat=false;
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
                	//отримуємо батьківську категорію (щоб не перезавантажувати весь стор)
                	parentCat=this.catEdtWin.selCat;
                	ajaxConf.params.parent=this.catEdtWin.selCat.get('id');
                }
                else {
                    ajaxConf.params.parent=0;
                }                
            }
            else {
                if (this.catEdtWin.selCat!=undefined) {
                	//отримуємо батьківську категорію (щоб не перезавантажувати весь стор)
                	parentCat=Ext.getCmp('nb-product-tree').getStore()
                    									   .getNodeById(this.catEdtWin.selCat.get('id'))
                    									   .parentNode;                	
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
                	Ext.getCmp('nb-product-tree').getStore().clearOnLoad=true;
                	if (parentCat) {                		
                		Ext.getCmp('nb-product-tree').getStore().load({node: parentCat});	
                	}
                	else {
                		Ext.getCmp('nb-product-tree').getStore().load();	
                	}                                                           
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
    	//отримуємо батьківську категорію (щоб не перезавантажувати весь стор)
    	var parentCat=Ext.getCmp('nb-product-tree').getStore()
    	                                           .getNodeById(this.catDelWin.selCat.get('id'))
    	                                           .parentNode;
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
            	Ext.getCmp('nb-product-tree').getStore().clearOnLoad=true;
                Ext.getCmp('nb-product-tree').getStore().load({node: parentCat}); 
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
        //якщо клікнули по ітему "Далее"
        else if (warId.substr(0,1)=='m') {
        	//отримуємо стор та ід-шку категорії
        	var prodStore=Ext.getCmp('nb-product-tree').getStore();
        	var catId=prodStore.getNodeById(warId).parentNode.get('id');
        	prodStore.getProxy().extraParams.from=record.get('misc');
        	//перезавантажуємо стор
        	prodStore.load({
        		node: prodStore.getNodeById(catId)
        	});
        	console.log(catId);
        }
    },
    searchProd: function () {
        this.prodSearchWin=this.getView('product.Search').create();
        this.prodSearchWin.show();
    },
    searchProdFieldChange: function (thisCB,newVal,oldVal,eOpt) {
        //отримуємо поле по якшому здійснюється пошук
        var srchField=thisCB.getStore().getById(newVal).get('field');
        //в залежності від вибраного поля генеруємо відповідне поле вводу
        Ext.getCmp('nb-prod-srch-cont').remove('nb-prod-srch-fval',true);
        switch (srchField) {
            case 'id':          
            case 'product':   
            case 'model':
            case 'serialnum':
            case 'factorynum':
            case 'guarantee':
            case 'name':
            case 'personaldata':
            case 'address':
            case 'phone':
            case 'wphone':
            case 'hphone':
            case 'complaints':
            case 'performance':
            case 'notes':    
            case 'check':
            case 'comments':
            case 'total':    
                var srchInput=Ext.create('Ext.form.field.Text',{
                    id: 'nb-prod-srch-fval',
                    labelWidth: 55,
                    fieldLabel: 'Значение',
                    width: 260,
                    allowBlank: false
                });
                break;
            case 'date_start':
            case 'date_end':
            case 'notified': 
            case 'sold':
            case 'gdate':    
                var srchInput=Ext.create('Ext.form.field.Date',{
                    id: 'nb-prod-srch-fval',
                    format: 'd.m.Y',
                    labelWidth: 55,
                    fieldLabel: 'Значение',
                    width: 260,
                    allowBlank: false                    
                });
                break; 
            case 'sellerID':            
                var srchInput=Ext.create('Ext.form.field.ComboBox',{
                    id: 'nb-prod-srch-fval',
                    labelWidth: 55,
                    fieldLabel: 'Значение',
                    width: 260,
                    store: 'Seller',
                    displayField: 'name',
                    valueField: 'id',
                    forceSelection: true,
                    allowBlank: false
                });
                break; 
            case 'masterID':            
                var srchInput=Ext.create('Ext.form.field.ComboBox',{
                    id: 'nb-prod-srch-fval',
                    labelWidth: 55,
                    fieldLabel: 'Значение',
                    width: 260,
                    store: 'Master',
                    displayField: 'name',
                    valueField: 'id',
                    forceSelection: true,
                    allowBlank: false
                });
                break; 
        }
        Ext.getCmp('nb-prod-srch-cont').add(srchInput);
    },
    searchWinOk: function () {
        if (Ext.getCmp('nb-prod-srch-field').isValid()) {
            var srchField=this.getStore('SearchField').getById(Ext.getCmp('nb-prod-srch-field').getValue());
            var prodLoadParams={};
            prodLoadParams.scope=this;
            prodLoadParams.callback=function(records, operation, success) {
                    var json=this.getStore('Product').getProxy().getReader().rawData;
                    if (success) {
                        Ext.Msg.alert('Сообщение','Найдено '+json.count+' заказ(ов)');
                    }
                    else {
                        Ext.Msg.alert('Сообщение',json.message);
                    }
                }
            prodLoadParams.params={};
            prodLoadParams.params.search=1;
            prodLoadParams.params.table=srchField.get('table');
            prodLoadParams.params.field=srchField.get('field');
            switch (prodLoadParams.params.field) {
                case 'date_start':
                case 'date_end':
                case 'notified':
                case 'sold':
                case 'gdate':    
                    prodLoadParams.params.search_terms=Ext.Date.format(Ext.getCmp('nb-prod-srch-fval').getValue(),'d.m.Y');
                    break;
                default:
                    prodLoadParams.params.search_terms=Ext.getCmp('nb-prod-srch-fval').getValue();
                    break;
            }               
            prodLoadParams.params.between=0;
            if (Ext.getCmp('nb-prod-srch-per').getValue()) {
                prodLoadParams.params.between=1;
                prodLoadParams.params.first_date=Ext.Date.format(Ext.getCmp('nb-prod-srch-fdate').getValue(),'d.m.Y');
                prodLoadParams.params.second_date=Ext.Date.format(Ext.getCmp('nb-prod-srch-sdate').getValue(),'d.m.Y');
            }
            this.getStore('Product').clearOnLoad=true;
            this.getStore('Product').load(prodLoadParams);
            this.prodSearchWin.close();
        }
    },
    searchWinClose: function () {
        this.prodSearchWin.close();
    },
    searchProdReset: function () {
    	this.getStore('Product').clearOnLoad=true;
        this.getStore('Product').load();
    }
});