Ext.define('Notebook.view.product.List', {
    extend: 'Ext.container.Container',
    alias: 'widget.product-list',
    id: 'nb-product-list',
    region: 'west',
    width: 300,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        this.items=[
            {
                xtype: 'buttongroup',
                items: [
                    {
                        id: 'test',
                        text: 'Додати запис'
                    },
                    {
                        text: 'Редагувати запис'
                    },
                    {
                        text: 'Видалити запис'
                    }            
                ]
            },
            Ext.create('Ext.tree.Panel', {
                id: 'nb-product-tree',
                title: 'Simple Tree',
                flex: 1,
                store: 'Product',
                rootVisible: true
            })
        ];
        this.callParent();
    }
});