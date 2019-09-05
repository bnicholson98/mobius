/*
Initialising function to set the variables and begin the algorithm
@param - graphA:
@param - graphB:
*/
function subgraphIsoV3(graphA, graphB){
	// Initialise variables
	var d = 0;
	var F = [];
	var isoCount=0;
	var isos = [];
	
	// create a list of nodes for each graph
	var nodesListA = getNodesList(graphA);
	var nodesListB = getNodesList(graphB);
	
	// create an adjacency matrix for each graph
	var A = matrixOf(graphA, nodesListA);
	var B = matrixOf(graphB, nodesListB);
	
	// Number of nodes in graph A and B respectively
	var pa = A.length;
	var pb = B.length;
	
	var M = initMatrix();
	
	// Loop throguh k and F setting each value to zero
	for (var j=0; j<pb; j++)
		F[j] = 0;
	
	// Start algorithm
	depthInc(d, F, M);
	
	console.log("Iso count = "+isoCount);
	console.table(isos);

	function depthInc(d, F, M){
	  if (d >= pa){
		isoCheck(M);
		
	  }else{
		for (var i=0; i<pb; i++){
		  if (M[d][i] == 1 && F[i] == 0){
			F[i] = 1;

			var mString = JSON.stringify(M);
			var Temp = JSON.parse(mString);

			for (var j=0; j<pb; j++){
							if (j != i)
								M[d][j] = 0;
						}
			depthInc(d+1, F, M);

			F[i] = 0;

			mString = JSON.stringify(Temp);
			M = JSON.parse(mString);
		  }
		}
	  }  
	}


	// ## HELPER FUNCTIONS ## //

	/* 
	Loop through each node in the given graph and 
	push them to an array.	
	@param - graph:
	@return - nodesList:  
	*/
	function getNodesList(graph){
		var nodesList = [];
		graph.nodes().forEach(function(node){
			nodesList.push(node);
		});
		
		return nodesList;
	}

	/*
	Creates an adjacency matrix of the given graph by looping through the nodes
	list and edges of the graph and inserting '1' to all entries in the matrix 
	where the edge exists
	@param - graph:
	@param - nodesList: List of the nodes in the graph
	@return adjacencyMatrix: 
	*/
	function matrixOf(graph, nodesList){
		var adjacencyMatrix = [];
		
		for (var i=0; i<nodesList.length; i++){
			adjacencyMatrix.push([]);
			for (var j=0; j<nodesList.length; j++){
				adjacencyMatrix[i].push(0);
				graph.edges().forEach(function(edge){
					if ((nodesList[i].id() == edge.source().id() && nodesList[j].id() == edge.target().id()) || (nodesList[j].id() == edge.source().id() && nodesList[i].id() == edge.target().id()))
						adjacencyMatrix[i][j] = 1;
				});
			}
		}
		
		return adjacencyMatrix;
	}

	/*
	Initialise the starting matrix for M, enters a '1' where the degree 
	of the j-th node in graph B is greater or equal to the i-th node in
	graph A
	@return - M_0:
	*/
	function initMatrix(){
		var M_0 = [];
		for (i=0; i<nodesListA.length; i++){
			M_0.push([]);
			for (j=0; j<nodesListB.length; j++){
				if (nodesListB[j].degree() >= nodesListA[i].degree())
					M_0[i].push(1);
				else
					M_0[i].push(0);
			}
		}
		
		return M_0;
	}

	/*
	Checks for isomorphism between the subraph found and graph A by 
	perform matrix arithmetic on matrix Check
	*/
	function isoCheck(M){
		var iso = true;
		var MB = matrixMult(M,B);
		var MBT = MB[0].map((col,i) => MB.map(row => row[i]));	// Transpose MBT
		var C = matrixMult(M,MBT);
		
		for (var i=0; i<pa; i++){
			for (var j=0; j<pa; j++){
				if (A[i][j] == 1){
					if (C[i][j] != 1)
						iso = false;
				}
			}
		}
		
		if (iso){
			isos.forEach(function(item){
				if (JSON.stringify(item) == JSON.stringify(F))
					iso = false;
			});
			if (iso){
				isoCount++;
				var fString = JSON.stringify(F);
				isos.push(JSON.parse(fString));
			}
		}		
	}

	/*
	Performs a matrix multiplication on the given 2d arrays
	@param - mA: matrix A
	@param - mB: matrix B
	@return - result:
	*/
	function matrixMult(mA, mB){
		var result = [];
		var ele;
		
		for (var i=0; i<mA.length; i++){
			result.push([]);
			for (var j=0; j<mB[i].length; j++){
				ele = 0;
				for (var k=0; k<mA[i].length; k++){
					ele += mA[i][k]*mB[k][j];
				}
				result[i][j] = ele;
			}
		}
		return result;
	}
	
}
