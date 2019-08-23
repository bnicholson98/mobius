/*
Starting function to set the variables and begin the algorithm
@param - graphA:
@param - graphB:
@return - isoBool:
*/
function iso(graphA, graphB){
	var M_copies = [];
	var d = 0;
	var k = [];
	var F = [];
	var isoBool = false;
	var complete = false;
	
	// create a list of nodes for each graph
	nodesListA = getNodesList(graphA);
	nodesListB = getNodesList(graphB);
	
	if (nodesListA.length != nodesListB.length)
		return false;
	
	// create an adjacency matrix for each graph
	var A = matrixOf(graphA, nodesListA);
	var B = matrixOf(graphB, nodesListB);
	
	// Number of nodes in graph A and B respectively
	var pa = A.length;
	var pb = B.length;
	
	var M = initMatrix();
	
	var mString = JSON.stringify(M);
	M_copies[d] = JSON.parse(mString);
	
	// Loop throguh k and F setting each value to zero
	for (var i=0; i<pa+1; i++)
		k[i] = 0;
	for (var j=0; j<pb; j++)
		F[j] = 0;

	// Start algorithm
	depthInc();
	
	return isoBool;


	/*
	Increase the depth of the search, checks for a valid candidate in the
	d-th row and adjusts the matrix M
	*/
	function depthInc(){
		while (!complete){
			d++;
			
			// Check that a valid value in the d-th row exists
			if (mdjCheck()){
				k[d] = k[d-1]+1;

				// Check that a valid value for k exists in the d-th row
				if (kCheck()){	
					// Setting F[] to 1 indicates that this column is active
					F[k[d]-1] = 1;
					
					// Loop through the d-th row changing all 1's to 0 except active k
					for (var j=0; j<pb; j++){
						if (j != k[d]-1)
							M[d-1][j] = 0;
					}
					
					// Store the current state of M
					var mString = JSON.stringify(M);
					M_copies[d] = JSON.parse(mString);	
					
					if (d<pa){						
						depthInc();					
					}else{							
						isoCheckCount++;
						isoCheck();	
						complete = true;
						d = -1;					
					}
				}else
					depthDec();
			}else
				depthDec();
		}
	}

	/*
	Decrease the depth of the search and adjust k, F and take the matrix M
	to the previous copy.
	*/
	function depthDec(){
		while (!complete){
			d -= 1;
			// Terminate the algorithm if d is negative
			if (d<0){
				complete = true;
				break;
			}
			k[d]++;
			F[k[d]-1] = 0;	
			
			// Recover M to be the d-th copy
			var mString = JSON.stringify(M_copies[d]);
			M = JSON.parse(mString);
			
			if (d>=pa || k[d]>=pb){	
				depthDec();			
			}else{					
				depthInc();			
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
	Check the d-th row to see if the following condition exists:
	A '1' in the d-th row in the same column as a '0' in F
	@return - boolean: True if the condition holds anywhere in M[d-1], false otherwise;
	*/
	function mdjCheck(){
		for (var i=0; i<pb; i++){
			if ((M[d-1][i] === 1) && (F[i] === 0))
				return true;
		}
		return false;
	}

	/*
	Check each entry in the d-th row from k to pb to see if the following condition exists:
	A '1' in the d-th row in the same column as a '0' in F
	@return - boolean: True if the condition holds anywhere in M[d-1], false otherwise;
	*/
	function kCheck(){
		for (var i = k[d]-1; i<pb; i++){		
			if ((M[d-1][i] === 1) && (F[i] === 0))
				return true;
			else
				k[d] += 1;
		}
		return false;
	}

	/*
	Checks for isomorphism between the subraph found and graph A by 
	perform matrix arithmetic on matrix Check
	*/
	function isoCheck(){
		isoBool = true;
		
		var MB = matrixMult(M,B);
		var MBT = MB[0].map((col,i) => MB.map(row => row[i]));	// Transpose MBT
		var C = matrixMult(M,MBT);
		
		for (var i=0; i<pa; i++){
			for (var j=0; j<pa; j++){
				if (A[i][j] == 1){
					if (C[i][j] != 1)
						isoBool = false;
				}
			}
		}
		
		if (isoBool){
			isoCount++;
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



















