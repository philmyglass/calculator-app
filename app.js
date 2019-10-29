const calculator = document.querySelector(".calc-body");
const nonDigits = calculator.dataset.action;
const digit = document.querySelector(".digit-btn");
const screen = document.querySelector(".display-input");

const setupEventListeners = () => {
  calculator.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
      const act = e.target.dataset.action;
      if (!act) {
        if (screen.value == 0) {
          screen.value = e.target.textContent;
        } else {
          screen.value += e.target.textContent;
        }
      }
    }
  });
};

const init = () => {
  setupEventListeners();
  console.log("App is running");
};

init();
