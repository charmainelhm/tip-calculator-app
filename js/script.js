"use strict";

const standardTips = document.querySelectorAll(".tip");
const customInputs = document.querySelectorAll(".input");
const customTip = document.getElementById("tip");
const displayTip = document.getElementById("display-tip");
const displayAmt = document.getElementById("display-amt");
const resetBtn = document.querySelector(".btn--reset");

let billAmt, tipAmt, paxAmt, calcTip, calcTotal;

const changeBtnClr = function (option, action) {
  if (action === "add") {
    option.nextElementSibling.classList.add("btn--light");
  } else if (action === "remove")
    option.nextElementSibling.classList.remove("btn--light");
};

const activateResetBtn = function () {
  resetBtn.classList.remove("btn--inactive");
};

const valueChecker = function (input, value) {
  if (value === 0)
    input.closest(".input-content").classList.add("input--error");
  else {
    input.closest(".input-content").classList.remove("input--error");
    if (input.id === "bill") billAmt = value;
    else paxAmt = value;
  }
};

const resetData = function () {
  resetBtn.classList.add("btn--inactive");
  standardTips.forEach((option) => changeBtnClr(option, "remove"));
  customInputs.forEach((input) => {
    input.closest(".input-content").classList.remove("input--error");
    input.value = "";
  });
  displayTip.textContent = "$0.00";
  displayAmt.textContent = "$0.00";

  billAmt = 0;
  tipAmt = 0;
  paxAmt = 0;
  calcTip = 0;
  calcTotal = 0;
};

const calculate = function () {
  calcTip = billAmt * (tipAmt / 100);
  console.log(billAmt, calcTip);
  displayTip.textContent = `$${(calcTip / paxAmt).toFixed(2)}`;
  calcTotal = billAmt + calcTip;
  console.log(typeof calcTotal);
  displayAmt.textContent = `$${(calcTotal / paxAmt).toFixed(2)}`;
};

standardTips.forEach((option) => {
  option.nextElementSibling.classList.add("btn--dark");

  option.addEventListener("change", function (event) {
    activateResetBtn();
    const target = event.target.id;
    tipAmt = event.target.value;
    if (billAmt && paxAmt) calculate();

    for (const option of standardTips) {
      if (option.id == target) {
        changeBtnClr(option, "add");
      } else {
        changeBtnClr(option, "remove");
      }
    }
  });
});

customTip.addEventListener("focus", function () {
  standardTips.forEach((option) => changeBtnClr(option, "remove"));
});

customInputs.forEach((input) => {
  input.addEventListener("input", function () {
    console.log(input.value);
    activateResetBtn();
    if (input.id === "tip") tipAmt = Number(input.value);
    else valueChecker(input, Number(input.value));
    console.log(billAmt, tipAmt, paxAmt);

    if (billAmt && tipAmt && paxAmt) {
      calculate();
    }
  });
});

resetBtn.addEventListener("click", resetData);
