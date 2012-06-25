Ext.define('Notebook.view.warranty.Ptemplate',{
    extend: 'Ext.window.Window',
    layout: 'fit',
    title: 'Печать',
    resizable: false,
    closable: false,     
    modal: true,
    width: 250,
    height: 125,    
    items: [
        {
            xtype: 'container',
            id: 'nb-ptpl-win-container',
            layout: {
                type: 'vbox',
                align: 'stretch'
            }, 
            margin: 5,
            items: [
                {
                    xtype: 'container',
                    padding: '0 0 5 0',
                    style: {
                        color: '#bcbcbc'
                    },                    
                    html: 'Выберите шаблон'
                },
                {
                    xtype: 'combobox',
                    id: 'nb-ptpl-win-templ',
                    store: 'Ptemplate',
                    displayField: 'template',
                    valueField: 'id',
                    forceSelect: true,
                    allowBlank: false
                }
            ]
        }
    ],
    buttonAlign: 'right',
    buttons: [
        {
            id: 'nb-ptpl-win-print',
            text: 'Печать'
        },
        {
            id: 'nb-ptpl-win-cancel',
            text: 'Отмена'
        }
    ]
});
