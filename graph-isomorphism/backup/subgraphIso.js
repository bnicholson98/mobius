var nodesListA;
var nodesListB;
var A;
var B;
var pa;
var pb;
var M;
var M_copies =[];
var d= 1;
var k;
var H;
var F;
var complete = false;
var isoCount = 0;

function subgraphIso(graphA,graphB){
	console.log("##Step1##");
	
	nodesListA = getNodesList(graphA);
	nodesListB = getNodesList(graphB);
	console.log(nodesListA);
	console.log(nodesListB);
	
	A = matrixOf(graphA, nodesListA);
	B = matrixOf(graphB, nodesListB);
	console.table(A);
	console.table(B);
	
	
	pa = A.length;
	pb = B.length;
	console.log("A length = "+pa);
	console.log("B length = "+pb);
	
	
	M = initMatrix();
	k;
	H = new Array(pa);
	F = new Array(pb);
	H[1] = 0;
	for (i=0; i<pb; i++)
		F[i] = 0;
	
	console.table("M = "+M)
	console.table("F = "+F);
	console.table("H = "+H);
	console.log("k = "+k);
	console.log("d = "+d);
	console.log("#");
	step2();
	console.log("Done");
	console.log(isoCount);
	
}

function step2(){
	if (!complete){
		for (i=0; i<pb; i++){
			if (M[d-1][i] != 1 && F[j] != 0)
				step7();
			else{
				var mString = JSON.stringify(M);
				M_copies[d-1] = JSON.parse(mString);
				if (d == 1)
					k = H[1];
				else
					k = 0;
			}
		}
		console.log("##Step2##");
		console.table(M_copies[d-1]);
		console.table("M = "+M)
		console.table("F = "+F);
		console.table("H = "+H);
		console.log("k = "+k);
		console.log("d = "+d);
		console.log("#");
		step3();
	}
}

function step3(){
	if (!complete){
		k++;
		console.log("##Step3##");
		console.log(k);
		if (M[d-1][k-1] == 0 || F[k-1] == 1)
			step3();
		else{
			for (j=0; j<pb; j++){
				if (j != k-1){
					M[d-1][j] = 0;	
				}
			}
			console.log("##Step3##");
			console.table("M = "+M)
			console.table("F = "+F);
			console.table("H = "+H);
			console.log("k = "+k);
			console.log("d = "+d);
			console.log("#");
			step4();
		}
	}
}

function step4(){
	if (!complete){
		console.log("##Step4##");
		console.table("M = "+M)
		console.table("F = "+F);
		console.table("H = "+H);
		console.log("k = "+k);
		console.log("d = "+d);

		if (d<pa){
			console.log("True");
			console.log("#");
			step6();
		}else{
			console.log("False");
			console.log("iso check");
			if (isoCheck())
				isoCount++;
			console.log("#");
			step5();
		}
	}
}

function step5(){
	if (!complete){
		console.log("##Step5##");
		console.table("k = "+k);
		if (k>= pb)
			step7();
		for (j=k; j<pb; j++){
			console.log(j);
			if (M[d-1][j] == 0 && F[j] == 0){
				console.log("exit");
				break;
			}
			else{
				step7();
			}
		}
		M = M_copies[d-1];

		console.table(M_copies[d-1]);
		
		console.table("M = "+M)
		console.table("F = "+F);
		console.table("H = "+H);
		console.log("k = "+k);
		console.log("d = "+d);
		console.log("#");
		
		step3();
	}
}

function step6(){
	if (!complete){
		H[d-1] = k;
		F[k-1] = 1;
		d++;
		
		console.log("##Step6##");
		console.table("M = "+M)
		console.table("F = "+F);
		console.table("H = "+H);
		console.log("k = "+k);
		console.log("d = "+d);
		console.log("#");
		step2();
	}
}

function step7(){
	console.log("##Step7##");
	console.log(d);
	if (d != 1){
		F[k-1] = 0;
		d -= 1;
		M = M_copies[d-1];
		k = H[d-1];		
		console.table("M = "+M)
		console.table("F = "+F);
		console.table("H = "+H);
		console.log("k = "+k);
		console.log("d = "+d);
		console.log("#");
		step5();
	}
	complete =true;
}









function isoCheck(){
	var testArr = [[0,1,1],
					[1,0,1],
					[1,1,0]];
	var MB = matrixMult(M,testArr);
	var MBT = MB[0].map((col, i) => MB.map(row => row[i]));

	var C = matrixMult(M,MBT);
	
	var iso = true;
	for (i=0; i<pa; i++){
		for (j=0; j<pa; j++){
			if (A[i][j] == 1){
				if (C[i][j] != 1)
					iso = false
			}
		}
	}
	return iso;
}

function matrixMult(mA, mB){
	var result = [];
	var ele;
	
	for (i=0; i<mA.length; i++){
		result.push([]);
		for (j=0; j<mB[i].length; j++){
			ele = 0;
			for (k=0; k<mA[i].length; k++){
				ele += mA[i][k]*mB[k][j];
			}
			result[i][j] = ele;
		}
	}
	return result;
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
	
	for (i=0; i<nodesList.length; i++){
		adjacencyMatrix.push([]);
		for (j=0; j<nodesList.length; j++){
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