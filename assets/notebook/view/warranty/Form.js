Ext.define('Notebook.view.warranty.Form',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.warranty-form',
    flex:1,
    bodyStyle: {
        background: '#DFE9F6'
    },
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
                        width: 550,
                        padding: '0 5 0 5',                    
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'nb-war-prod',
                                fieldLabel: 'Изделие',
                                labelWidth: 80,
                                width: 535,
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
                                        id: 'nb-war-ser-num',
                                        fieldLabel: 'Cерийный №',
                                        labelWidth: 80,
                                        width: 265,
                                        vtype: 'cyralphanumplus',
                                        allowBlank: false                                        
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'nb-war-fac-num',
                                        fieldLabel: 'Заводской №',
                                        labelWidth: 80,
                                        width: 265,
                                        vtype: 'cyralphanumplus',
                                        allowBlank: false                                        
                                    }                                    
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: {
                                    type: 'column'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Гарантия',
                                        labelWidth: 80,
                                        width: 265,
                                        vtype: 'cyralphanumplus',
                                        allowBlank: false                                        
                                    },
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Категория',
                                        labelWidth: 80,
                                        width: 265,
                                        vtype: 'cyralphanumplus',
                                        allowBlank: false                                        
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


