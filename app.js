let calcData = {
  curNums: [],
  curSum: [],
  memory: []
};

//setup event listener for clicking a button in a function to be called in the init function when the app starts
const setupEventListeners = () => {
  const calculator = document.querySelector(".calc-body");
  const nonDigits = calculator.dataset.action;
  const digit = document.querySelector(".digit-btn");
  const screen = document.querySelector(".display-input");
  calculator.addEventListener("click", e => {
    //if the event target is a button element
    if (e.target.tagName === "BUTTON") {
      const act = e.target.dataset.action;

      // if the event target has no data-action set
      if (!act) {
        if (screen.value == 0) {
          screen.value = e.target.textContent;
        } else {
          screen.value += e.target.textContent;
        }
      }

      if (
        act === "addition" ||
        act === "subtract" ||
        act === "divide" ||
        act === "multiply"
      ) {
        calcData.curNums.push(parseFloat(screen.value));
        screen.value = 0;
        console.log(calcData.curNums);
      }
    }
  });
};

const init = () => {
  setupEventListeners();
  console.log("App is running");
};

init();
