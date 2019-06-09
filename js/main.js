/************************************************************/
/**************************Variable*************************/
/**********************************************************/
// select the elements in the DOM
const buttonElts = $("input[type=button]");
let para1Elt = $("#calculated");
let para2Elt = $("#result");
// create 2 array
let stockDisplay = [];
let stockValue  = [];
// where i go stock the values
let stockNumber = "";
// to know if the last is a number or a point...
let isPointSet = false;
let isNumberSet = true;

/************************************************************/
/**************************Function*************************/
/**********************************************************/
function displayCalculated(value) {
	if (/^[0-9]{1}$/.test(value)) { // button 0 to 9
		stockNumber += value;
		stockDisplay.push(value);
		isNumberSet = true;
	} else if (/^[%|/|x|\-|+]{1}$/.test(value)) { // button %, x, +, -
		isPointSet = false;
		if (para1Elt.text() == "0") { // if there is no number enter
			stockDisplay.push(0, value);
		}else if (isNumberSet === true) {
			isNumberSet = false;
			//if (typeof stockNumber[stockNumber.length - 1] == "number")
			stockValue.push(parseFloat(stockNumber), value)
			stockNumber = "";
			stockDisplay.push(value);
		} else {
			stockDisplay[stockDisplay.length - 1] = value;
			stockValue[stockValue.length - 1] = value;
		}
	} else if (/^[.]{1}$/.test(value) && isPointSet === false) {
		isPointSet = true;
		stockNumber += value;
		stockDisplay.push(value);
	} else if (/^[=]{1}$/.test(value)) {
		isPointSet = false;
		isNumberSet = true;
		stockValue.push(parseFloat(stockNumber));
		stockNumber = "";
	} else if (/^AC$/.test(value)) {
		isPointSet = false;
		isNumberSet = true;
		stockValue = [];
		stockDisplay = [];
		stockNumber = "";
	}
	//stockDisplay = `${stockDisplay}${value}`;
/*	if (para1Elt.val() == "0") {
		para1Elt.text("");
	}
	stockDisplay.push(value);
	for (let one of stockDisplay) {
		para1Elt.textContent += one;
	}*/
	para1Elt.text(stockDisplay.join(""))
	//console.log(isPointSet)
	//console.log(parseFloat(stockDisplay.join("")))
	return stockValue;
}
// reset the display
function reset() {
	para1Elt.text("0");
	para2Elt.text("0");
}
// to set a point 
function setPoint(stockNumber, number2) {
	return parseFloat(`${stockNumber}.${number2}`);

}
function total(arrayValue) {
	/*for (let elem of array) {
		if (elem == "x") {
			elem = "*";
		}
	}*/
	for (let i = 0; i > arrayValue.length; i++) {
		console.log(arrayValue[i])
	}
	console.log("ok")
}

/************************************************************/
/**************************Execution************************/
/**********************************************************/

// when a button is push down
buttonElts.click(function() {
	if (this.value != "AC" && this.value != "=") {
		stockValue = displayCalculated(this.value);
	} else if (this.value === "AC") {
		reset();
		displayCalculated(this.value);
	} else if (this.value === "=") {
		total(stockValue);
		displayCalculated(this.value);
	}
	//console.log(stockValue)
	
});




/*
let arrayTest = [5, 6, 5, 10];

arrayTest[arrayTest.length - 1] += 1;

//let test = setPoint(arrayTest[arrayTest.length - 1],3);

console.log(arrayTest[arrayTest.length - 1])

for (let i = 0; i < arrayTest.length; i++) {
	arrayTest[i] += ""+1;
}
console.log(arrayTest)*/

/*let arrayTest = [5, 6, 5, 10, "+", 6, 4];

console.log(arrayTest.join(""))*/

