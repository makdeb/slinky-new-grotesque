Ext.define('Notebook.controller.Warranty',{
    extend: 'Ext.app.Controller',
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


