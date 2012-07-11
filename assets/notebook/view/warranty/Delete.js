Ext.define('Notebook.view.warranty.Delete',{
    extend: 'Ext.window.Window',
    layout: 'fit',
    title: 'Заказ',
    resizable: false,
    closable: false,     
    modal: true,
    width: 250,
    height: 125,    
    items: [
        {
            xtype: 'container',
            id: 'nb-war-del-win-container',
            layout: 'fit', 
            margin: 5,
            items: [
                {
                    xtype: 'container',
                    id: 'nb-war-del-win-message',
                    html: ''
                }
            ]
        }
    ],
    buttonAlign: 'right',
    buttons: [
        {
            id: 'nb-war-del-win-ok',
            text: 'Да'
        },
        {
            id: 'nb-war-del-win-cancel',
            text: 'Нет'
        }
    ]
});


