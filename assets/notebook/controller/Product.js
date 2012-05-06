Ext.define('Notebook.controller.Product', {
    extend: 'Ext.app.Controller',
    models: [
        'Product'
    ],
    stores: [
        'Product'
    ],    
    views: [
        'product.List'
    ],
    init: function () {
        this.control({
            '#nb-product-tree': {
                itemclick: function () {
                    alert('click');
                }
            }
        });
    }
});