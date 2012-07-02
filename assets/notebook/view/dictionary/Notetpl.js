Ext.define('Notebook.view.dictionary.Notetpl',{
    extend: 'Ext.window.Window',
    alias: 'widget.dict',
    layout: 'fit',
    title: 'Справочники (Продавци)',
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
                    header: 'Шаблон',
                    dataIndex: 'name',
                    editor: {
                        xtype: 'textfield'
                    }
                }
            ],
            store: 'Notetpl',
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


