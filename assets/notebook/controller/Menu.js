Ext.define('Notebook.controller.Menu',{
    extend: 'Ext.app.Controller',
    views: [
        'Menu'
    ],    
    init: function () {
        this.control({
            'main-menu #nb-dict-master': {
                click: function () {
                    this.getController('Dictionary').dictCreateWin('Masters');
                }
            },
            'main-menu #nb-dict-seller': {
                click: function () {
                    this.getController('Dictionary').dictCreateWin('Sellers');
                }
            },
            'main-menu #nb-dict-notetpl': {
                click: function () {
                    this.getController('Dictionary').dictCreateWin('Notetpls');
                }
            },
            'main-menu #nb-dict-status': {
                click: function () {
                    this.getController('Dictionary').dictCreateWin('Statuses');
                }
            }            
        });
    }    
});