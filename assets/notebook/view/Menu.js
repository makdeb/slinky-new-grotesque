Ext.define('Notebook.view.Menu',{
    extend: 'Ext.container.Container',
    alias: 'widget.main-menu',
    items: [
        {
            xtype: 'button',
            text: 'Категории',
            menu: {
                items: [
                    {
                        text: 'Добавить категорию',
                        icon: icons_path+'cat-add.png',                        
                    },
                    {
                        text: 'Редактировать категорию',
                        icon: icons_path+'cat-edit.png'
                    },
                    {
                        text: 'Удалить категорию',
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
});

