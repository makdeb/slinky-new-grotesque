Ext.define('Notebook.controller.Warranty',{
    extend: 'Ext.app.Controller',
    models: [
        'Category',
        'Master'
    ],
    stores: [
        'Category',
        'Master'
    ],    
    views: [
        'warranty.Form'
    ],  
    init: function () {
        this.control({
            'warranty-form button#ololo': {
                click: function () {
                    alert('dddjjj');
                }
            }
        });
    }
});


