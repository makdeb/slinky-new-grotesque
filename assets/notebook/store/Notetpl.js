Ext.define('Notebook.store.Notetpl',{
    extend: 'Ext.data.Store',
    requires: 'Notebook.model.Notetpl',
    model: 'Notebook.model.Notetpl',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'notebook/check',
        extraParams: {
            table: 'notestpl'
        },        
        reader: {
            type: 'json',
            root: 'template'
        } 
    }
});