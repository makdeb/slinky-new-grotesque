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
                        id: 'nb-dict-master',
                        icon: icons_path+'dir-mas.png'
                    },
                    {
                        text: 'Продавцы',
                        id: 'nb-dict-seller',
                        icon: icons_path+'dir-sell.png'
                    },
                    {
                        text: 'Шаблоны заметок',
                        id: 'nb-dict-notetpl',
                        icon: icons_path+'dir-templ.png'
                    },
                    {
                        text: 'Статусы владельца',
                        id: 'nb-dict-status',
                        icon: icons_path+'dir-stat.png'
                    }                    
                ]
            }            
        },
        //'-',
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
            id: 'nb-out-warranty',
            text: 'Выдача',
            icon: icons_path+'ord-out.png'
        },
        {
        	xtype: 'button',
        	id: 'nb-toggle-done-warranty',
        	text: 'Выполнить'
        },
        {
            xtype: 'button',
            id: 'nb-save-warranty',
            text: 'Сохранить',
            icon: icons_path+'ord-save.png'
        },  
        {
            xtype: 'button',
            id: 'nb-del-warranty',
            text: 'Удалить',
            icon: icons_path+'ord-del.png'            
        },
        {
            xtype: 'button',
            id: 'nb-copy-warranty',
            text: 'Копировать',
            icon: icons_path+'copy.png'
        },
        {
            xtype: 'splitbutton',
            id: 'nb-search-product',
            text: 'Поиск',
            icon: icons_path+'ord-srch.png',
            menu: {
                items: [
                    {
                        text: 'Очистить результат',                        
                        id: 'nb-search-product-reset',
                        icon: icons_path+'srch-reset.png'
                    }
                ]
            }
        },
        {
            xtype: 'splitbutton',
            id: 'nb-print-warranty',
            text: 'Печать',
            icon: icons_path+'ord-print.png',
            //чудо-кнока для друку пустого бланка
            menu: {
            	items: [
            	    {
            	    	xtype: 'button',
            	    	id: 'nb-print-empty-warranty',
            	    	text: 'Печать пустого бланка',
            	    	icon: icons_path+'ord-print-empty.png'
            	    }    
            	]
            }
        },
        '->',
        {
        	xtype: 'button',
        	id: 'nb-db-backup',
        	text: 'Бэкап БД',
        	icon: icons_path+'db-bckup.png'
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

