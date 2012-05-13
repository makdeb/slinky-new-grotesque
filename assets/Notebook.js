var icons_path='http://localhost/slinky-new-grotesque/assets/extjs/resources/themes/images/custom/';

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
        Ext.tip.QuickTipManager.init();
        
        Ext.apply(Ext.form.field.VTypes, {
            cyralphanum:  function(val) {
                return /^[а-яіїєА-ЯІЇЄa-zA-Z\d\s]{1,}$/.test(val);
            },
            cyralphanumText: 'Допустимі символи кирилиці, латині та цифри',
            cyralphanumMask: /[а-яіїєА-ЯІЇЄa-zA-Z\d\s]/
        });
    }
});


