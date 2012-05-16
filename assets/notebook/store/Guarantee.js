Ext.define('Notebook.store.Guarantee',{
    extend: 'Ext.data.Store',
    requires: 'Notebook.model.Guarantee', 
    model: 'Notebook.model.Guarantee',
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

