Ext.define('Notebook.view.warranty.Form',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.warranty-form',
    flex:1,
    bodyStyle: {
        background: '#DFE9F6'
    },
    autoScroll: true,
    initComponent: function () {
        this.items=[
            {
                xtype: 'container',
                layout: {
                    type: 'column'
                }, 
                margin: '5 0 0 5',
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
                        xtype: 'datefield',
                        id:'nb-war-date-start',
                        format: 'd.m.Y',
                        fieldLabel: 'Принято',
                        labelWidth: 60,
                        width: 160,
                        readOnly: true
                    },
                    {
                        xtype: 'datefield',
                        id:'nb-war-date-end',
                        format: 'd.m.Y',
                        fieldLabel: 'Выдано',
                        labelWidth: 60,
                        width: 160,
                        readOnly: true 
                    },
                    {
                        xtype: 'checkbox',
                        id: 'nb-war-in-workshop',
                        boxLabel: 'В мастерской'
                    }
                ]
            },
            {
                xtype: 'container',
                margin: '0 0 0 5',
                defaults: {
                    margin: '0 5 0 0',
                    labelWidth: 30
                },
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Изделие',
                        width: 742,
                        padding: '0 5 0 5',                    
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'nb-war-prod',
                                fieldLabel: 'Изделие',
                                labelWidth: 80,
                                width: 726,
                                vtype: 'cyralphanumplus',
                                allowBlank: false
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'column'
                                },
                                padding: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Модель',
                                        labelWidth: 80,
                                        width: 240,
                                        vtype: 'cyralphanumplus',
                                        allowBlank: false
                                    },
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Категория',
                                        labelWidth: 80,
                                        width: 240,
                                        allowBlank: false                                        
                                    }                                    
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'column'
                                },
                                padding: '0 0 5 0',
                                items: [                                    
                                    {
                                        xtype: 'textfield',                                        
                                        id: 'nb-war-ser-num',
                                        fieldLabel: 'Cерийный №',
                                        labelWidth: 80,
                                        width: 240,
                                        vtype: 'cyralphanumplus',
                                        allowBlank: false                                        
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'nb-war-fac-num',
                                        fieldLabel: 'Заводской №',
                                        labelWidth: 80,
                                        width: 240,
                                        vtype: 'cyralphanumplus',
                                        allowBlank: false                                        
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Гарантия',
                                        labelWidth: 80,
                                        width: 240,
                                        vtype: 'cyralphanumplus'                                       
                                    }                                    
                                ]
                            }     
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                margin: '0 0 0 5',
                defaults: {
                    margin: '0 5 0 0',
                    labelWidth: 30
                },
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Владелец',
                        width: 742,
                        padding: '0 5 0 5',                    
                        items: [
                            {   
                                xtype: 'textfield',
                                fieldLabel: 'ФИО',
                                labelWidth: 80,
                                width: 726,
                                vtype: 'cyralphanumplus'                                 
                            },
                            {   
                                xtype: 'textfield',
                                fieldLabel: 'Личная инф.',
                                labelWidth: 80,
                                width: 726,
                                vtype: 'cyralphanumplus'                                 
                            },                            
                            {   
                                xtype: 'textfield',
                                fieldLabel: 'Адресс',
                                labelWidth: 80,
                                width: 726
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'column'
                                },
                                padding: '0 0 5 0',
                                items: [
                                    {   
                                        xtype: 'textfield',
                                        fieldLabel: 'Дом. тел.',
                                        labelWidth: 80,
                                        width: 240
                                    }, 
                                    {   
                                        xtype: 'textfield',
                                        fieldLabel: 'Раб. тел.',
                                        labelWidth: 80,
                                        width: 240,
                                        //padding: '0 0 0 2'
                                    },
                                    {   
                                        xtype: 'textfield',
                                        fieldLabel: 'Моб. тел.',
                                        labelWidth: 80,
                                        width: 240,
                                       // padding: '0 0 0 2'
                                    }                                  
                                ]
                            },                            
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'column'
                                },
                                padding: '0 0 5 0',
                                items: [
                                    {   
                                        xtype: 'datefield',
                                        fieldLabel: 'Сообщено',
                                        labelWidth: 80,
                                        width: 240
                                    },
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Статус',
                                        labelWidth: 80,
                                        width: 325,
                                        padding: '0 0 0 0'
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Копировать информацию',
                                        icon: icons_path+'cat-edit.png',
                                        width: 155
                                    }
                                ]
                            }                             
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                margin: '0 0 0 5',
                defaults: {
                    margin: '0 5 0 0',
                    labelWidth: 30
                },
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Жалобы',
                        width: 742,
                        padding: '0 5 0 5',                    
                        items: [
                            {   
                                xtype: 'textfield',
                                fieldLabel: 'Жалоба',
                                labelWidth: 80,
                                width: 726,
                                vtype: 'cyralphanumplus'                                 
                            },
                            {   
                                xtype: 'textarea',
                                fieldLabel: 'Проделаная работа',
                                labelWidth: 80,
                                width: 726,
                                height: 50                                
                            }, 
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'column'
                                },
                                padding: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Заметки',
                                        labelWidth: 80,
                                        width: 200
                                    },
                                    {
                                        xtype: 'button',
                                        icon: icons_path+'cat-edit.png'
                                    },
                                    {
                                        xtype: 'textfield',
                                        width: 500
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                margin: '0 0 0 5',
                defaults: {
                    margin: '0 5 0 0',
                    labelWidth: 30
                },
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Владелец',
                        width: 742,
                        padding: '0 5 0 5',                    
                        items: [
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'column'
                                },
                                padding: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Продавець',
                                        labelWidth: 80,
                                        width: 240                                       
                                    },
                                    {   
                                        xtype: 'textfield',
                                        fieldLabel: 'Чек, цена',
                                        labelWidth: 80,
                                        width: 240,
                                        vtype: 'cyralphanumplus'                                 
                                    }
                                ]
                            },
                            {   
                                xtype: 'textarea',
                                fieldLabel: 'Коментарии',
                                labelWidth: 80,
                                width: 726,
                                height: 50                                
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'column'
                                },
                                padding: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Мастер',
                                        labelWidth: 80,
                                        width: 240                                       
                                    },
                                    {   
                                        xtype: 'textfield',
                                        fieldLabel: 'Работа',
                                        labelWidth: 80,
                                        width: 240                                 
                                    },
                                    {
                                        xtype: 'button',
                                        icon: icons_path+'cat-edit.png'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'column'
                                },
                                padding: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Мастер',
                                        labelWidth: 80,
                                        width: 240                                       
                                    },
                                    {   
                                        xtype: 'textfield',
                                        fieldLabel: 'Работа',
                                        labelWidth: 80,
                                        width: 240                                 
                                    }
                                ]
                            },                            
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'column'
                                },
                                padding: '0 0 5 0',
                                items: [
                                    {   
                                        xtype: 'textfield',
                                        fieldLabel: 'Запчасти',
                                        labelWidth: 80,
                                        width: 240
                                    }, 
                                    {   
                                        xtype: 'textfield',
                                        fieldLabel: 'Транспорт',
                                        labelWidth: 80,
                                        width: 240
                                        //padding: '0 0 0 2'
                                    },
                                    {   
                                        xtype: 'textfield',
                                        fieldLabel: 'Итого',
                                        labelWidth: 80,
                                        width: 240
                                       // padding: '0 0 0 2'
                                    }                                  
                                ]
                            }
                        ]
                    }
                ]
            }            
        ];
        this.callParent();
    }    
});


