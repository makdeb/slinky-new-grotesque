Ext.define('Notebook.view.Menu',{
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.main-menu',
    items: [
        {
            xtype: 'button',
            text: 'Категории',
            icon: icons_path+'cat.png',  
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
                        icon: icons_path+'cat-del.png'
                    }                    
                ]
            }
        },
        {
            xtype: 'button',
            text: 'Справочники',
            icon: icons_path+'dir.png', 
            menu: {
                items: [
                    {
                        text: 'Мастера',
                        icon: icons_path+'dir-mas.png'
                    },
                    {
                        text: 'Продавци',
                        icon: icons_path+'dir-sell.png'
                    },
                    {
                        text: 'Шаблоны заметок',
                        icon: icons_path+'dir-templ.png'
                    }
                ]
            }            
        },
        '-'
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

