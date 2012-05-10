Ext.require([
    'Ext.window.MessageBox'
]);

Ext.application({
    name: 'Notebook',
    appFolder: '/slinky-new-grotesque/assets/notebook',
    autoCreateViewport: true,  
    controllers: [
        'Product', 
        'Warranty'               
    ],
    launch: function() {
        //application launch
    }
});


