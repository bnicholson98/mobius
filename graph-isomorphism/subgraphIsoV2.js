/*	## Declare global variables ##  */
/*  ##############################  */

var nodesListA;
var nodesListB;
var A;
var B;
var pa;
var pb;
var M;
var M_copies = [];
var d = 0;
var k = [];
var F = [];
var isoCount=0;
var isoCheckCount=0;
var complete = false;

// # Starting function to set the variables and begin the algorithm # //
function subgraphIsoV2(graphA, graphB){
	
	// create a list of nodes for each graph
	nodesListA = getNodesList(graphA);
	nodesListB = getNodesList(graphB);
	
	// create an adjacency matrix for each graph
	A = matrixOf(graphA, nodesListA);
	B = matrixOf(graphB, nodesListB);
	
	pa = A.length;	// Number of nodes in graph A
	pb = B.length;	// Number of nodes in graph B
	
	// Create the initial matrix M
	M = initMatrix();
	//console.log("M0:");
	//console.table(M);
	
	var mString = JSON.stringify(M);
	M_copies[d] = JSON.parse(mString);
	//console.log("M["+d+"]:");
	//console.table(M_copies[d]);
	
	/* Loop throguh k and F setting each value to zero */
	for (var i=0; i<pa+1; i++)
		k[i] = 0;
	for (var j=0; j<pb; j++)
		F[j] = 0;
	
	//console.log("d = "+d);
	//console.log("k = "+k);
	//console.log("F = "+F);
	
	// ## ALGORITHM STARTS ## //
	depthInc();
	
	console.log("Iso count = "+isoCount);
	console.log("Number of checks = "+isoCheckCount);
	
}

// # Increase the depth of the search # //
function depthInc(){		
	while (!complete){
		d++;
		//console.log("d = "+d);
		
		// Check that a valid value in the d-th row exists
		if (mdjCheck()){
			k[d] = k[d-1]+1;
			//console.log("k = "+k);
			
			// Terminate in the active k value is out of scope
			if (k[d]>pb){
				complete = true;
				break;
			}
			
			// Check that a valid value for k exists in the d-th row
			if (kCheck()){	
				//console.log("k = "+k);
				// Setting F[] to 1 indicates that this column is active
				F[k[d]-1] = 1;
				//console.log("F = "+F);
				
				// Loop through the d-th row changing all 1's to 0 except active k
				for (var j=0; j<pb; j++){
					if (j != k[d]-1)
						M[d-1][j] = 0;
				}
				//console.log("M:");
				//console.table(M);
				
				var mString = JSON.stringify(M);
				M_copies[d] = JSON.parse(mString);	// Store the current state of M
				//console.log("M["+d+"]:");
				//console.table(M_copies[d]);
				
				if (d<pa){						// If max depth is not yet reached...
					//console.log("Depth inc");		
					depthInc();					// ...increase the depth
				}else{							// else...
					//console.log("Iso check!");
					isoCheckCount++;			
					isoCheck();					// ...perform an check for isomorphism and...
					//console.log("depth dec");
					depthDec();					// ...decrease the depth
				}
			}else
				depthDec();
		}else
			depthDec();
	}
}

// # Decrease the depth of the search # //
function depthDec(){
	while (!complete){
		d -= 1;
		// Terminate the algorithm if d is negative
		if (d<0){
			complete = true;
			break;
		}
		k[d]++;
		F[k[d]-1] = 0;			// Indicate the column to be inactive
		var mString = JSON.stringify(M_copies[d]);
		M = JSON.parse(mString);// Recover M to be the d-th copy
		
		//console.log("d = "+d);
		//console.log("k = "+k);
		//console.log("F = "+F);
		//console.log("M:");
		//console.table(M);
		
		if (d>=pa || k[d]>=pb){	// If either d or k[d] are out of scope...
			//console.log("Depth dec");
			depthDec();			// ...decrease the depth of the search
		}else{					// else...
			//console.log("Depth inc");
			depthInc();			// ...increase the depth of the search
		}
	}
}






function getNodesList(graph){
	var nodesList = [];
	graph.nodes().forEach(function(node){
		nodesList.push(node);
	});
	
	return nodesList;
}

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

function mdjCheck(){
	for (var i=0; i<pb; i++){
		//console.log("mdj check");
		if ((M[d-1][i] === 1) && (F[i] === 0))
			return true;
	}
	return false;
}

function kCheck(){
	for (var i = k[d]-1; i<pb; i++){
		//console.log("k check");		
		if ((M[d-1][i] === 1) && (F[i] === 0))
			return true;
		else
			k[d] += 1;
	}
	return false;
}

function isoCheck(){
	var iso = true;
	
	var MB = matrixMult(M,B);
	var MBT = MB[0].map((col,i) => MB.map(row => row[i]));
	var C = matrixMult(M,MBT);
	
	for (var i=0; i<pa; i++){
		for (var j=0; j<pa; j++){
			if (A[i][j] == 1){
				if (C[i][j] != 1)
					iso = false;
			}
		}
	}
	if (iso)
		isoCount++;
	
}

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
	
	



















