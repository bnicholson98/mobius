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
var count = 0;

function subgraphIsoV2(graphA, graphB){
	nodesListA = getNodesList(graphA);
	nodesListB = getNodesList(graphB);
	
	A = matrixOf(graphA, nodesListA);
	B = matrixOf(graphB, nodesListB);
	
	pa = A.length;
	pb = B.length;
	
	M = initMatrix();
	console.log("M0:");
	console.table(M);
	
	var mString = JSON.stringify(M);
	M_copies[d] = JSON.parse(mString);
	console.log("M["+d+"]:");
	console.table(M_copies[d]);
	for (var i=0; i<pa+1; i++)
		k[i] = 0;
	for (var j=0; j<pb; j++)
		F[j] = 0;
	
	console.log("d = "+d);
	console.log("k = "+k);
	console.log("F = "+F);
	depthInc();
	console.log("Iso count = "+isoCount);
	console.log("Number of checks = "+isoCheckCount);
	
}

function depthInc(){
	while (!complete){
		d++;
		console.log("d = "+d);
		
		if (mdjCheck()){
			k[d] = k[d-1]+1;
			console.log("k = "+k);
			
			if (k[d]>pb){
				complete = true;
				break;
			}
			
			if (kCheck()){	
				console.log("k = "+k);			
				F[k[d]-1] = 1;
				console.log("F = "+F);
				
				for (var j=0; j<pb; j++){
					if (j != k[d]-1)
						M[d-1][j] = 0;
				}
				console.log("M:");
				console.table(M);
				
				var mString = JSON.stringify(M);
				M_copies[d] = JSON.parse(mString);
				console.log("M["+d+"]:");
				console.table(M_copies[d]);
				if (d<pa){
					console.log("Depth inc");
					depthInc();
				}else{
					console.log("Iso check!");
					isoCheckCount++;
					isoCheck();
					console.log("depth dec");
					depthDec();
				}
			}else
				depthDec();
		}else
			depthDec();
	}
}

function depthDec(){
	while (!complete){
		d -= 1;
		if (d<0){
			complete = true;
			break;
		}
		k[d]++;
		F[k[d]-1] = 0;
		var mString = JSON.stringify(M_copies[d]);
		M = JSON.parse(mString);
		
		console.log("d = "+d);
		console.log("k = "+k);
		console.log("F = "+F);
		console.log("M:");
		console.table(M);
		
		if (d>=pa || k[d]>=pb){
			console.log("Depth dec");
			depthDec();
		}else{
			console.log("Depth inc");
			depthInc();
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
		console.log("mdj check");
		if ((M[d-1][i] === 1) && (F[i] === 0))
			return true;
	}
	return false;
}

function kCheck(){
	for (var i = k[d]-1; i<pb; i++){
		console.log("k check");		
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
	
	



















