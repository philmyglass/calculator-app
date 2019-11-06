//data structure to store arithmatic data
let calcData = {
  curNums: [],
  curOp: [],
  curSum: 0,
  memory: []
};

//setup event listener for clicking a button in a function to be called in the init function when the app starts
const setupEventListeners = () => {
  const calculator = document.querySelector(".calc-body");
  const nonDigits = calculator.dataset.action;
  const operator = document.querySelector(".operator");
  const digit = document.querySelector(".digit-btn");
  const screen = document.querySelector(".display-input");
  calculator.addEventListener("click", e => {
    //if the event target is a button element
    if (e.target.tagName === "BUTTON") {
      const act = e.target.dataset.action;

      // if the event target has no data-action set - which means it is a button with a digit
      if (!act) {
        if (
          screen.value == 0 ||
          screen.value === calcData.curSum[calcData.curSum.length - 1] ||
          screen.value === calcData.curNums[calcData.curNums.length - 1]
        ) {
          screen.value = e.target.textContent;
        } else {
          screen.value += e.target.textContent;
        }
      }

      // let numSum = () => {
      //   if (
      //     calcData.curNums.length > 1 &&
      //     calcData.curOp[calcData.curOp.length - 2] === "addition"
      //   ) {
      //     calcData.curSum.push(
      //       calcData.curNums[calcData.curNums.length - 2] +
      //         calcData.curNums[calcData.curNums.length - 1]
      //     );
      //     screen.value = calcData.curSum[calcData.curSum.length - 1];
      //   }
      // };

      let additionFunc = num => {
        if (
          calcData.curNums.length > 1 &&
          calcData.curOp[calcData.curOp.length - 2] === "addition"
        ) {
          calcData.curSum += num;
        }
      };
      let subtractFunc = num => {
        if (
          calcData.curNums.length > 1 &&
          calcData.curOp[calcData.curOp.length - 2] === "subtract"
        ) {
          calcData.curSum -= num;
        }
      };
      let multiplyFunc = num => {
        if (
          calcData.curNums.length > 1 &&
          calcData.curOp[calcData.curOp.length - 2] === "multiply"
        ) {
          calcData.curSum *= num;
        }
      };
      let divideFunc = num => {
        if (
          calcData.curNums.length > 1 &&
          calcData.curOp[calcData.curOp.length - 2] === "divide"
        ) {
          calcData.curSum /= num;
        }
      };

      //check what operator was used and push this into the data strcuture to refer
      //back to when second number for an equation has been input by the user
      let checkOp = symbol => {
        switch (symbol) {
          case "addition":
            calcData.curOp.push("addition");
            break;
          case "subtract":
            calcData.curOp.push("subtract");
            break;
          case "multiply":
            calcData.curOp.push("multiply");
            break;
          case "divide":
            calcData.curOp.push("divide");
            break;
        }
      };

      //if the current sum in the data structure is empty, push the first number input to the current sum
      //otherwise call the arithmatic functions
      let calcAll = () => {
        if (calcData.curSum === 0) {
          calcData.curSum = calcData.curNums[0];
        } else {
          additionFunc(calcData.curNums[calcData.curNums.length - 1]);
          subtractFunc(calcData.curNums[calcData.curNums.length - 1]);
          multiplyFunc(calcData.curNums[calcData.curNums.length - 1]);
          divideFunc(calcData.curNums[calcData.curNums.length - 1]);
        }
      };

      //if math operator clicked, digit on screen parsed as float and pushed into data structure
      //math operator also pushed into the data structure as a string
      if (
        act === "addition" ||
        act === "subtract" ||
        act === "divide" ||
        act === "multiply"
      ) {
        calcData.curNums.push(parseFloat(screen.value)); //push input to data structure
        checkOp(act); //push operator to data structure as a string
        screen.value = ""; //reset input field/screen to empty

        calcAll();
        //console.log(calcData.curOp);
        console.log(calcData.curSum);
      }

      //click equals and the system will return the value in curSum in the data structure with what is currently
      //in the input field on the calculator screen
      if (act === "equals") {
        additionFunc(parseFloat(screen.value));
        subtractFunc(parseFloat(screen.value));
        multiplyFunc(parseFloat(screen.value));
        divideFunc(parseFloat(screen.value));
        screen.value = calcData.curSum;
      }
    }
  });
};

const init = () => {
  setupEventListeners();
  console.log("App is running");
};

init();
