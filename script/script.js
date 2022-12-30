import {
  mouseComparisonMove,
  touchComparisonMove,
} from "./modules/Comparison.js";

import { setBody, openBody } from "./modules/FreezeBody.js";
import { tabelCost, mobileTabelCost } from "./modules/CostTabs.js";
import { setBlocks, setAnimation } from "./modules/Animations.js";
// Function Comparison

let comparisonWrappers = document.querySelectorAll(".comparison-images"),
  comparisonButtons = document.querySelectorAll(".comparison-button"),
  body = document.body;

comparisonButtons.forEach((button) => {
  button.addEventListener("mousedown", mouseComparison);
  button.addEventListener("touchstart", touchComparison);
});

function mouseComparison() {
  this.parentElement.addEventListener("mousemove", mouseComparisonMove);
  document.addEventListener("mouseup", removeComparison);
}

function touchComparison() {
  setBody(body);
  this.addEventListener("touchmove", touchComparisonMove);
  document.addEventListener("touchend", removeComparison);
}

function removeComparison() {
  comparisonWrappers.forEach((comparisonWrapper) => {
    comparisonWrapper.removeEventListener("mousemove", mouseComparisonMove);
    comparisonWrapper.removeEventListener("touchmove", touchComparisonMove);
  });
  if (body.classList.contains("noscroll")) {
    openBody(body);
    document.removeEventListener("touchend", removeComparison);
  }
}
// Comparison End

// Cost Table Open

let materials = document.querySelectorAll(".card-label");
let tabs = document.querySelectorAll(".tab-label");

materials.forEach((material) => {
  material.addEventListener("click", tabelCost);
});

tabs.forEach((material) => {
  material.addEventListener("click", mobileTabelCost);
});

// Cost Table Open End

// Order Section on/off ( Last form )

let order = document.querySelectorAll(".order_button"),
  consult = document.querySelector(".consult"),
  close = document.querySelector(".close"),
  messengers = document.querySelectorAll(".messenger_label"),
  selectedMessenger = document.getElementById("selectedMessenger");

for (let i = 0; i < order.length; i++) {
  order[i].addEventListener("click", showOrder);
}

function showOrder() {
  consult.style.display = "flex";
  setBody(body);
}

consult.addEventListener("click", closeOrder);
close.addEventListener("click", closeOrder);

function closeOrder() {
  consult.style.display = "none";
  openBody(body);
}

// A little validate a form in order menu

const phone = document.querySelector("#phone");
const name = document.querySelector("#name");
let inputsConsult = document.querySelectorAll(".userInfo-input");

for (let i = 0; i < inputsConsult.length; i++) {
  inputsConsult[i].addEventListener("blur", validate);
  inputsConsult[i].addEventListener("input", validate);
}

function validate() {
  let lengthWrite = parseInt(this.value.length);
  let validateLength = this.getAttribute("data-length");
  if (lengthWrite < validateLength) {
    this.style.borderBottom = "1px solid rgba(255 , 0 , 0 , 0.25)";
    if (this.parentElement.classList.contains("valid")) {
      this.parentElement.classList.remove("valid");
    }
  } else {
    this.style.borderBottom = "1px solid rgba(0 , 255 , 0 , 0.25)";
    this.parentElement.classList.add("valid");
  }
}

phone.addEventListener("focus", startNubmer);
phone.addEventListener("blur", removeNubmer);

function startNubmer() {
  if (this.value.length > 4) {
    this.value = this.value;
  } else {
    this.value = "+" + 380;
  }
}

function removeNubmer() {
  if (this.value == +380) {
    this.value = "";
  } else {
    this.value = this.value;
  }
}

// Selected Messenger For Contact

messengers.forEach((messenger) => {
  messenger.addEventListener("click", selectMessenger);
});

function selectMessenger() {
  let messenger = this.previousElementSibling,
    selectMessenger = messenger.getAttribute("data-messenger");

  selectedMessenger.value = selectMessenger;
}

// Animations

// Check for Ipad

let isiPad = navigator.userAgent.match(/iPad/i);

if (isiPad) {
  let animatedElements = document.querySelectorAll(".animated");

  animatedElements.forEach((element) => {
    element.classList.remove("animated");
  });
} else {
  let header = body.querySelector("header"),
    screenHeight = window.innerHeight - 300,
    location = {},
    animatedElements = document.querySelectorAll(".animated");

  const orientationType = () => {
    return header.clientHeight >= window.innerHeight;
  };

  const setAnimationForOrientation = () => {
    if (!orientationType()) {
      let animation = animatedElements[0].getAttribute("data-animation");
      animatedElements[0].classList.add(animation);
    }
  };

  setAnimationForOrientation();

  setBlocks(animatedElements, location);
  window.addEventListener("scroll", () => {
    setAnimation(location, screenHeight, animatedElements);
  });

  screen.addEventListener("orientationchange", () => {
    setAnimationForOrientation();
    setBlocks(animatedElements, location);
    setAnimation(location, screenHeight, animatedElements);
  });
}
