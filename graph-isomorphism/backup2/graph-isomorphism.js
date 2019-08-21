var cy1 = cytoscape({

  container: document.getElementById('cy1'), // container to render in

  elements: [ // list of graph elements to start with
    { // node a
      data: { id: 'a' }
    },
    { // node b
      data: { id: 'b' }
    },
	{	// node c
		data:{id: 'c'}
	},
    { // edge ab
      data: { id: 'ab', source: 'a', target: 'b' }
    },
	{ // edge bc
      data: { id: 'bc', source: 'b', target: 'c' }
    },
	{ // edge ac
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
	{	// node z
		data:{id:'z'}
	},
	{	// node w
		data:{id:'w'}
	},
	{	// node u
		data:{id:'u'}
	},
	{	// node v
		data:{id:'v'}
	},
	{ // edge xy
      data: { id: 'xy', source: 'x', target: 'y' }
    },
	{ // edge zw
      data: { id: 'yz', source: 'y', target: 'z' }
    },
	{	// edge yz
		data:{id: 'xz', source: 'x', target: 'z'}
	},
	{ // edge uv
      data: { id: 'uv', source: 'u', target: 'v' }
    },
	{ // edge vw
      data: { id: 'vw', source: 'v', target: 'w' }
    },
	{	// edge uw
		data:{id: 'uw', source: 'u', target: 'w'}
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



	




