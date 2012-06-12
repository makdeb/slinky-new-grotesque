Ext.define('Notebook.store.Status',{
    extend: 'Ext.data.Store',
    requires: 'Notebook.model.Status',
    model: 'Notebook.model.Status',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'notebook/check',
        extraParams: {
            table: 'blacklist'
        },        
        reader: {
            type: 'json',
            root: 'reason'
        } 
    }
});