var cy = cytoscape({

  container: document.getElementById('cy'), // container to render in

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#10c24b',
        'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#0a3780',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
  ],

  layout: {
    name: 'grid',
    rows: 2
  },
  
   // initial viewport state:
  zoom: 1,
  pan: { x: 0, y: 0 },

});


/*	ADDING NODES AND EDGES		*//*
dnode = {
	group: 'nodes',
	data: {weight:75, id:'d'},
	position:{x:300,y:300}
};

cy.add(dnode);

cy.add([
	{group: 'edges', data:{id:'ad', source:'a', target:'d'}},
	{group: 'edges', data:{id:'cd', source:'c', target:'d'}}
	]);
*/
/*		REMOVING NODES		*//*
var a = cy.$('#a');
cy.remove(a);

cy.add({group:'edges', data:{id:'bc',source:'b', target:'c'}});
*/
/*		CREATING A COLLECTION		*//*
var collection = cy.collection();
cy.nodes().on('click',function(e){
	var clickedNode = e.target;
	
	collection = collection.union(clickedNode);
	
	console.log(collection);
});
*/
/*		getElementById		*//*
collection = collection.union(cy.getElementById('d'));

cy.nodes('[weight > 50]');	//gets all nodes with weight > 50
cy.edges('[source="b"');	//gets all edges with source at back
*/
/*		EVENT HANDLING		*/
cy.on('tap',function(e){
	var eTarget = e.target;
	if (eTarget === cy){
		console.log("Tapped on background");
	}else{
		console.log("Tapped on element");
	}
});

/*	##	VIEWPORT MANIPULATION	##	*/	
/*	CENTRE GRAPH ON NODES	*/
/*
cy.on("click", function(e){	
	dNode = cy.$("#d");
	cy.center(dNode);
	cy.fit(collection);
});
*/

var collection = cy.collection();

var nodeName = 0;
cy.on('click', function(e){
	var newNode = {
		group: 'nodes',
		data: {id:nodeName},
		renderedPosition:{x:e.renderedPosition.x,y:e.renderedPosition.y}
	};
	
	cy.add(newNode);
	nodeName++;
	collection = collection.union(newNode);
	
	cy.nodes().forEach(function(ele){
		console.log(ele.id());
	});
});

cy.on("tap", function(){
	cy.nodes().animate({
		style:{'background-color':'blue'}
	},{
		duration: 1000
	})
	
	.delay(1000)
	
	.animate({
		style:{'background-color':'yellow'}
	});
});

document.getElementById("addNode").onClick = function(){
	console.log("click");
};
	




