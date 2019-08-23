/*	## Declare global variables ##  */
/*  ##############################  */

var nodesListA;
var nodesListB;
var A;
var B;
var p;
var p;
var M;
var M_copies = [];
var d = 0;
var k = [];
var F = [];
var isoCount=0;
var isoCheckCount=0;
var isoBool = false;
var complete = false;


/*
Starting function to set the variables and begin the algorithm
@param - graphA:
@param - graphB:
*/
function isoV2(nodeList, edgesA, edgesB){
	// create an adjacency matrix for each graph
	A = matrixOf(edgesA, nodesList);
	B = matrixOf(edgesB, nodesList);
	
	// Number of nodes in graph A and B respectively
	p = nodeList.length;
	
	M = initMatrix(nodeList);
	//console.log("M0:");
	//console.table(M);
	
	var mString = JSON.stringify(M);
	M_copies[d] = JSON.parse(mString);
	//console.log("M["+d+"]:");
	//console.table(M_copies[d]);
	
	// Loop throguh k and F setting each value to zero
	for (var i=0; i<p+1; i++)
		k[i] = 0;
	for (var j=0; j<p; j++)
		F[j] = 0;
	
	//console.log("d = "+d);
	//console.log("k = "+k);
	//console.log("F = "+F);
	
	// ## ALGORITHM STARTS ## //
	depthInc();
	
	//console.log("Number of checks = "+isoCheckCount);
	//console.log("Iso count = "+isoCount);
	//console.log(isoBool);
	return isoBool;
	
}

/*
Increase the depth of the search, checks for a valid candidate in the
d-th row and adjusts the matrix M
*/
function depthInc(){
	//console.log("test");
	while (!complete){
		d++;
		//console.log("d = "+d);
		
		// Check that a valid value in the d-th row exists
		if (mdjCheck()){
			k[d] = k[d-1]+1;
			//console.log("k = "+k);
			
			/*
			// Terminate in the active k value is out of scope
			if (k[d]>p){
				complete = true;
				break;
			}*/
			
			// Check that a valid value for k exists in the d-th row
			if (kCheck()){	
				//console.log("k = "+k);
				// Setting F[] to 1 indicates that this column is active
				F[k[d]-1] = 1;
				//console.log("F = "+F);
				
				// Loop through the d-th row changing all 1's to 0 except active k
				for (var j=0; j<p; j++){
					if (j != k[d]-1)
						M[d-1][j] = 0;
				}
				//console.log("M:");
				//console.table(M);
				
				// Store the current state of M
				var mString = JSON.stringify(M);
				M_copies[d] = JSON.parse(mString);	
				//console.log("M["+d+"]:");
				//console.table(M_copies[d]);
				
				if (d<p){						
					//console.log("Depth inc");		
					depthInc();					
				}else{							
					//console.log("Iso check!");
					isoCheckCount++;
					isoCheck();	
					complete = true;
					d = -1;
					//console.log("depth dec");
					//depthDec();					
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
		
		//console.log("d = "+d);
		//console.log("k = "+k);
		//console.log("F = "+F);
		//console.log("M:");
		//console.table(M);
		
		if (d>=p || k[d]>=p){	
			//console.log("Depth dec");
			depthDec();			
		}else{					
			//console.log("Depth inc");
			depthInc();			
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
Check the d-th row to see if the following condition exists:
A '1' in the d-th row in the same column as a '0' in F
@return - boolean: True if the condition holds anywhere in M[d-1], false otherwise;
*/
function mdjCheck(){
	for (var i=0; i<p; i++){
		//console.log("mdj check");
		if ((M[d-1][i] === 1) && (F[i] === 0))
			return true;
	}
	return false;
}

/*
Check each entry in the d-th row from k to p to see if the following condition exists:
A '1' in the d-th row in the same column as a '0' in F
@return - boolean: True if the condition holds anywhere in M[d-1], false otherwise;
*/
function kCheck(){
	for (var i = k[d]-1; i<p; i++){
		//console.log("k check");		
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
	
	



















