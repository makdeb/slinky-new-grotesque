Ext.define('Notebook.view.warranty.Form',{
    extend: 'Ext.container.Container',
    alias: 'widget.warranty-form',
    region: 'center', 
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    padding: '5',
    initComponent: function () {
        this.items=[
            {
                xtype: 'container',
                layout: {
                    type: 'hbox'
                },                   
                defaults: {
                    labelWidth: 50,
                    margin: '0 5 0 0'
                },
                items: [
                    {
                        xtype: 'textfield',
                        id: 'nb-war-id',
                        fieldLabel: '№ п\п',
                        width: 120,
                        readOnly: true
                    },                    
                    {
                        xtype: 'textfield',
                        id: 'nb-war-prod',
                        fieldLabel: 'Виріб',
                        width: 220,
                        vtype: 'cyralphanum'
                    },
                    {
                        xtype: 'combobox',
                        id: 'nb-war-cat',
                        fieldLabel: 'Категорія',
                        labelWidth: 60,
                        width: 220,
                        store: 'Category',
                        displayField: 'name',
                        valueField: 'id',
                        forceSelection: true
                    },
                    {
                        xtype: 'datefield',
                        id:'nb-war-date-start',
                        format: 'd.m.Y',
                        fieldLabel: 'Прийнято',
                        labelWidth: 60,
                        width: 160,
                        readOnly: true
                    },
                    {
                        xtype: 'datefield',
                        id:'nb-war-date-end',
                        format: 'd.m.Y',
                        fieldLabel: 'Видано',
                        labelWidth: 60,
                        width: 160,
                        readOnly: true 
                    }                    
                ]
            },  
//Відомості про клієнта
            {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretchmax'
                },
                defaults: {
                    margin: '0 5 0 0',
                    labelWidth: 100
                },
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Відомості про клієнта',
                        width: 450,
                        padding: '0 5 0 5',
                        items: [
                            {
                                xtype: 'textfield',
                                id:'nb-war-cust',
                                fieldLabel: 'Власник',
                                width: 435                                          
                            },
                            {
                                xtype: 'textfield',
                                id:'nb-war-adr',
                                fieldLabel: 'Адреса',
                                width: 435                                           
                            },
                            {
                                xtype: 'textfield',
                                id:'nb-war-hphone',
                                fieldLabel: 'Домашній тел.',
                                width: 435,
                                vtype: 'phone'
                            },
                            {
                                xtype: 'textfield',
                                id:'nb-war-wphone',
                                fieldLabel: 'Робочій тел.',
                                width: 435,
                                vtype: 'phone'
                            },
                            {
                                xtype: 'textfield',
                                id:'nb-war-phone',
                                fieldLabel: 'Мобільний тел.',
                                width: 435,
                                vtype: 'phone'
                            },
                            {
                                xtype: 'datefield',
                                id:'nb-war-date-notif',
                                fieldLabel: 'Повідомлено',
                                width: 200                                          
                            }                            
                        ]
                    },
//Скарги                    
                    {
                        xtype: 'fieldset',
                        title: 'Скарги',
                        width: 450, 
                        padding: '0 5 0 5',
                        defaults: {
                            labelWidth: 70
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'nd-war-compl',
                                fieldLabel: 'Скарги',
                                width: 435                                 
                            },
                            {
                                xtype: 'textarea',
                                id:'nb-war-pref',
                                fieldLabel: 'Виконана робота',
                                width: 435,
                                height: 105
                            },
                            {
                                xtype: 'textfield',
                                id:'nb-war-notes',
                                fieldLabel: 'Примітки',
                                width: 435                                 
                            }                            
                        ]
                    }
                ]
            },
