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
            Ext.create('Ext.tree.Panel', {
                id: 'nb-product-tree',
                tbar: [
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
                ],
                flex: 1,
                store: 'Product',
                rootVisible: true
            })
        ];
        this.callParent();
    }
});