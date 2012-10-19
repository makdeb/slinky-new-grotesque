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
        },
        extraParams: {
        	filter: 1,
        	done: 0
        }
    },
    root: {
        expanded: true,
        text: 'root',
        leaf: false
    },
    listeners: {
        append: function (thisNode, newNode, nodeIndex, eOpts){
        	//if (newNode.get('id')!=999) {
        	console.log('append');
            if( !newNode.isRoot() ) {  
                if (newNode.get('id').substr(0,1)=='c') {
                    newNode.set('leaf', false);
                    newNode.set('expandable', true);
                    newNode.set('text',newNode.get('name'));
                    if (newNode.get('id')=='c1') {
                        newNode.set('icon',icons_path+'cat-bin.png');
                    }
                }
                else {
                    newNode.set('leaf', true);
                    newNode.set('text',newNode.get('name')+' ('+newNode.get('id').replace(/[^0-9]/,'')+')');
                }                 
            }
        	//}
        },
        load: function (treeStore,node,recs,success,e) {
        	//recs.push({id:'999',name:'gggg'});
			var z=node.appendChild(new Notebook.model.Product({id:'999',name:'gggg'}));
			//return false;
            z.set('leaf', true);
            z.set('expandable', false);
            z.set('text',z.get('name'));        	
        	console.log('load');
        }
    }
});


