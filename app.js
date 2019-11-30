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
  let mem = calcData.memory;
  const screen = document.querySelector(".display-input");

  //basic arithmatic functions
  let additionFunc = num => {
    if (
      //if using multiple arithmatic operators
      calcData.curNums.length > 0 &&
      calcData.curOp.length > 1 &&
      calcData.curOp[calcData.curOp.length - 2] === "addition"
    ) {
      calcData.curSum += num;
    } else if (
      //if only using a single arithmatic orperator e.g. 1 + 1
      calcData.curNums.length > 0 &&
      calcData.curOp.length < 2 &&
      calcData.curOp[calcData.curOp.length - 1] === "addition"
    ) {
      calcData.curSum += num;
    }
  };
  let subtractFunc = num => {
    if (
      calcData.curNums.length > 0 &&
      calcData.curOp.length > 1 &&
      calcData.curOp[calcData.curOp.length - 2] === "subtract"
    ) {
      calcData.curSum -= num;
    } else if (
      calcData.curNums.length > 0 &&
      calcData.curOp.length < 2 &&
      calcData.curOp[calcData.curOp.length - 1] === "subtract"
    ) {
      calcData.curSum -= num;
    }
  };
  let multiplyFunc = num => {
    if (
      calcData.curNums.length > 0 &&
      calcData.curOp.length > 1 &&
      calcData.curOp[calcData.curOp.length - 2] === "multiply"
    ) {
      calcData.curSum *= num;
    } else if (
      calcData.curNums.length > 0 &&
      calcData.curOp.length < 2 &&
      calcData.curOp[calcData.curOp.length - 1] === "multiply"
    ) {
      calcData.curSum *= num;
    }
  };
  let divideFunc = num => {
    if (
      calcData.curNums.length > 0 &&
      calcData.curOp.length > 1 &&
      calcData.curOp[calcData.curOp.length - 2] === "divide"
    ) {
      calcData.curSum /= num;
    } else if (
      calcData.curNums.length > 0 &&
      calcData.curOp.length < 2 &&
      calcData.curOp[calcData.curOp.length - 1] === "divide"
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
  window.addEventListener("keypress", e => {
    const press = e.charCode;

    if (press > 47 && press < 58) {
      if (
        screen.value == 0 ||
        screen.value == calcData.curSum ||
        screen.value == calcData.curNums[calcData.curNums.length - 1] ||
        screen.value == mem[mem.length - 1]
      ) {
        screen.value = String.fromCharCode(press);
      } else {
        screen.value += String.fromCharCode(press);
      }
    }

    if (press === 42 || press === 43 || press === 45 || press === 47) {
      calcData.curNums.push(parseFloat(screen.value));
      if (press === 42) {
        checkOp("multiply");
        calcAll();
        screen.value = calcData.curSum;
      } else if (press === 43) {
        checkOp("addition");
        calcAll();
        screen.value = calcData.curSum;
      } else if (press === 45) {
        checkOp("subtract");
        calcAll();
        screen.value = calcData.curSum;
      } else if (press === 47) {
        checkOp("divide");
        calcAll();
        screen.value = calcData.curSum;
      }
    }

    if (press === 13) {
      console.log("enter pressed");
      if (screen.value != calcData.curSum) {
        additionFunc(parseFloat(screen.value));
        subtractFunc(parseFloat(screen.value));
        multiplyFunc(parseFloat(screen.value));
        divideFunc(parseFloat(screen.value));
        screen.value = calcData.curSum;
      }
    }

    //not working for some reason?!
    // if (press == 8) {
    //   console.log("delete pressed");
    //   const numStr = screen.value;
    //   const newNum = numStr.slice(0, numStr.length - 1);

    //   if (numStr != calcData.curSum) {
    //     screen.value = newNum;
    //   }
    // }
  });
  calculator.addEventListener("click", e => {
    //if the event target is a button element
    if (e.target.tagName === "BUTTON") {
      const act = e.target.dataset.action;

      // if the event target has no data-action set - which means it is a button with a digit
      if (!act) {
        if (
          //use non strict equality operator as the screen is a string and the data structure is a number
          screen.value == 0 ||
          screen.value == calcData.curSum ||
          screen.value == calcData.curNums[calcData.curNums.length - 1] ||
          screen.value == mem[mem.length - 1]
        ) {
          screen.value = e.target.textContent;
        } else {
          screen.value += e.target.textContent;
        }
      }

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
        calcAll();
        screen.value = calcData.curSum; //reset input field/screen to empty

        //console.log(calcData.curOp);
        console.log(calcData.curSum);
      }

      //click equals and the system will return the value in curSum in the data structure with what is currently
      //in the input field on the calculator screen
      if (act === "equals") {
        if (screen.value != calcData.curSum) {
          additionFunc(parseFloat(screen.value));
          subtractFunc(parseFloat(screen.value));
          multiplyFunc(parseFloat(screen.value));
          divideFunc(parseFloat(screen.value));
          screen.value = calcData.curSum;
        } else {
          screen.value = calcData.curSum;
        }
      }

      //clears screen and resets to 0. Alos resets all data structures to empty.
      if (act === "clear") {
        screen.value = 0;
        calcData.curSum = 0;
        calcData.curNums = [];
        calcData.curOp = [];
      }

      //returns the running total sqaured and renders to the screen. Also stores this in the data structure.
      if (act === "square") {
        const square = calcData.curSum;
        if (calcData.curSum === 0) {
          calcData.curSum = screen.value * screen.value;
          screen.value = calcData.curSum;
        } else {
          calcData.curSum = square * square;
          screen.value = calcData.curSum;
        }
      }

      //square root function on the running total or number on the calculator screen
      if (act === "square-root") {
        const root = calcData.curSum;
        if (calcData.curSum === 0) {
          calcData.curSum = Math.sqrt(screen.value);
          screen.value = calcData.curSum;
        } else {
          calcData.curSum = Math.sqrt(root);
          screen.value = calcData.curSum;
        }
      }

      //deletes the last digit on the screen when delete is clicked, unless it is the running total
      //in which case it will not work
      if (act === "delete") {
        const numStr = screen.value;
        const newNum = numStr.slice(0, numStr.length - 1);

        if (numStr != calcData.curSum) {
          screen.value = newNum;
        }
      }

      //adds a decimal place to the number on the screen, unless there is already a decimal
      //point there
      if (act === "decimal") {
        const numStr = screen.value;
        if (!numStr.includes(".")) {
          screen.value += e.target.textContent;
        }
      }

      //calculator memory functions
      if (act === "memory-add") {
        mem.push(parseFloat(screen.value));
      } else if (act === "memory-sub") {
        mem.pop();
      } else if (act === "memory-recall") {
        if (mem.length > 0) {
          screen.value = mem[mem.length - 1];
        }
      } else if (act === "memory-clear") {
        calcData.memory = []; //had to use true name of location to make sure array was reset. If used variable it would not reference the location properly
        console.log("click");
        console.log(calcData.memory);
      }

      //percentage function to 2 decimal places
      if (act === "percentage") {
        if (calcData.curNums.length > 0) {
          screen.value =
            (calcData.curNums[calcData.curNums.length - 1] *
              parseFloat(screen.value)) /
            100;
        }
      }
    }
  });
};

//initialisation function
const init = () => {
  setupEventListeners();
  document.querySelector(".display-input").setAttribute("readonly", true);
  console.log("App is running");
};

init();
