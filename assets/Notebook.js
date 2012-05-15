//шлях до іконок
var icons_path='http://localhost/slinky-new-grotesque/assets/extjs/resources/themes/images/custom/';
var print_url='http://ya.ru';

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
        //ініціалізація менеджера підказок
        Ext.tip.QuickTipManager.init();        
        //типи валідації полів
        Ext.apply(Ext.form.field.VTypes, {
            cyralphanum:  function(val) {
                return /^[а-яіїєА-ЯІЇЄa-zA-Z\d\s]{1,}$/.test(val);
            },
            cyralphanumText: 'Допустимі символи кирилиці, латині та цифри',
            cyralphanumMask: /[а-яіїєА-ЯІЇЄa-zA-Z\d\s]/
        });
        Ext.apply(Ext.form.field.VTypes, {
            phone:  function(val) {
                return /^[\d\(\)\-]{1,}$/.test(val);
            },
            phoneText: 'Допустимі символи цифри, знаки (,) та -',
            phoneMask: /[\d\(\)\-]/
        });        
    }
});


