Ext.define('Notebook.view.product.Search',{
    extend: 'Ext.window.Window',
    alias: 'widget.product-search',
    title: 'Поиск',
    resizable: false,
    closable: false,     
    modal: true,
    width: 480,
    height: 120, 
    items: [
        {
            xtype: 'container',
            id: 'nb-prod-srch-cont',
            layout: 'column',
            width: 470,
            margin: '5 5 0 5',
            items: [
                {
                   xtype: 'combobox',
                   id: 'nb-prod-srch-field',
                   width: 190,
                   labelWidth: 40,
                   margin: '0 5 0 0',
                   fieldLabel: 'Поле',
                   store: 'SearchField',
                   displayField: 'name',
                   valueField: 'id',
                   forceSelection: true,
                   allowBlank: false
                },
                {
                    xtype: 'textfield',
                    id: 'nb-prod-srch-fval',
                    labelWidth: 55,
                    fieldLabel: 'Значение',
                    width: 260,
                    allowBlank: false
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'column',
            width: 470,
            margin: '5 0 0 5',
            items: [        
                {
                    xtype: 'checkbox',
                    id: 'nb-prod-srch-per',
                    width: 120,
                    margin: '0 0 0 45',
                    boxLabel: 'искать за период'
                },
                {
                    xtype: 'datefield',
                    id: 'nb-prod-srch-fdate',
                    width: 110,
                    labelWidth: 20,
                    format: 'd.m.Y',
                    margin: '0 5 0 65',
                    fieldLabel: 'С'
                },
                {
                    xtype: 'datefield',
                    id: 'nb-prod-srch-sdate',
                    width: 110,
                    labelWidth: 20,
                    format: 'd.m.Y',
                    fieldLabel: 'По'
                }                
            ]
        }              
    ],
    buttons: [
        {
            text: 'Поиск',
            id: 'nb-prod-srch-win-search'
        },
        {
            text: 'Закрыть',
            id: 'nb-prod-srch-win-close'
        }
    ]
});