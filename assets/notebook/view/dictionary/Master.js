Ext.define('Notebook.view.dictionary.Master',{
    extend: 'Ext.window.Window',
    alias: 'widget.dict',
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
            id: 'nb-dict-grid',
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
                }
            ],
            store: 'Master',
            tbar: [
                {
                    text: 'Добавить',
                    id: 'nb-dict-win-add'
                },
                {
                    text: 'Удалить',
                    id: 'nb-dict-win-del'
                }                
            ]
        }
    ],
    buttons: [
        {
            text: 'Сохранить',
            id: 'nb-dict-win-save'
        },
        {
            text: 'Закрыть',
            id: 'nb-dict-win-close'
        }        
    ]
});