//Відомості про гарантію            
            {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretchmax'
                },
                defaults: {
                    margin: '0 5 0 0'
                },
                items: [
                    {
                        xtype: 'fieldset',
                        layout: {
                            type: 'hbox',
                            align: 'stretchmax'
                        },                          
                        title: 'Відомості про гарантію',
                        width: 905,
                        padding: '0 5 0 5',
                        items: [
                            {
                                xtype: 'container',
                                margin: '0 18 0 0',
                                items: [
                                    {
                                        xtype: 'combobox',
                                        id:'nb-war-guar',
                                        fieldLabel: 'Гарантія',
                                        labelWidth: 70,
                                        width: 435,
                                        store: 'Guarantee',
                                        displayField: 'name',
                                        valueField: 'id',
                                        forceSelection: true                                        
                                    },
                                    {
                                        xtype: 'textfield',
                                        id:'nb-war-guar-cer',
                                        fieldLabel: 'Свідоцтво',
                                        labelWidth: 70,
                                        width: 435                                 
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                items: [                                
                                    {
                                        xtype: 'textarea',
                                        id: 'nb-war-guar-comm',
                                        fieldLabel: 'Примітки',
                                        labelWidth: 70,
                                        width: 435,
                                        height: 50
                                    }
                                ]
                            }                            
                        ]
                    },
                ]
            },
//Комплектність                        
            {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretchmax'
                },
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Комплектність',
                        width: 450,    
                        padding: '0 5 0 5',
                        items: [
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox'
                                },
                                margin: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'checkbox',
                                        margin: '0 5 0 0'
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Термінал №',
                                        labelWidth: 150,
                                        width: 415                                          
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox'
                                },
                                margin: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'checkbox',
                                        margin: '0 5 0 0'
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Акамулятор №',
                                        labelWidth: 150,
                                        width: 415                                           
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox'
                                },
                                margin: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'checkbox',
                                        margin: '0 5 0 0'
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'ЗП від електромережі №',
                                        labelWidth: 150,
                                        width: 415                                           
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox'
                                },
                                margin: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'checkbox',
                                        margin: '0 5 0 0'
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'ЗП від прикурювача №',
                                        labelWidth: 150,
                                        width: 415                                           
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox'
                                },
                                margin: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'checkbox',
                                        margin: '0 10 0 0',
                                        boxLabel: 'Антена'
                                    },
                                    {
                                        xtype: 'checkbox',
                                        margin: '0 10 0 0',
                                        boxLabel: 'Чохол'
                                    },
                                    {
                                        xtype: 'checkbox',
                                        margin: '0 10 0 0',
                                        boxLabel: 'Шнури'
                                    }                                    
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'hbox'
                                },
                                margin: '5 0 5 0',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        margin: '0 0 0 17',
                                        fieldLabel: 'Мобільний телефон',
                                        labelWidth: 150,
                                        width: 415                                           
                                    }
                                ]
                            }                            
                        ]
                    },
//Інші відомості                    
                    {
                        xtype: 'container',
                        layout: {
                            type: 'vbox'
                        },
                        margin: '0 0 0 5',
                        defaults: {
                            labelWidth: 80
                        },
                        items: [
                            {
                                xtype: 'fieldset',
                                title: 'Інші відомості',
                                width: 450,
                                padding: '0 5 0 5',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        id: 'nb-war-post',
                                        fieldLabel: 'Відправлено',
                                        width: 435                                           
                                    },
                                    {
                                        xtype: 'datefield',
                                        id: 'nb-war-psdate',
                                        fieldLabel: 'Відправлено',
                                        width: 200                                           
                                    } ,
                                    {
                                        xtype: 'datefield',
                                        id: 'nb-war-pedate',
                                        fieldLabel: 'Отримано',
                                        width: 200                                           
                                    },                                            
                                    {
                                        xtype: 'radiogroup',
                                        id: 'nb-war-type',
                                        columns: 1,
                                        margin: '13 0 0 0',
                                        items: [
                                            {
                                                boxLabel: 'Платний ремонт',
                                                inputValue: 0,
                                                name: 'nb-war-type-rb'
                                            },
                                            {
                                                boxLabel: 'Гарантійний ремонт',
                                                inputValue: 1,
                                                name: 'nb-war-type-rb'
                                            },
                                            {
                                                boxLabel: 'В очікуванні',
                                                inputValue: 2,
                                                name: 'nb-war-type-rb'
                                            }                                            
                                        ]
                                    }                                    
                                ]
                            }                           
                        ]
                    }
                ]
            },
//Майстер та ціни            
            {
                xtype: 'container',
                layout: {
                    type: 'hbox'
                },
                margin: '0 0 0 0',
                defaults: {
                    labelWidth: 70
                },
                items: [
                    {
                        xtype: 'combobox',
                        id: 'nb-war-mas',
                        fieldLabel: 'Майстер',
                        width: 245,
                        store: 'Master',
                        displayField: 'name',
                        valueField: 'id'                            
                    },
                    {
                        xtype: 'textfield',
                        id: 'nb-war-det',
                        fieldLabel: 'Запчастини',
                        margin: '0 0 0 5',
                        width: 237                                           
                    }, 
                    {
                        xtype: 'textfield',
                        id: 'nb-war-work',
                        fieldLabel: 'Робота',
                        margin: '0 0 0 5',
                        width: 237                                           
                    },                     
                    {
                        xtype: 'datefield',
                        id: 'nb-war-wdate',
                        fieldLabel: 'Гарантія до',
                        margin: '0 0 0 5',
                        width: 170                                          
                    }                   
                ]
            },
//Кнопки            
            {
                xtype: 'container',
                layout: {
                    type: 'hbox'
                },
                style: {
                    //borderTop: '1px solid #0B486B',
                    marginTop: '5px',
                    paddingTop: '5px'
                },
                items: [
                    {
                        xtype: 'button',
                        id: 'nb-rec-warranty',
                        text: 'Прийом',
                        icon: icons_path+'ord-rec.png'
                    },
                    {
                        xtype: 'button',
                        text: 'Видача',
                        icon: icons_path+'ord-out.png'
                    },
                    {
                        xtype: 'button',
                        text: 'Пошук'
                    },
                    {
                        xtype: 'button',
                        id: 'nb-print-warranty',
                        text: 'Друк',
                        icon: icons_path+'ord-print.png'
                    }                    
                ]
            }
        ];
        this.callParent();
    }    
});


