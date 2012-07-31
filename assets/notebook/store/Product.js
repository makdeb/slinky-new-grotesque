Ext.define('Notebook.store.Product',{
    extend: 'Ext.data.TreeStore',
    requires: 'Notebook.model.Product', 
    model: 'Notebook.model.Product',
    autoLoad: true,
    clearOnLoad: true,
    proxy: {
        type: 'ajax',
        url: 'notebook/treeview',
        reader: {
            type: 'json',
            root: 'product'
        }        
    },
    root: {
        expanded: true,
        text: 'root',
        leaf: false
    },
    listeners: {
        append: function (thisNode, newNode, nodeIndex, eOpts){            
            if( !newNode.isRoot() ) {  
                if (newNode.get('id').substr(0,1)=='c') {
                    newNode.set('leaf', false);
                    newNode.set('expandable', true);
                    if (newNode.get('id')=='c1') {
                        newNode.set('icon',icons_path+'cat-bin.png');
                    }
                }
                else {
                    newNode.set('leaf', true);
                }
                newNode.set('text',newNode.get('name')); 
            }
        }
    }
});


