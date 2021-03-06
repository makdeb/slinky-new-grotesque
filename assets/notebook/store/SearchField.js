Ext.define('Notebook.store.SearchField',{
    extend: 'Ext.data.Store',
    requires: 'Notebook.model.SearchField',
    model: 'Notebook.model.SearchField',
    autoLoad: true,
    proxy: {
        type: 'memory'
    },
    data: [
        {id:1,table: 'orders',field: 'id',name: '№пп'},
        {id:2,table: 'orders',field: 'product',name: 'Изделие'},
        {id:3,table: 'orders',field: 'model',name: 'Модель'},
        {id:4,table: 'orders',field: 'serialnum',name: 'Серийный номер'},
        {id:5,table: 'orders',field: 'factorynum',name: 'Заводской номер'},
        //{id:6,table: 'orders',field: 'guarantee',name: 'Гарантия'},        
        {id:7,table: 'orders',field: 'date_start',name: 'Дата приема'},
        {id:8,table: 'orders',field: 'date_end',name: 'Дата выдачи'},        
        {id:9,table: 'customers',field: 'name',name: 'ФИО владельца'},
        {id:10,table: 'customers',field: 'personaldata',name: 'Личная информация'},
        {id:11,table: 'customers',field: 'address',name: 'Адрес владельца'},
        {id:12,table: 'customers',field: 'hphone',name: 'Дом. тел.'},
        {id:13,table: 'customers',field: 'wphone',name: 'Раб. тел.'},
        {id:14,table: 'customers',field: 'phone',name: 'Моб. тел.'},        
        {id:15,table: 'orders',field: 'notified',name: 'Сообщено'},        
        {id:17,table: 'orders',field: 'complaints',name: 'Жалобы'},
        {id:18,table: 'orders',field: 'performance',name: 'Проделанная работа'},
        {id:19,table: 'orders',field: 'notes',name: 'Заметки'},        
        {id:20,table: 'orders',field: 'check',name: 'Чек, цена'},
        {id:26,table: 'orders',field: 'sold',name: 'Дата продажи'},
        {id:21,table: 'orders',field: 'comments',name: 'Комментарии'},        
        {id:22,table: 'orders',field: 'sellerID',name: 'Продавец'},
        {id:23,table: 'orders',field: 'masterID',name: 'Мастер'},
        {id:24,table: 'orders',field: 'total',name: 'Общая сумма'},
        {id:25,table: 'orders',field: 'gdate',name: 'Гарантия до'}        
    ]
});