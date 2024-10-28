const output = document.querySelector(".output-container");
const previousOutput = document.querySelector(".previous-output");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equals-btn");
const clearButton = document.querySelector(".reset-btn");
const decimalButton = document.querySelector(".decimal");

let currentInput = "";
let previousInput = "";
let operatorInput = "";
let totalValue = "";
let justCalculated = false;

// Number button event listener
numberButtons.forEach((number) => {
  number.addEventListener("click", () => {
    // Reset currentInput if justCalculated is true (to start a new calculation)
    if (justCalculated) {
      currentInput = "";
      justCalculated = false;
    }
    currentInput += number.innerHTML;
    output.innerHTML = currentInput;
  });
});

// Operator button event listener
operatorButtons.forEach((operatorEl) => {
  operatorEl.addEventListener("click", () => {
    if (currentInput === "" && !justCalculated) return;

    if (previousInput !== "" && currentInput !== "" && !justCalculated) {
      calculate(); // Perform the ongoing calculation before moving to the next
    } else {
      previousInput = currentInput || previousInput; // Set previousInput for new operation
    }

    operatorInput = operatorEl.innerHTML;
    currentInput = ""; // Prepare for the next operand
    justCalculated = false;
    previousOutput.innerHTML = `${previousInput} ${operatorInput} ${currentInput}`;
  });
});

decimalButton.addEventListener("click", () => {
  if (!currentInput.includes(".")) {
    currentInput += ".";
    output.innerHTML = currentInput;
  }
});

// Equal button event listener
equalButton.addEventListener("click", () => {
  
  if (previousInput === "" || currentInput === "" || operatorInput === "")
    return;

  calculate();
  output.innerHTML = totalValue; // Show the result of the calculation

  previousInput = totalValue; // Store result for continued calculations
  
  currentInput = ""; // Clear current input
  operatorInput = ""; // Clear operator for new operations
  justCalculated = true; // Set flag to indicate calculation completed
  previousOutput.innerHTML =
    `${previousInput} ${operatorInput}  ${currentInput}`;
});

// Function to perform calculation based on operator
function calculate() {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);

  switch (operatorInput) {
    case "+":
      totalValue = num1 + num2;
      break;
    case "-":
      totalValue = num1 - num2;
      break;
    case "*":
      totalValue = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        output.innerHTML = "Error"; // Handle division by zero
        return;
      }
      totalValue = num1 / num2;
      break;
  }
}

// Clear button event listener
clearButton.addEventListener("click", () => {
  currentInput = "";
  previousInput = "";
  operatorInput = "";
  totalValue = "";
  output.innerHTML = "";
  justCalculated = false; // Reset flag on clear
  previousOutput.innerHTML = ""; // Clear previous output
});
