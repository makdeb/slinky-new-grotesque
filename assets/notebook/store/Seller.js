Ext.define('Notebook.store.Seller',{
    extend: 'Ext.data.Store',
    requires: 'Notebook.model.Seller', 
    model: 'Notebook.model.Seller',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'notebook/check_guarantee',
        reader: {
            type: 'json',
            root: 'guarantee'
        }        
    }
});

