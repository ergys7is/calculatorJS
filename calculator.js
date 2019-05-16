const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
  operations: []
};

//var operations = [];

function updateDisplay() {
  const display = $('#calculator .screen');
  $('#calculator .screen').val(calculator.displayValue);
}



function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

	if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  	} 
  	else {
    	if (calculator.displayValue === '0') {
		calculator.displayValue = digit;
		}
		else {
		calculator.displayValue += digit;
		}
  	}

  console.log(calculator);
}

function inputDecimal(dot) {
	if (calculator.waitingForSecondOperand === true) return;

	if (!calculator.displayValue.includes(dot)) {
  	calculator.displayValue += dot;
  }
}


function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);

	if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
	}

	if (firstOperand == null) {
    calculator.firstOperand = inputValue;
	} 
	else if (operator) {
    const currentValue = firstOperand || 0;
    const result = performCalculation[operator](currentValue, inputValue);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
	}

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '=': (firstOperand, secondOperand) => secondOperand
};

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

function clearLastEntry() {
	calculator.operations.pop();
	if (calculator.waitingForSecondOperand === false) {
		calculator.displayValue = 0;
		calculator.displayValue += '';

	}
	else if (calculator.waitingForSecondOperand === true) {
		calculator.displayValue = calculator.firstOperand;
		calculator.waitingForSecondOperand = false;
		calculator.displayValue += '';
		calculator.firstOperand = null;
		calculator.operator = null;
	}

	console.log(calculator);
}

updateDisplay();

const keys = $('#calculator .keys');
keys.click(function(evt) {	
	//get the element
	const target = $(event.target);
	//get the class of the element
	const tgClass = target.attr('class');

	//to test if we didn't clicked on a button
	if (target.parent().attr('class') !== 'keys') {
		console.log('Click a button!');
		return;
	}
		
	if (tgClass ==='operator') {
	    handleOperator(target.val());
		updateDisplay();
		calculator.operations.push(target.val());
	    return;
	}
		
	if (tgClass === 'dot') {
	 	inputDecimal(target.val());
		updateDisplay();
		calculator.operations.push(target.val());
		return;
	}
		
	if (tgClass === 'allClear') {
	    resetCalculator();
		updateDisplay();
	    return;
	}

	if (tgClass === 'clearEntry') {
		clearLastEntry();
		updateDisplay();
	    return;
	}

	if (tgClass === 'numbers') {
		inputDigit(target.val());
		updateDisplay();
		calculator.operations.push(target.val());
	}

	});

