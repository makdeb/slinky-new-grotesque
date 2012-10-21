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
        	//встановлюємо обмеження на к-сть замовлень, що виводиться
        	from: 0,
        	limit: orders_limit,
        	//за замовчуванням тепер виводяться лише замовлення, які на даний момент в ремонті
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
        },
        load: function (treeStore,node,recs,success,e) {
        	console.log('m'+node.get('id'));
        	var magicalNodeId='m'+node.get('id');
			var magicalNode=node.appendChild(new Notebook.model.Product({id: magicalNodeId,name:'Далее'}));
			magicalNode.set('leaf', true);
			magicalNode.set('expandable', false);
			magicalNode.set('text',magicalNode.get('name'));        	
        }
    }
});


