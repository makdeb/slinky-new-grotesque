Ext.define('Notebook.view.Menu',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.main-menu',
    tbar: [
        {
            xtype: 'button',
            text: 'Категории',
            menu: {
                items: [
                    {
                        text: 'Добавить категорию',
                        id: 'nb-add-cat',
                        icon: icons_path+'cat-add.png'                        
                    },
                    {
                        text: 'Редактировать категорию',
                        id: 'nb-edit-cat',
                        icon: icons_path+'cat-edit.png'
                    },
                    {
                        text: 'Удалить категорию',
                        id: 'nb-del-cat',
                        icon: icons_path+'cat-delete.png'
                    }                    
                ]
            }
        },
        {
            xtype: 'button',
            text: 'Справочники',
            menu: {
                items: [
                    {
                        text: 'Мастера'
                    },
                    {
                        text: 'Гарантии'
                    }
                ]
            }            
        }
    ]    
//    items: [
//        {
//            xtype: 'button',
//            text: 'Категории',
//            menu: {
//                items: [
//                    {
//                        text: 'Добавить категорию',
//                        id: 'testbtn',
//                        icon: icons_path+'cat-add.png'                        
//                    },
//                    {
//                        text: 'Редактировать категорию',
//                        icon: icons_path+'cat-edit.png'
//                    },
//                    {
//                        text: 'Удалить категорию',
//                        icon: icons_path+'cat-delete.png'
//                    }                    
//                ]
//            }
//        },
//        {
//            xtype: 'button',
//            text: 'Справочники',
//            menu: {
//                items: [
//                    {
//                        text: 'Мастера'
//                    },
//                    {
//                        text: 'Гарантии'
//                    }
//                ]
//            }            
//        }
//    ]
});

