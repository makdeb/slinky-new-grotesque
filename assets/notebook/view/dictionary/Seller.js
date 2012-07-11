Ext.define('Notebook.view.dictionary.Seller',{
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
                    header: 'Продавец',
                    dataIndex: 'name',
                    editor: {
                        xtype: 'textfield'
                    }
                }
            ],
            store: 'Seller',
            tbar: [
                {
                    text: 'Добавить',
                    id: 'nb-dict-win-add',
                    icon: icons_path+'sign-plus.png'
                },
                {
                    text: 'Удалить',
                    id: 'nb-dict-win-del',
                    icon: icons_path+'sign-minus.png'
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


