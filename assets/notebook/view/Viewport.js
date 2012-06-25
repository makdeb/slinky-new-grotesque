Ext.define('Notebook.view.Viewport',{
    extend: 'Ext.container.Viewport',
    layout: {
        type:'fit'
    },
    requires: [
        'Notebook.view.Menu',
        'Notebook.view.warranty.Form',
        'Notebook.view.product.List'        
    ],
    initComponent: function () {
        this.items=[
            {
                xtype: 'panel',					
                tbar: {
                    xtype:'main-menu'
                },
                layout: {
                    type: 'hbox',
                    align:'stretch'
                },
                items: [
                    {
                        xtype: 'product-list'
                    },
                    {
                        xtype: 'warranty-form'
                    }					
                ]
            }

        ];
        this.callParent();
    }
});