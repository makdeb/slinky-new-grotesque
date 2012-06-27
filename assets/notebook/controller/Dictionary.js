Ext.define('Notebook.controller.Dictionary',{
    extend: 'Ext.app.Controller',
    models: [
        'Master'
    ],
    stores: [
        'Master'
    ],
    views: [
        'dictionary.Master'
    ],
    init: function () {
        this.control({
            '#bbbggg': {
                cellclick: function () {
                    alert('ddd');
                }
            }
        });
    }
});