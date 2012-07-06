Ext.define('Notebook.store.SearchField',{
    extend: 'Ext.data.Store',
    requires: 'Notebook.model.SearchField',
    model: 'Notebook.model.SearchField',
    autoLoad: true,
    proxy: {
        type: 'memory'
    },
    data: [
        {id:1,field: 'id',name: '№пп'},
        {id:2,field: 'product',name: 'Продукт'},
        {id:3,field: 'model',name: 'Модель'}
    ]
});