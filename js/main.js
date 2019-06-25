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
			if (/^[x]{1}$/.test(value)) { // if value equal to x i change the value to *
				value = "*";
			}
			stockValue.push(parseFloat(stockNumber), value)
			stockNumber = "";
			stockDisplay.push(value);
		} else {
			stockDisplay[stockDisplay.length - 1] = value;
			stockValue[stockValue.length - 1] = value;
		}
	} else if (/^[.]{1}$/.test(value) && isPointSet === false) { // if value equal to . and isPointSet is false
		isPointSet = true;
		stockNumber += value;
		stockDisplay.push(value);
	} else if (/^[=]{1}$/.test(value)) { // if value equal to =
		isPointSet = false;
		isNumberSet = true;
		para2Elt.text(eval(para1Elt.text()));
	} else if (/^AC$/.test(value)) { // if value equal to AC
		isPointSet = false;
		isNumberSet = true;
		stockValue = [];
		stockDisplay = [];
		stockNumber = "";
	}
	if (!/^[AC|=]+$/.test(value)) {
		para1Elt.text(stockDisplay.join(""));
	}
	return stockValue;
}

// reset the display
function reset() {
	para1Elt.text("0");
	para2Elt.text("0");
}

/************************************************************/
/**************************Execution************************/
/**********************************************************/

// when a button is push down
buttonElts.click(function() {
	if (this.value != "AC" && this.value != "=") { // if the value is not equal to AC or =
		stockValue = displayCalculated(this.value);
	} else if (this.value === "AC") { // but if it's equal to AC
		reset();
		displayCalculated(this.value);
	} else if (this.value === "=") { // or if it's equal to =
		displayCalculated(this.value);
	}
});