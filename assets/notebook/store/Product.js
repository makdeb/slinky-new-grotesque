/* 
 * http://www.clintharris.net/2011/how-to-use-extjs-4-treepanels-with-both-static-data-and-model-stores/
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Notebook.store.Product',{
    extend: 'Ext.data.TreeStore',
    requires: 'Notebook.model.Product', 
    model: 'Notebook.model.Product',
    autoLoad: true,
    clearOnLoad: true,
    proxy: {
        type: 'ajax',
        url: 'notebook/get_categories',
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
                //alert(newNode.get('name'));
                if (newNode.get('id').substr(0,1)=='c') {
                    //alert(thisNode.get('name'));
                    newNode.set('leaf', false);
                    newNode.set('expandable', true);
                }
                else {
                    newNode.set('leaf', true);
                }
                newNode.set('text',newNode.get('name')); 
            }
        },
        load: function() {
            //alert('ddd');
        }
    }
});


