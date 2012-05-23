Ext.define('Notebook.view.Viewport',{
    extend: 'Ext.container.Viewport',
    layout: {
        type:'border',
        align: 'stretch'
    },
    requires: [
        'Notebook.view.Menu',
        'Notebook.view.warranty.Form',
        'Notebook.view.product.List'        
    ],
    initComponent: function () {
        this.items=[
            {
                xtype: 'container',
                region: 'north',
                height: 100,
                style: {
                    borderBottom: '1px solid #0B486B'
                },					
                items: [
                    {
                        xtype: 'container',
                        height: 70,
                        style: {
                            borderBottom: '1px solid #0B486B'
                        },
                        html: 'logo'
                    },
                    {
                        xtype: 'container',
                        height: 30,							
                        html: 'menu' 
//                        xtype: 'main-menu'
                    }						
                ]
            },
            {
                xtype: 'container',
                region: 'center',					
                layout: {
                    type: 'border'
                },
                items: [
                    {
                        xtype: 'product-list'
                    },
                    {
                        xtype: 'warranty-form'
                    },
                    {
                        xtype: 'container',                    
                        region: 'south',
                        height: 25,
                        style: {
                            borderTop: '1px solid #0B486B'
                        },
                        html: 'footer'
                    }						
                ]
            }
        ];
        this.callParent();
    }
});