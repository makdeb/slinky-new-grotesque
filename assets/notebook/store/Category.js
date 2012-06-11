Ext.define('Notebook.store.Category',{
    extend: 'Ext.data.Store',
    requires: 'Notebook.model.Category', 
    model: 'Notebook.model.Category',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'notebook/check',
        extraParams: {
            table: 'categories'
        },
        reader: {
            type: 'json',
            root: 'category'
        }        
    }
});