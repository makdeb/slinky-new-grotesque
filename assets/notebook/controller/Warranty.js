Ext.define('Notebook.controller.Warranty',{
    extend: 'Ext.app.Controller',
    isNew: true,
    models: [
        'Category',
        'Master',
        'Seller'
    ],
    stores: [
        'Category',
        'Master',
        'Seller'
    ],    
    views: [
        'warranty.Form'
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
            'main-menu button#nb-print-warranty': {
                click: this.warPrint
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
        this.isNew=false;
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
                    Ext.getCmp('nb-war-guar').setValue(json.order.idGuarantee);
                    Ext.getCmp('nb-war-guar-cer').setValue(json.order.certificate);
                    Ext.getCmp('nb-war-guar-comm').setValue(json.order.comments);
                    Ext.getCmp('nb-war-post').setValue(json.order.posted);
                    Ext.getCmp('nb-war-psdate').setValue(Ext.Date.parse(json.order.pstartdate,'Y-m-d'));
                    Ext.getCmp('nb-war-pedate').setValue(Ext.Date.parse(json.order.penddate,'Y-m-d'));
                    Ext.getCmp('nb-war-type').items.items[json.order.type].setValue(true);
                    Ext.getCmp('nb-war-mas').setValue(json.order.idMasters);                    
                    Ext.getCmp('nb-war-det').setValue(json.order.details); 
                    Ext.getCmp('nb-war-work').setValue(json.order.sum); 
                    Ext.getCmp('nb-war-wdate').setValue(json.order.gdate); 
                    //alert(Ext.getCmp('nb-war-type').getValue()['rb']);                                           
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
    fillAjaxParams: function () {
        //отримуємо значення полів форми
        var warProd=Ext.getCmp('nb-war-prod');
        var warCat=Ext.getCmp('nb-war-cat');
        var warStartDate=Ext.getCmp('nb-war-date-start');
        var warEndDate=Ext.getCmp('nb-war-date-end');
        var warCust=Ext.getCmp('nb-war-cust');
        var warAdr=Ext.getCmp('nb-war-adr');
        var warHPhone=Ext.getCmp('nb-war-hphone');
        var warWPhone=Ext.getCmp('nb-war-wphone');
        var warPhone=Ext.getCmp('nb-war-phone');
        var warNotifDate=Ext.getCmp('nb-war-date-notif');
        var warCompl=Ext.getCmp('nd-war-compl');
        var warPref=Ext.getCmp('nb-war-pref');
        var warNotes=Ext.getCmp('nb-war-notes');
        var warGuar=Ext.getCmp('nb-war-guar');
        var warGuarCer=Ext.getCmp('nb-war-guar-cer');
        var warGuarComm=Ext.getCmp('nb-war-guar-comm');
        var warPost=Ext.getCmp('nb-war-post');
        var warPSDate=Ext.getCmp('nb-war-psdate');
        var warPEDate=Ext.getCmp('nb-war-pedate');
        var warType=Ext.getCmp('nb-war-type');
        var warMas=Ext.getCmp('nb-war-mas');                    
        var warDet=Ext.getCmp('nb-war-det'); 
        var warWork=Ext.getCmp('nb-war-work'); 
        var warWDate=Ext.getCmp('nb-war-wdate');
        if (!warProd.isValid()) {
            Ext.Msg.alert('Сообщение','Неверно заполнено поле "Изделие"');
            return false;
        }
        if (!warCust.isValid()) {
            Ext.Msg.alert('Сообщение','Неверно заполнено поле "Владелец"');
            return false;
        }  
        if (!warAdr.isValid()) {
            Ext.Msg.alert('Сообщение','Неверно заполнено поле "Адресс"');
            return false;
        }   
        if (!warHPhone.isValid()) {
            Ext.Msg.alert('Сообщение','Неверно заполнено поле "Телефон"');
            return false;
        }   
        if (!warWPhone.isValid()) {
            Ext.Msg.alert('Сообщение','Неверно заполнено поле "Телефон"');
            return false;
        } 
        if (!warPhone.isValid()) {
            Ext.Msg.alert('Сообщение','Неверно заполнено поле "Телефон"');
            return false;
        }             
        if (!warDet.isValid()) {
            Ext.Msg.alert('Сообщение','Неверно заполнено поле "Деталі"');
            return false;
        }   
        if (!warWork.isValid()) {
            Ext.Msg.alert('Сообщение','Неверно заполнено поле "Робота"');
            return false;
        }             
         
        var ajaxParams={};
        ajaxParams.id=Ext.getCmp('nb-war-id').getValue();
        ajaxParams.type=warType.getValue()['nb-war-type-rb'];
        ajaxParams.product=warProd.getValue();
        ajaxParams.categoryID=warCat.getValue();
        ajaxParams.complaints=warCompl.getValue();
        ajaxParams.performance=warPref.getValue();
        ajaxParams.notes=warNotes.getValue();
        ajaxParams.sum=warWork.getValue();
        ajaxParams.details=warDet.getValue();
        ajaxParams.masterID=warMas.getValue();
        ajaxParams.guaranteeID=warGuar.getValue();
        ajaxParams.certificate=warGuarCer.getValue();
        ajaxParams.comments=warGuarComm.getValue();
        ajaxParams.posted=warPost.getValue();
        ajaxParams.name=warCust.getValue();
        ajaxParams.address=warAdr.getValue();
        ajaxParams.phone=warPhone.getValue();
        ajaxParams.wphone=warWPhone.getValue();
        ajaxParams.hphone=warHPhone.getValue();
        ajaxParams.gdate=Ext.Date.format(warWDate.getValue(),'d.m.Y');
        ajaxParams.pstartdate=Ext.Date.format(warPSDate.getValue(),'d.m.Y');
        ajaxParams.penddate=Ext.Date.format(warPEDate.getValue(),'d.m.Y');
        ajaxParams.notified=Ext.Date.format(warNotifDate.getValue(),'d.m.Y');   
        return ajaxParams;
    },
    newWarranty: function() {
        alert('eee');
        //вказуємо, що при доданні нового замовлення можливий лише його прийом, а не збереження
        this.isNew=true;        
        //очищаємо форму
        Ext.getCmp('nb-war-id').setValue('');
        Ext.getCmp('nb-war-prod').setValue('');
        Ext.getCmp('nb-war-cat').clearValue();
        Ext.getCmp('nb-war-date-start').setValue('');
        Ext.getCmp('nb-war-date-end').setValue('');
        Ext.getCmp('nb-war-cust').setValue('');
        Ext.getCmp('nb-war-adr').setValue('');
        Ext.getCmp('nb-war-hphone').setValue('');
        Ext.getCmp('nb-war-wphone').setValue('');
        Ext.getCmp('nb-war-phone').setValue('');
        Ext.getCmp('nb-war-date-notif').setValue('');
        Ext.getCmp('nd-war-compl').setValue('');
        Ext.getCmp('nb-war-pref').setValue('');
        Ext.getCmp('nb-war-notes').setValue('');
        Ext.getCmp('nb-war-guar').clearValue();
        Ext.getCmp('nb-war-guar-cer').setValue('');
        Ext.getCmp('nb-war-guar-comm').setValue('');
        Ext.getCmp('nb-war-post').setValue('');
        Ext.getCmp('nb-war-psdate').setValue('');
        Ext.getCmp('nb-war-pedate').setValue('');
        Ext.getCmp('nb-war-type').items.items[0].setValue(true);
        Ext.getCmp('nb-war-mas').clearValue();         
        Ext.getCmp('nb-war-det').setValue(''); 
        Ext.getCmp('nb-war-work').setValue('');
        Ext.getCmp('nb-war-wdate').setValue('');  
    },
    recWarranty: function() {
        alert('eee');
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
        else {
            Ext.Msg.alert('Повідомлення','Повторний прийом введеного замовлення не можливий.');            
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
            ajaxConf.params=this.fillAjaxParams();
            if (!ajaxConf.params) {
                return;
            }    
            ajaxConf.success=function (resp,opts) {
                var json=Ext.decode(resp.responseText);
                if (json.success) {
                    //оновлюємо дерево...
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
        else {
            Ext.Msg.alert('Повідомлення','Збереження не можливе при введенні нового замовлення. Необхідно виконати прийом.');
        }
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


