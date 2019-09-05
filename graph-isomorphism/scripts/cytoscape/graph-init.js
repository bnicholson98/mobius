var cy1 = cytoscape({

  container: document.getElementById('cy1'), // container to render in

  elements: [ // list of graph elements to start with
    { // node a
      data: { id: 'a' }
    },
    { // node b
      data: { id: 'b' }
    },
	{
		data:{id:'c'}
	},
    { // edge ab
      data: { id: 'ab', source: 'a', target: 'b' }
    },
	{ // edge ab
      data: { id: 'ac', source: 'a', target: 'c' }
    }
  ],

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
  ],

  layout: {
    name: 'grid',
    rows: 1
  }

});

var cy2 = cytoscape({

  container: document.getElementById('cy2'), // container to render in

  elements: [ // list of graph elements to start with
	{	// node x
		data:{id:'x'}
	},
	{	// node y
		data:{id:'y'}
	},
	{
		data:{id:'z'}
	},
	{
		data:{id:'w'}
	},
	{ // edge xy
      data: { id: 'xy', source: 'x', target: 'y' }
    },
	{ // edge xy
      data: { id: 'yz', source: 'y', target: 'z' }
	},
	{ // edge xy
      data: { id: 'xw', source: 'x', target: 'w' }
	}
  ],

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
  ],

  layout: {
    name: 'grid',
    rows: 2
  }

});

subgraphIsoV3(cy1, cy2);

// Code for Piper.

class Vertex {
	constructor(degree) {
		Vertex.idCount = (Vertex.idCount || 0);
		this.id = Vertex.idCount;
		Vertex.idCount++;
		this.degree = degree;
	}
}
class Edge {
	constructor(source, target) {
		this.source = source;
		this.target = target;
	}
}

let degreeSeq = [1,1,2,2];
/*
let degreeSeq = [1,1,2,2];
degreeSeq = degreeSeq.sort( (a,b) => b-a);
*/
let vertArr = [];
degreeSeq.forEach( degree => vertArr.push(new Vertex(degree)));
/*
let edgeArr1 = [new Edge(0,3), new Edge(0,4), new Edge(1,0), new Edge(2,1), new Edge(2,5)];
let edgeArr2 = [new Edge(0,3), new Edge(0,4), new Edge(1,2), new Edge(1,5), new Edge(2,0)];
let edgeArr3 = [new Edge(0,1), new Edge(0,4), new Edge(0,2), new Edge(1,5), new Edge(2,3)];
*/

let edgeArr1 = [new Edge(0,1), new Edge(0,2), new Edge(1,3)];
let edgeArr2 = [new Edge(1,0), new Edge(0,3), new Edge(1,2)];
//console.log(isoV3(vertArr, edgeArr1, edgeArr2));




	




