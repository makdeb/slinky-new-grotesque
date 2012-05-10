Ext.define('Notebook.view.product.Delete',{
    extend: 'Ext.window.Window',
    layout: 'fit',
    title: 'Категорія',
    resizable: false,
    closable: false,     
    modal: true,
    width: 250,
    height: 125,    
    items: [
        {
            xtype: 'container',
            id: 'nb-cat-del-win-container',
            layout: 'fit', 
            margin: 5,
            items: [
                {
                    xtype: 'container',
                    id: 'nb-cat-del-win-message',
                    html: ''
                }
            ]
        }
    ],
    buttonAlign: 'right',
    buttons: [
        {
            id: 'nb-cat-del-win-ok',
            text: 'Так'
        },
        {
            id: 'nb-cat-del-win-cancel',
            text: 'Ні'
        }
    ]
});


