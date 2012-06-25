Ext.define('Notebook.store.Ptemplate',{
    extend: 'Ext.data.Store',
    requires: 'Notebook.model.Ptemplate',
    model: 'Notebook.model.Ptemplate',
    autoLoad: true,
    proxy: {
        type: 'memory'
    },
    data: [
        {id:'def',template: 'По умолчанию (def)'}
    ]
});


