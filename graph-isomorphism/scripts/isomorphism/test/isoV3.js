/*
Starting function to set the variables and begin the algorithm
@param - graphA:
@param - graphB:
*/
function isoV3(nodeList, edgesA, edgesB){
	var d = 0;
	var F = [];
	var isoCount=0;
	var isoBool = false;
	
	// create an adjacency matrix for each graph
	var A = matrixOf(edgesA, nodeList);
	var B = matrixOf(edgesB, nodeList);

	// Number of nodes in graph A and B respectively
	var p = nodeList.length;
	
	var M = initMatrix(nodeList);
	console.table(A);
	console.table(B);
	console.table(M);
	
	// Loop throguh k and F setting each value to zero
	for (var j=0; j<p; j++)
		F[j] = 0;
	
	
	// ## ALGORITHM STARTS ## //
	depthInc(d, F, M);
	
	return isoBool;



	function depthInc(d, F, M){
	  if (isoBool)
		  return true;
	  if (d >= p){
		if (isoCheck(M))
			isoBool = true;
	  }else{
		for (var i=0; i<p; i++){
		  if (M[d][i] == 1 && F[i] == 0){
			F[i] = 1;

			var mString = JSON.stringify(M);
			var Temp = JSON.parse(mString);

			for (var j=0; j<p; j++){
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



	/*
	Creates an adjacency matrix of the given graph by looping through the nodes
	list and edges of the graph and inserting '1' to all entries in the matrix 
	where the edge exists
	@param - graph:
	@param - nodesList: List of the nodes in the graph
	@return adjacencyMatrix: 
	*/
	function matrixOf(edges, nodesList){
		var adjacencyMatrix = [];
		
		for (var i=0; i<nodesList.length; i++){
			adjacencyMatrix.push([]);
			for (var j=0; j<nodesList.length; j++){
				adjacencyMatrix[i].push(0);
				edges.forEach(function(edge){
					if ((nodesList[i].id == edge.source && nodesList[j].id == edge.target || (nodesList[j].id == edge.source && nodesList[i].id == edge.target)))
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
	function initMatrix(nodesList){
		var M_0 = [];
		for (i=0; i<nodesList.length; i++){
			M_0.push([]);
			for (j=0; j<nodesList.length; j++){
				if (nodesList[j].degree >= nodesList[i].degree)
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
	function isoCheck(){
		isoBool = true;
		console.log("### ISO CHECK ###");
		console.table(M);
		console.table(C);
		var MB = matrixMult(M,B);
		console.table(MB);
		var MBT = MB[0].map((col,i) => MB.map(row => row[i]));	// Transpose MBT
		console.table(MBT);
		var C = matrixMult(M,MBT);
		console.table(C);
		console.table(A);
		for (var i=0; i<p; i++){
			for (var j=0; j<p; j++){
				if (A[i][j] == 1){
					if (C[i][j] != 1)
						isoBool = false;
				}
			}
		}
		
		if (isoBool){
			//console.table(F);
			isoCount++;
		}
		return isoBool;
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
	
	



















