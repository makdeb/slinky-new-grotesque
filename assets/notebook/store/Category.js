Ext.define('Notebook.store.Category',{
    extend: 'Ext.data.Store',
    requires: 'Notebook.model.Category', 
    model: 'Notebook.model.Category',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/slinky-new-grotesque/json/cat.json',
        reader: {
            type: 'json',
            root: 'category'
        }        
    }
});