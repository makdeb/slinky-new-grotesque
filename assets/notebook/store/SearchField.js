Ext.define('Notebook.store.SearchField',{
    extend: 'Ext.data.Store',
    requires: 'Notebook.model.SearchField',
    model: 'Notebook.model.SearchField',
    autoLoad: true,
    proxy: {
        type: 'memory'
    },
    data: [
        {id:'1',field: 'product',name: 'Продукт'},
        {id:'2',field: 'sss',name: 'ddd'}
    ]
});