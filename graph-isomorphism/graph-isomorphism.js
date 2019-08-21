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
    },
	{ // edge ab
      data: { id: 'cb', source: 'c', target: 'b' }
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
	{	// node w
		data:{id:'w'}
	},
	{
		data:{id:'u'}
	},
	{	// node w
		data:{id:'v'}
	},
	{ // edge xy
      data: { id: 'xy', source: 'x', target: 'y' }
    },
	{ // edge xy
      data: { id: 'yz', source: 'y', target: 'z' }
    },
	{ // edge xy
      data: { id: 'xz', source: 'x', target: 'z' }
    },
	{ // edge xy
      data: { id: 'wu', source: 'w', target: 'u' }
    },
	{ // edge xy
      data: { id: 'uv', source: 'u', target: 'v' }
    },
	{ // edge xy
      data: { id: 'wv', source: 'w', target: 'v' }
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


subgraphIsoV2(cy1,cy2);



	




