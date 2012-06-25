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
//                title: 'Категории',
//                tbar: [
//                    {
//                        id: 'nb-add-cat',                        
//                        icon: icons_path+'cat-add.png',
//                        tooltip: 'Додати категорію'
//                    },
//                    {
//                        id: 'nb-edit-cat',
//                        icon: icons_path+'cat-edit.png',
//                        tooltip: 'Редагувати категорію'
//                    },
//                    {
//                        id: 'nb-del-cat',
//                        icon: icons_path+'cat-delete.png',
//                        tooltip: 'Видалити категорію'
//                    },
//                    {
//                        id: 'nb-del-order',
//                        icon: icons_path+'order-delete.png',
//                        tooltip: 'Видалити замовлення (тимчасово не працює)'
//                    }                     
//                ],
                flex: 1,
                store: 'Product',
                rootVisible: false
            })
        ];
        this.callParent();
    }
});