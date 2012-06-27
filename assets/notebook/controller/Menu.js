Ext.define('Notebook.controller.Menu',{
    extend: 'Ext.app.Controller',
    views: [
        'Menu'
    ],    
    init: function () {
        this.control({
            'main-menu #nb-dict-master': {
                click: function () {
                    //alert('ffff');
                    this.dictWin=this.getView('dictionary.Master').create();
                    //this.qqq.columns=[{header: 'Ololo',dataIndex: 'name'}];
                    //this.qqq.create();
                    this.dictWin.show();
                }
            }
        });
    }    
});