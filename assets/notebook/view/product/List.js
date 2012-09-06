Ext.define('Notebook.view.product.List', {
    extend: 'Ext.container.Container',
    alias: 'widget.product-list',
    id: 'nb-product-list',
    width: 200,
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
                			icon: icons_path+'cat-add.png',
                			tooltip: 'Применить\\Отменить фильтр',
                			id: 'nb-prod-filter',
                			enableToggle: true
                		},
                		'-',
                		{
                			icon: icons_path+'cat-add.png',
                			tooltip: 'Показать только в ремонте\\Показать выданые',
                			id: 'nb-prod-is-done-filter',
                			enableToggle: true	
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