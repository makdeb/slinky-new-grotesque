Ext.define('Notebook.store.Category',{
    extend: 'Ext.data.Store',
    requires: 'Notebook.model.Category', 
    model: 'Notebook.model.Category',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'notebook/check_cat',
        reader: {
            type: 'json',
            root: 'category'
        }        
    },
    listeners: {
        //баг ExtJs, знімаємо маску завантаження з комбобокса після того як завантажиться store  
        load: function (store, records, successful, options) {
                var cboxPicker=Ext.getCmp('nb-war-cat').getPicker();
                if (successful && Ext.typeOf(cboxPicker.loadMask) !== "boolean") {
                    cboxPicker.loadMask.hide();
                }
                //Ext.getCmp('nb-war-cat').setValue(1);
        }
    }
});