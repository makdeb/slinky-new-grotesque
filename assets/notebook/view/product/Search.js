Ext.define('Notebook.view.product.Search',{
    extend: 'Ext.window.Window',
    alias: 'widget.product-search',
    title: 'Поиск',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    resizable: false,
    closable: false,     
    modal: true,
    width: 450,
    height: 250, 
    padding: '5 5 5 5',
    items: [
        {
            xtype: 'container',
            layout: 'column',
            width: 450,
            items: [
                {
                   xtype: 'combobox',
                   width: 200,
                   labelWidth: 50,
                   fieldLabel: 'Поле',
                   store: 'SearchField',
                   displayField: 'name',
                   valueField: 'id'
                }               
            ]
        }
    ],
    buttons: [
        {
            text: 'Поиск'
        },
        {
            text: 'Закрыть'
        }
    ]
});