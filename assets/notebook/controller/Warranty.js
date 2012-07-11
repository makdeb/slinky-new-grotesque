Ext.define('Notebook.controller.Warranty',{
    extend: 'Ext.app.Controller',
    isNew: true,
    uplFile: '',
    models: [
        'Category',
        'Master',
        'Seller',
        'Status',
        'Notetpl',
        'Ptemplate'
    ],
    stores: [
        'Category',
        'Master',
        'Seller',
        'Status',
        'Notetpl',
        'Ptemplate'
    ],    
    views: [
        'warranty.Form',
        'warranty.Ptemplate',
        'warranty.Delete'
    ],  
    init: function () {
        this.control({
            'main-menu button#nb-new-warranty': {
                click: this.newWarranty
            },            
            'main-menu button#nb-rec-warranty': {
                click: this.recWarranty
            },
            'main-menu button#nb-save-warranty': {
                click: this.saveWarranty
            },   
            'main-menu button#nb-del-warranty': {
                click: this.delWarranty
            },
            'button#nb-war-del-win-ok': {
                click: this.delWarWinOk
            },
            'button#nb-war-del-win-cancel': {
                click: this.delWarWinCancel
            },            
            'main-menu button#nb-copy-warranty': {
                click: this.copyWarranty
            },
            'main-menu button#nb-print-warranty': {
                click: this.warPrint
            },
            'warranty-form button#nb-war-upload-file': {
                click: this.uploadFile
            },            
            'warranty-form button#nb-war-copy-cust-info': {
                click: this.copyCustInfo
            },
            'warranty-form button#nb-war-add-note-templ': {
                click: function () {
                    var warNotes=Ext.getCmp('nb-war-notes');
                    if (warNotes.getValue()=='') {
                        warNotes.setValue(Ext.getCmp('nb-war-note-templ').getRawValue());
                    }
                    else {
                        warNotes.setValue(warNotes.getValue()+'+'+Ext.getCmp('nb-war-note-templ').getRawValue());
                    }
                }
            },             
            'warranty-form button#nb-war-master-visible-toggle': {
                click: function () {
                    var secMasterContainer=Ext.getCmp('nb-war-sec-mas-container');
                    if (secMasterContainer.isVisible()) {
                        secMasterContainer.hide();                        
                    }
                    else
                    {
                        secMasterContainer.show();
                    }
                    this.evalForm();
                }
            },           
            'warranty-form #nb-war-work-prim': {
                change: this.evalForm
            }, 
            'warranty-form #nb-war-work-sec': {
                change: this.evalForm
            },                
            'warranty-form #nb-war-det': {
                change: this.evalForm
            },
            'warranty-form #nb-war-trans': {
                change: this.evalForm
            },
            'warranty-form button#nb-war-view-file': {
                click: function () {
                    if (this.uplFile!='') {
                        window.open(uploads_path+this.uplFile,'_blank');
                    }
                    else {
                        Ext.Msg.alert('Сообщение','Для этого заказа нет прикрепленных файлов');
                    }
                }
            },
            '#nb-ptpl-win-print': {
                click: this.ptplPrint
            },
            '#nb-ptpl-win-cancel': {
                click: function () {
                    this.ptplWin.close();
                }
            }
        });
    },
    //розраховує загальну суму
    evalForm: function () {
        var warDet=Ext.getCmp('nb-war-det');
        var warDetVal=0;
        if (warDet.isValid()&&warDet.getValue()!='') {
            warDetVal=eval(warDet.getValue());
        }
        var warTrans=Ext.getCmp('nb-war-trans');
        var warTransVal=0;
        if (warTrans.isValid()&&warTrans.getValue()!='') {
            warTransVal=eval(warTrans.getValue());
        }       
        var warMasPrimWork=Ext.getCmp('nb-war-work-prim');
        var warMasPrimWorkVal=0;
        if (warMasPrimWork.isValid()&&warMasPrimWork.getValue()!='') {
            warMasPrimWorkVal=eval(warMasPrimWork.getValue());
        }               
        var warMasSecWork=Ext.getCmp('nb-war-work-sec');
        var warMasSecWorkVal=0;
        if (warMasSecWork.isValid()&&warMasSecWork.getValue()!=''&&Ext.getCmp('nb-war-sec-mas-container').isVisible()) {
            warMasSecWorkVal=eval(warMasSecWork.getValue());
        }                
        Ext.getCmp('nb-war-total-price').setValue(warDetVal+warTransVal+warMasPrimWorkVal+warMasSecWorkVal);
    },
    fillForm: function (warId) {
        //проставляємо відмітку, що ми вибрали існуюче замовлення
        var thisController=this;
        //this.isNew=false;
        var ajaxConf={
            method: 'GET',
            url: 'notebook/fill_order',
            params: {
                id: warId
            },
            success: function (resp,opts) {                    
                var json=Ext.decode(resp.responseText);
                if (json.success) {
                    //при успішному виконанні запиту заповнюємо поля форми
                    Ext.getCmp('nb-war-id').setValue(json.order.id);
                    Ext.getCmp('nb-war-date-start').setValue(Ext.Date.parse(json.order.date_start,'Y-m-d'));
                    Ext.getCmp('nb-war-date-end').setValue(Ext.Date.parse(json.order.date_end,'Y-m-d'));        
                    Ext.getCmp('nb-war-in-workshop').setValue(json.order.type);        
                    Ext.getCmp('nb-war-prod').setValue(json.order.product);
                    Ext.getCmp('nb-war-model').setValue(json.order.model);
                    Ext.getCmp('nb-war-ser-num').setValue(json.order.serialnum);
                    Ext.getCmp('nb-war-fac-num').setValue(json.order.factorynum);
                    Ext.getCmp('nb-war-guar').setValue(json.order.guarantee);
                    Ext.getCmp('nb-war-cat').setValue(json.order.idCategories);
                    Ext.getCmp('nb-war-cust').setValue(json.order.customer);
                    Ext.getCmp('nb-war-cust-info').setValue(json.order.personaldata);
                    Ext.getCmp('nb-war-adr').setValue(json.order.address);
                    Ext.getCmp('nb-war-hphone').setValue(json.order.hphone);
                    Ext.getCmp('nb-war-wphone').setValue(json.order.wphone);
                    Ext.getCmp('nb-war-phone').setValue(json.order.phone);
                    Ext.getCmp('nb-war-date-notif').setValue(Ext.Date.parse(json.order.notified,'Y-m-d'));
                    Ext.getCmp('nb-war-cust-state').setValue(json.order.idBlacklist);
                    Ext.getCmp('nd-war-compl').setValue(json.order.complaints);
                    Ext.getCmp('nb-war-pref').setValue(json.order.performance);
                    Ext.getCmp('nb-war-notes').setValue(json.order.notes);
                    Ext.getCmp('nb-war-seller').setValue(json.order.idSellers);
                    Ext.getCmp('nb-war-ticket-price').setValue(json.order.check);
                    Ext.getCmp('nb-war-guar-comm').setValue(json.order.comments);        
                    Ext.getCmp('nb-war-mas-prim').setValue(json.order.idMasters);
                    Ext.getCmp('nb-war-work-prim').setValue(json.order.worksum);
                    if (json.order.id2Masters!=undefined && json.order.id2Masters!='' && json.order.id2Masters!=1) {
                        Ext.getCmp('nb-war-sec-mas-container').show();    
                    }
                    else {
                        Ext.getCmp('nb-war-sec-mas-container').hide();
                    }
                    Ext.getCmp('nb-war-mas-sec').setValue(json.order.id2Masters);
                    Ext.getCmp('nb-war-work-sec').setValue(json.order.worksum2);
                    Ext.getCmp('nb-war-det').setValue(json.order.details);
                    Ext.getCmp('nb-war-trans').setValue(json.order.transportation); 
                    Ext.getCmp('nb-war-total-price').setValue(json.order.total);
                    Ext.getCmp('nb-war-gdate').setValue(Ext.Date.parse(json.order.gdate,'Y-m-d'));
                    thisController.uplFile=json.order.file;
                    thisController.isNew=false;
                }
                else {
                    Ext.Msg.alert('Сообщение',json.message);
                }
            },
            failure: function () {
                Ext.Msg.alert('Сообщение','Ошибка при AJAX запросе');
            }
        };
        Ext.Ajax.request(ajaxConf);
    },
    fillAjaxParams: function (action) {
        var invalidFields='';
        Ext.each(Ext.ComponentQuery.query(
            '#nb-war-id,'+
            '#nb-war-in-workshop,'+
            '#nb-war-prod,'+
            '#nb-war-model,'+
            '#nb-war-ser-num,'+
            '#nb-war-fac-num,'+
            '#nb-war-guar,'+
            '#nb-war-cust,'+
            '#nb-war-cust-info,'+
            '#nb-war-adr,'+
            '#nb-war-hphone,'+
            '#nb-war-wphone,'+
            '#nb-war-phone,'+
            '#nb-war-date-notif,'+
            '#nd-war-compl,'+
            '#nb-war-pref,'+
            '#nb-war-notes,'+
            '#nb-war-ticket-price,'+
            '#nb-war-guar-comm,'+
            '#nb-war-work-prim,'+
            '#nb-war-work-sec,'+
            '#nb-war-det,'+
            '#nb-war-trans,'+
            '#nb-war-total-price'    
        ),function(item,index,allItems){
            if (!item.isValid()) {
                if (invalidFields=='') {
                    invalidFields=item.fieldLabel;
                }
                else {
                    invalidFields+=','+item.fieldLabel;
                }                
            }
        });
        if (invalidFields!='') {
            Ext.Msg.alert('Сообщение','Не правильно заполнены поля:\n'+invalidFields);
            return false;
        }        
        //отримуємо значення полів форми                
        //var warStartDate=Ext.getCmp('nb-war-date-start');
        //var warEndDate=Ext.getCmp('nb-war-date-end');
        var warId=Ext.getCmp('nb-war-id');            
        var warInWS=Ext.getCmp('nb-war-in-workshop');
        var warProd=Ext.getCmp('nb-war-prod');
        var warModel=Ext.getCmp('nb-war-model');
        var warSerNum=Ext.getCmp('nb-war-ser-num');
        var warFacNum=Ext.getCmp('nb-war-fac-num');
        var warGuar=Ext.getCmp('nb-war-guar');
        var warCat=Ext.getCmp('nb-war-cat');
        var warCust=Ext.getCmp('nb-war-cust');
        var warCustInfo=Ext.getCmp('nb-war-cust-info');
        var warAdr=Ext.getCmp('nb-war-adr');
        var warHPhone=Ext.getCmp('nb-war-hphone');
        var warWPhone=Ext.getCmp('nb-war-wphone');
        var warPhone=Ext.getCmp('nb-war-phone');
        var warNotifDate=Ext.getCmp('nb-war-date-notif');
        var warCustState=Ext.getCmp('nb-war-cust-state');
        var warCompl=Ext.getCmp('nd-war-compl');
        var warPref=Ext.getCmp('nb-war-pref');
        var warNotes=Ext.getCmp('nb-war-notes');
        var warSeller=Ext.getCmp('nb-war-seller');
        var warTicketPrice=Ext.getCmp('nb-war-ticket-price');
        var warGuarComm=Ext.getCmp('nb-war-guar-comm');
        var warMasPrim=Ext.getCmp('nb-war-mas-prim');
        var warWorkPrim=Ext.getCmp('nb-war-work-prim');
        var warMasSec=Ext.getCmp('nb-war-mas-sec');
        var warWorkSec=Ext.getCmp('nb-war-work-sec');
        var warDet=Ext.getCmp('nb-war-det');
        var warTrans=Ext.getCmp('nb-war-trans');
        var warTotalPrice=Ext.getCmp('nb-war-total-price');
        var warGDate=Ext.getCmp('nb-war-gdate');                     
        var ajaxParams={};
        if (action!='copy_cust') {
            if (action=='update' || action=='copy') {
                ajaxParams.id=warId.getValue();
            }        
            ajaxParams.categoryID=warCat.getValue();
            if (warInWS.getValue()) {
                ajaxParams.type=1;
            }
            else {
                ajaxParams.type=0;
            }        
            ajaxParams.model=warModel.getValue();
            ajaxParams.product=warProd.getValue();
            ajaxParams.serialnum=warSerNum.getValue();
            ajaxParams.factorynum=warFacNum.getValue();
            ajaxParams.guarantee=warGuar.getValue();
            ajaxParams.notified=Ext.Date.format(warNotifDate.getValue(),'d.m.Y');
            ajaxParams.complaints=warCompl.getValue();
            ajaxParams.performance=warPref.getValue();
            ajaxParams.notes=warNotes.getValue();
            ajaxParams.sellerID=warSeller.getValue();
            ajaxParams.check=warTicketPrice.getValue();
            ajaxParams.comments=warGuarComm.getValue();
            ajaxParams.masterID=warMasPrim.getValue();       
            ajaxParams.worksum=warWorkPrim.getValue();        
            if (Ext.getCmp('nb-war-sec-mas-container').isVisible()) {
                ajaxParams.master2ID=warMasSec.getValue();
                ajaxParams.worksum2=warWorkSec.getValue();
            }
            else {
                ajaxParams.master2ID=1;
                ajaxParams.worksum2=0;            
            }
            ajaxParams.details=warDet.getValue();
            ajaxParams.transportation=warTrans.getValue();
            ajaxParams.total=warTotalPrice.getValue();
            ajaxParams.gdate=Ext.Date.format(warGDate.getValue(),'d.m.Y');
        }
        ajaxParams.name=warCust.getValue();
        ajaxParams.address=warAdr.getValue();
        ajaxParams.phone=warPhone.getValue();
        ajaxParams.wphone=warWPhone.getValue();
        ajaxParams.hphone=warHPhone.getValue();
        ajaxParams.personaldata=warCustInfo.getValue();
        ajaxParams.blacklistID=warCustState.getValue();          
        return ajaxParams;
    },
    newWarranty: function() {
        //вказуємо, що при доданні нового замовлення можливий лише його прийом, а не збереження
        this.isNew=true;        
        //очищаємо форму
        Ext.getCmp('nb-war-id').setValue('');
        Ext.getCmp('nb-war-date-start').setValue('');
        Ext.getCmp('nb-war-date-end').setValue('');        
        Ext.getCmp('nb-war-in-workshop').setValue(0);        
        Ext.getCmp('nb-war-prod').setValue('');
        Ext.getCmp('nb-war-prod').clearInvalid();
        Ext.getCmp('nb-war-model').setValue('');
        Ext.getCmp('nb-war-ser-num').setValue('');
        Ext.getCmp('nb-war-fac-num').setValue('');
        Ext.getCmp('nb-war-guar').setValue('');
        Ext.getCmp('nb-war-cat').setValue('2');
        Ext.getCmp('nb-war-cust').setValue('');
        Ext.getCmp('nb-war-cust').clearInvalid();
        Ext.getCmp('nb-war-cust-info').setValue('');
        Ext.getCmp('nb-war-adr').setValue('');
        Ext.getCmp('nb-war-hphone').setValue('');
        Ext.getCmp('nb-war-wphone').setValue('');
        Ext.getCmp('nb-war-phone').setValue('');
        Ext.getCmp('nb-war-date-notif').setValue('');
        Ext.getCmp('nb-war-cust-state').setValue('1');
        Ext.getCmp('nd-war-compl').setValue('');
        Ext.getCmp('nb-war-pref').setValue('');
        Ext.getCmp('nb-war-notes').setValue('');
        Ext.getCmp('nb-war-seller').setValue('1');
        Ext.getCmp('nb-war-ticket-price').setValue('');
        Ext.getCmp('nb-war-guar-comm').setValue('');        
        Ext.getCmp('nb-war-mas-prim').clearValue();
        Ext.getCmp('nb-war-work-prim').setValue('');
        Ext.getCmp('nb-war-sec-mas-container').hide();
        Ext.getCmp('nb-war-mas-sec').clearValue();
        Ext.getCmp('nb-war-work-sec').setValue('');
        Ext.getCmp('nb-war-det').setValue('');
        Ext.getCmp('nb-war-trans').setValue(''); 
        Ext.getCmp('nb-war-total-price').setValue(''); 
        Ext.getCmp('nb-war-gdate').setValue(''); 
        this.uplFile='';
    },
    recWarranty: function() {
        //прийом можливий лише, коли стоїть відмітка про те, що замовлення нове
        if (this.isNew) {
            var ajaxConf={};
            ajaxConf.method='POST';
            ajaxConf.url='notebook/create_order'; 
            ajaxConf.params=this.fillAjaxParams();
            if (!ajaxConf.params) {
                return;
            }
            ajaxConf.success=function (resp,opts) {
                var json=Ext.decode(resp.responseText);
                if (json.success) {
                    //при успішному виконанні запиту встановлюємо id замовлення
                    Ext.getCmp('nb-war-id').setValue(json.id);
                    //оновлюємо дерево...
                    Ext.getCmp('nb-product-tree').getStore().load(); 
                    Ext.Msg.alert('Сообщение',json.message);  
                }
                else {
                    Ext.Msg.alert('Сообщение',json.message);  
                }
            }
            ajaxConf.failure=function () {
                Ext.Msg.alert('Сообщение','Ошибка при AJAX запросе');
            }        
            Ext.Ajax.request(ajaxConf);
        }
        else {
            Ext.Msg.alert('Сообщение','Повторный прийом введеного заказа не возможен.');            
        }
    },
    saveWarranty: function () {
        //збереження можливе лише коли стоїть відмітка про те, що замовлення не нове
        if (!this.isNew) {            
            //отримуємо значення полів форми         
            var ajaxConf={};
            ajaxConf.method='POST';
            ajaxConf.url='notebook/update_order';
            ajaxConf.params={};
            ajaxConf.params=this.fillAjaxParams('update');
            if (!ajaxConf.params) {
                return;
            }    
            ajaxConf.success=function (resp,opts) {
                var json=Ext.decode(resp.responseText);
                if (json.success) {
                    //оновлюємо дерево...                    
                    Ext.getCmp('nb-product-tree').getStore().load();
                    Ext.Msg.alert('Сообщение',json.message);
                }
                else {
                    Ext.Msg.alert('Сообщение',json.message);
                }
            }
            ajaxConf.failure=function () {
                Ext.Msg.alert('Сообщение','Ошибка при AJAX запросе');
            }        
            Ext.Ajax.request(ajaxConf); 
        }
        else {
            Ext.Msg.alert('Сообщение','Сохранение не возможно при вводе нового заказа. Необходимо выполнить прием.');
        }
    },
    delWarranty: function () {
        if (!this.isNew) {
            this.warDelWin=this.getView('warranty.Delete').create();
            this.warDelWin.getComponent('nb-war-del-win-container')
                                .getComponent('nb-war-del-win-message')
                                    .update('Удалить заказ №'+Ext.getCmp('nb-war-id').getValue()+' ?');            
            this.warDelWin.show();
        }
        else {
            Ext.Msg.alert('Сообщение','Удалить можно только сохраненній заказ');
        }        
    },
    delWarWinOk: function () {
        var thisController=this;
        //отримуємо значення полів форми         
        var ajaxConf={};
        ajaxConf.method='GET';
        ajaxConf.url='notebook/remove_order';
        ajaxConf.params={}; 
        ajaxConf.params.id=Ext.getCmp('nb-war-id').getValue();
        ajaxConf.success=function (resp,opts) {
            var json=Ext.decode(resp.responseText);
            if (json.success) {
                //оновлюємо дерево...
                thisController.newWarranty();
                Ext.getCmp('nb-product-tree').getStore().load();
                Ext.Msg.alert('Сообщение',json.message);
            }
            else {
                Ext.Msg.alert('Сообщение',json.message);
            }
        }
        ajaxConf.failure=function () {
            Ext.Msg.alert('Сообщение','Ошибка при AJAX запросе');
        }        
        Ext.Ajax.request(ajaxConf); 
        this.warDelWin.close();        
    },
    delWarWinCancel: function () {
        this.warDelWin.close();
    },
    copyWarranty: function () {
        if (!this.isNew) {
            var ajaxConf={};
            ajaxConf.url='notebook/copy_order';
            ajaxConf.method='POST';
            ajaxConf.params={};
            ajaxConf.params=this.fillAjaxParams('copy');
            if (!ajaxConf.params) {
                return;
            }  
            ajaxConf.success=function (resp,opts) {
                var json=Ext.decode(resp.responseText);
                if (json.success) {
                    Ext.getCmp('nb-war-id').setValue(json.order.id);
                    Ext.getCmp('nb-war-date-start').setValue(Ext.Date.parse(json.order.date_start,'Y-m-d'));
                    Ext.getCmp('nb-war-date-end').setValue(Ext.Date.parse(json.order.date_end,'Y-m-d'));        
                    Ext.getCmp('nb-war-in-workshop').setValue(json.order.type);        
                    Ext.getCmp('nb-war-prod').setValue(json.order.product);
                    Ext.getCmp('nb-war-model').setValue(json.order.model);
                    Ext.getCmp('nb-war-ser-num').setValue(json.order.serialnum);
                    Ext.getCmp('nb-war-fac-num').setValue(json.order.factorynum);
                    Ext.getCmp('nb-war-guar').setValue(json.order.guarantee);
                    Ext.getCmp('nb-war-cat').setValue(json.order.idCategories);
                    Ext.getCmp('nb-war-cust').setValue(json.order.customer);
                    Ext.getCmp('nb-war-cust-info').setValue(json.order.personaldata);
                    Ext.getCmp('nb-war-adr').setValue(json.order.address);
                    Ext.getCmp('nb-war-hphone').setValue(json.order.hphone);
                    Ext.getCmp('nb-war-wphone').setValue(json.order.wphone);
                    Ext.getCmp('nb-war-phone').setValue(json.order.phone);
                    Ext.getCmp('nb-war-date-notif').setValue(Ext.Date.parse(json.order.notified,'Y-m-d'));
                    Ext.getCmp('nb-war-cust-state').setValue(json.order.idBlacklist);
                    Ext.getCmp('nd-war-compl').setValue(json.order.complaints);
                    Ext.getCmp('nb-war-pref').setValue(json.order.performance);
                    Ext.getCmp('nb-war-notes').setValue(json.order.notes);
                    Ext.getCmp('nb-war-seller').setValue(json.order.idSellers);
                    Ext.getCmp('nb-war-ticket-price').setValue(json.order.check);
                    Ext.getCmp('nb-war-guar-comm').setValue(json.order.comments);        
                    Ext.getCmp('nb-war-mas-prim').setValue(json.order.idMasters);
                    Ext.getCmp('nb-war-work-prim').setValue(json.order.worksum);
                    if (json.order.id2Masters!=undefined && json.order.id2Masters!='' && json.order.id2Masters!=1) {
                        Ext.getCmp('nb-war-sec-mas-container').show();    
                    }
                    else {
                        Ext.getCmp('nb-war-sec-mas-container').hide();
                    }
                    Ext.getCmp('nb-war-mas-sec').setValue(json.order.id2Masters);
                    Ext.getCmp('nb-war-work-sec').setValue(json.order.worksum2);
                    Ext.getCmp('nb-war-det').setValue(json.order.details);
                    Ext.getCmp('nb-war-trans').setValue(json.order.transportation); 
                    Ext.getCmp('nb-war-total-price').setValue(json.order.total);
                    //оновлюємо дерево...
                    Ext.getCmp('nb-product-tree').getStore().load(); 
                }
                else {
                    Ext.Msg.alert('Сообщение',json.message);
                }
            }
            ajaxConf.failure=function () {
                Ext.Msg.alert('Сообщение','Ошибка AJAX запроса');
            }        
            Ext.Ajax.request(ajaxConf);             
        }
        else {
            Ext.Msg.alert('Сообщение','Копировать можно только существующий заказ');
        }
    },
    copyCustInfo: function () {
        if (!this.isNew) {
            var ajaxConf={};
            ajaxConf.url='notebook/fill_customer';
            ajaxConf.method='POST';
            ajaxConf.params={};
            ajaxConf.params=this.fillAjaxParams('copy_cust');
            if (!ajaxConf.params) {
                return;
            }  
            ajaxConf.success=function (resp,opts) {
                var json=Ext.decode(resp.responseText);
                if (json.success) {
                    Ext.getCmp('nb-war-id').setValue(json.order.id);
                    Ext.getCmp('nb-war-date-start').setValue(Ext.Date.parse(json.order.date_start,'Y-m-d'));
                    Ext.getCmp('nb-war-date-end').setValue(Ext.Date.parse(json.order.date_end,'Y-m-d'));        
                    Ext.getCmp('nb-war-in-workshop').setValue(json.order.type);        
                    Ext.getCmp('nb-war-prod').setValue(json.order.product);
                    Ext.getCmp('nb-war-model').setValue(json.order.model);
                    Ext.getCmp('nb-war-ser-num').setValue(json.order.serialnum);
                    Ext.getCmp('nb-war-fac-num').setValue(json.order.factorynum);
                    Ext.getCmp('nb-war-guar').setValue(json.order.guarantee);
                    Ext.getCmp('nb-war-cat').setValue(json.order.idCategories);
                    Ext.getCmp('nb-war-cust').setValue(json.order.customer);
                    Ext.getCmp('nb-war-cust-info').setValue(json.order.personaldata);
                    Ext.getCmp('nb-war-adr').setValue(json.order.address);
                    Ext.getCmp('nb-war-hphone').setValue(json.order.hphone);
                    Ext.getCmp('nb-war-wphone').setValue(json.order.wphone);
                    Ext.getCmp('nb-war-phone').setValue(json.order.phone);
                    Ext.getCmp('nb-war-date-notif').setValue(Ext.Date.parse(json.order.notified,'Y-m-d'));
                    Ext.getCmp('nb-war-cust-state').setValue(json.order.idBlacklist);
                    Ext.getCmp('nd-war-compl').setValue(json.order.complaints);
                    Ext.getCmp('nb-war-pref').setValue(json.order.performance);
                    Ext.getCmp('nb-war-notes').setValue(json.order.notes);
                    Ext.getCmp('nb-war-seller').setValue(json.order.idSellers);
                    Ext.getCmp('nb-war-ticket-price').setValue(json.order.check);
                    Ext.getCmp('nb-war-guar-comm').setValue(json.order.comments);        
                    Ext.getCmp('nb-war-mas-prim').setValue(json.order.idMasters);
                    Ext.getCmp('nb-war-work-prim').setValue(json.order.worksum);
                    if (json.order.id2Masters!=undefined && json.order.id2Masters!='' && json.order.id2Masters!=1) {
                        Ext.getCmp('nb-war-sec-mas-container').show();    
                    }
                    else {
                        Ext.getCmp('nb-war-sec-mas-container').hide();
                    }
                    Ext.getCmp('nb-war-mas-sec').setValue(json.order.id2Masters);
                    Ext.getCmp('nb-war-work-sec').setValue(json.order.worksum2);
                    Ext.getCmp('nb-war-det').setValue(json.order.details);
                    Ext.getCmp('nb-war-trans').setValue(json.order.transportation); 
                    Ext.getCmp('nb-war-total-price').setValue(json.order.total);
                    //оновлюємо дерево...
                    Ext.getCmp('nb-product-tree').getStore().load(); 
                }
                else {
                    Ext.Msg.alert('Сообщение',json.message);
                }
            }
            ajaxConf.failure=function () {
                Ext.Msg.alert('Сообщение','Ошибка AJAX запроса');
            }        
            Ext.Ajax.request(ajaxConf);             
        }
        else {
            Ext.Msg.alert('Сообщение','Копировать можно только существующий заказ');
        }        
    },
    uploadFile: function () {
        if (!this.isNew) {
            var uploadForm=Ext.getCmp('nb-war-file-upload-form').getForm();
            if (uploadForm.isValid()) {
                var thisController=this;
                uploadForm.submit({
                    url: 'notebook/do_upload',
                    waitMsg: 'Ваш файл загружается...',
                    params: {
                        id: Ext.getCmp('nb-war-id').getValue()
                    },
                    success: function (fp,opts) {
                        Ext.Msg.alert('Сообщение',opts.result.message);
                        thisController.uplFile=opts.result.file;
                    },
                    failure: function (fp,opts) {
                        Ext.Msg.alert('Сообщение',opts.result.message);
                    }
                });
            }
            else
            {
                Ext.Msg.alert('Сообщение','Выберите файл для загрузки');
            }
        } 
        else {
            Ext.Msg.alert('Сообщение','Добавление файла возможно только после приема');
        }
    },
    ptplPrint: function () {
        var ptplWinCont=this.ptplWin.getComponent('nb-ptpl-win-container');        
        if (ptplWinCont.getComponent('nb-ptpl-win-templ').isValid()) {            
            window.open(print_url+ptplWinCont.getComponent('nb-ptpl-win-templ').getValue()+'/'+Ext.getCmp('nb-war-id').getValue(),'_blank');
            this.ptplWin.close();
        }
        else {
            Ext.Msg.alert('Сообщение','Выберите шаблон');
        }
    },
    warPrint: function () {
        var selWar=Ext.getCmp('nb-war-id').getValue();
        if (selWar!=undefined && selWar!='') {
            this.ptplWin=this.getView('warranty.Ptemplate').create();
            this.ptplWin.show();
        }
        else {
            Ext.Msg.alert('Сообщение','Выберите заказ, или сохраните текущий');
        }
    }
});


