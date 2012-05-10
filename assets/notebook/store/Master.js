Ext.define('Notebook.store.Master',{
    extend: 'Ext.data.Store',
    requires: 'Notebook.model.Master', 
    model: 'Notebook.model.Master',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'notebook/check_masters',
        reader: {
            type: 'json',
            root: 'master'
        }        
    }
});