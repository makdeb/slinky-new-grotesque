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
                        id: 'nb-add-cat',
                        text: 'Додати запис'
                    },
                    {
                        id: 'nb-edit-cat',
                        text: 'Редагувати запис'
                    },
                    {
                        id: 'nb-del-cat',
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