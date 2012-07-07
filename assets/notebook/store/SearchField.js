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
        {id:3,field: 'model',name: 'Модель'},
        {id:4,field: 'serialnum',name: 'Серийный номер'},
        {id:5,field: 'factorynum',name: 'Заводской номер'},
        {id:6,field: 'guarantee',name: 'Гарантия'},
        {id:7,field: 'name',name: 'ФИО владельца'},
        {id:8,field: 'personaldata',name: 'Личная информация'},
        {id:9,field: 'address',name: 'Адресс владельца'},
    ]
});