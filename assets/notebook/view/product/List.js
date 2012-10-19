Ext.define('Notebook.view.product.List', {
    extend: 'Ext.container.Container',
    alias: 'widget.product-list',
    id: 'nb-product-list',
    width: 300,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        this.items=[
            Ext.create('Ext.tree.Panel', {
                id: 'nb-product-tree',
                tbar: {
                	items: [
                		{
                			icon: icons_path+'cat-refresh.png',
                			tooltip: 'Обновть',
                			id: 'nb-prod-filter'
                		},
                		{
                			xtype: 'checkbox',
                			boxLabel: 'Все',
                			margin: '0 5 0 10',
                			id: 'nb-prod-filter-all',
                			//checked: true
                		},
                		{
                			xtype: 'checkbox',
                			boxLabel: 'В ремонте',
                			id: 'nb-prod-filter-in-ws',
                			checked: true
                		}               		
                	]
                },
                flex: 1,
                store: 'Product',
                rootVisible: false
            })
        ];
        this.callParent();
    }
});