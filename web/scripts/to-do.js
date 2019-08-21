let enterButton = document.getElementById("enter");
let input = document.getElementById("userInput");
let ul = document.querySelector("ul");
let item = document.getElementsByTagName("li");

function inputLength(){
	return input.value.length;
}

function listList(){
	return item.length;
}

function createListElement(){
	let li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
	ul.appendChild(li);
	input.value = "";
	
	//STRIKEOUT
	function crossOut(){
		li.classList.toggle("done");
	}
	
	li.addEventListener("click",crossOut);
	//END STRIKEOUT
	
	//ADD DELETE BUTTON
	let dBtn = document.createElement("button");
	dBtn.appendChild(document.createTextNode("X"));
	li.appendChild(dBtn);
	dBtn.addEventListener("click", deleteListItem);
	//END DELETE BUTTON
	
	//ADD CLASS DELETE
	function deleteListItem(){
		li.classList.add("delete")
	}
	//END ADD CLASS DELETE
}

function addListAfterClick(){
	if (inputLength() > 0){
		createListElement();
	}
}

function addListAfterKeyPress(event){
	if (inputLength() > 0 && event.which ===13){
		createListElement();
	}
}

enterButton.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeyPress);
		
		
		
		
		
		
		
		
		
		
		
		