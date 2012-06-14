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
        '-',
        {
            xtype: 'button',
            id: 'nb-new-warranty',
            text: 'Новый',
            icon: icons_path+'ord-new.png'
        },
        {
            xtype: 'button',
            id: 'nb-rec-warranty',
            text: 'Прийом',
            icon: icons_path+'ord-rec.png'
        },
        {
            xtype: 'button',
            text: 'Выдача',
            icon: icons_path+'ord-out.png'
        },
        {
            xtype: 'button',
            id: 'nb-save-warranty',
            text: 'Сохранить',
            icon: icons_path+'ord-save.png'
        },  
        {
            xtype: 'button',
            id: 'nb-copy-warranty',
            text: 'Копировать'
        },
        {
            xtype: 'button',
            text: 'Поиск'
        },
        {
            xtype: 'button',
            id: 'nb-print-warranty',
            text: 'Печать',
            icon: icons_path+'ord-print.png'
        },
        {
            xtype: 'button',
            id: 'nb-browse-file',
            text: 'browsw'
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

