"use strict";

const standardTips = document.querySelectorAll(".tip");
const customTip = document.getElementById("custom-input");

const changeBtnClr = function (option, action) {
  if (action === "add") {
    option.nextElementSibling.classList.add("btn--light");
  } else if (action === "remove")
    option.nextElementSibling.classList.remove("btn--light");
};

standardTips.forEach((option) => {
  option.nextElementSibling.classList.add("btn--dark");

  option.addEventListener("change", function (event) {
    const target = event.target.id;
    console.log(event.target.value);
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
