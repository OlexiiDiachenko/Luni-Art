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
  material.addEventListener("click", materialChoose);
});

tabs.forEach((material) => {
  material.addEventListener("click", mobileTabelCost);
  material.addEventListener("click", materialChoose);
});

// Cost Table Open End

// Order Section on/off ( Last form )

let order = document.querySelectorAll(".order_button"),
  consult = document.querySelector(".consult"),
  close = document.querySelector(".close"),
  messengers = document.querySelectorAll(".messenger_label"),
  selectedMessenger = document.getElementById("selectedMessenger"),
  textarea = document.querySelector("#messageArea"),
  material = false;

function materialChoose() {
  material = this.getAttribute("data-material");
  console.log(material);
}

for (let i = 0; i < order.length; i++) {
  order[i].addEventListener("click", showOrder);
}

function showOrder() {
  consult.style.display = "flex";
  setBody(body);
  let size = this.getAttribute("data-size") || false,
    message = this.getAttribute("data-message") || false;
  if (size) {
    if (material) {
      textarea.innerHTML = `Картина ${material} ${size} розміру. `;
      removeHolder();
    } else {
      textarea.innerHTML = `Картина ${size} розміру.`;
      removeHolder();
    }
  } else {
    textarea.innerHTML = `${message}`;
    removeHolder();
  }
}

consult.addEventListener("click", closeOrder);
close.addEventListener("click", closeOrder);

function closeOrder() {
  consult.style.display = "none";
  openBody(body);
}

// A little validate form in order menu

const phone = document.querySelector("#phone");

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

textarea.addEventListener("focus", removeHolder);
textarea.addEventListener("blur", removePlaceHolder);

function removeHolder() {
  textarea.nextElementSibling.style.display = "none";
}

function removePlaceHolder() {
  if (this.value.length == 0) {
    this.nextElementSibling.style.display = "block";
  } else {
    this.nextElementSibling.style.display = "none";
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

let isiPad = navigator.userAgent.match(/iPad/i),
  screenHeight;

let header = body.querySelector("header"),
  animatedElements = document.querySelectorAll(".animated");
if (isiPad) {
  animatedElements.forEach((element) => {
    element.classList.remove("animated");
  });
  let div = document.createElement("div");
  div.classList.add("header-photo-image");
  document.querySelector(".header-photo").prepend(div);
} else {
  if (window.innerWidth <= 520) {
    screenHeight = window.innerHeight - 100;
  } else {
    screenHeight = window.innerHeight - 300;
  }
  location = {};

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
}
