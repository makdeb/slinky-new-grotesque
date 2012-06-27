Ext.define('Notebook.view.dictionary.Master',{
    extend: 'Ext.window.Window',
    alias: 'widget.dict-master',
    layout: 'fit',
    title: 'Справочники (Мастера)',
    resizable: false,
    closable: false,     
    modal: true,
    width: 450,
    height: 250,
    items: [
        {
            xtype: 'gridpanel',
            id: 'bbbggg',
            plugins: [{
                ptype: 'cellediting'
            }],
            columns: [
                {header: 'id',dataIndex: 'id'},
                {
                    header: 'Мастер',
                    dataIndex: 'name',
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    xtype: 'actioncolumn',
                    width: 20,
                    items: [
                        {
                            icon: icons_path+'dict-del.png',
                            id: 'nb-mas-dict-del'
                        }
                    ]
                }
            ],
            store: 'Master'
        }
    ],
    buttons: [
        {
            text: 'Сохранить'
        },
        {
            text: 'Отменить'
        }        
    ]
});


