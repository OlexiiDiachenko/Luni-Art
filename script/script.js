$(document).ready(function () {
  $(".slider_photo").slick({
    slidesToShow: 3,
    speed: 1000,
    easing: "ease",
    draggable: false,
    responsive: [
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          speed: 700,
        },
      },
    ],
  });

  $(".slider_size").slick({
    dots: true,
    slidesToShow: 2,
    speed: 1000,
    easing: "ease",
    draggable: false,
    responsive: [
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          speed: 700,
        },
      },
    ],
  });

  $(".slider_video").slick({
    slidesToShow: 3,
    speed: 1000,
    easing: "ease",
    draggable: false,
    responsive: [
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          speed: 700,
        },
      },
    ],
  });
  $(".slider_mobile").slick({
    slidesToShow: 1,
    speed: 700,
    easing: "ease",
  });
});

// Function Comparison

let comparisonWrappers = document.querySelectorAll(".comparison-images"),
  comparisonButtons = document.querySelectorAll(".comparison-button");

comparisonButtons.forEach((button) => {
  button.addEventListener("mousedown", mouseComparison);
  button.addEventListener("touchstart", touchComparison);
});

function mouseComparison() {
  this.parentElement.addEventListener("mousemove", mouseComparisonMove);
  document.addEventListener("mouseup", removeComparison);
}

function touchComparison() {
  this.addEventListener("touchmove", touchComparisonMove);
  document.addEventListener("touchcancel", removeComparison);
}

// Comparison For Mouse
function mouseComparisonMove(event) {
  let comparisonBefore = this.querySelector(".image-comparison_before"), // Get Block With Painting
    button = this.querySelector(".comparison-button"), // Get Our Circle Button
    left = event.pageX - this.offsetLeft, // Calculate This Position Left
    width = this.clientWidth; // Get True Width Our Parent Block
  if (left < 0) left = 0;
  if (left > width) left = width;
  button.style.left = `${left}px`;
  comparisonBefore.style.width = `${left}px`;
}

// Comparison For Touch
function touchComparisonMove(event) {
  let parent = this.parentElement,
    comparisonBefore = parent.querySelector(".image-comparison_before"), // Get Block With Painting
    button = parent.querySelector(".comparison-button"), // Get Our Circle Button
    touches = event.changedTouches, // Get All Touches
    touch = touches[0], // Get Out First Touch On Button
    left = touch.pageX - parent.offsetLeft, // Calculate This Position Left
    width = parent.clientWidth; // Get True Width Our Parent Block
  if (left < 0) left = 0;
  if (left > width) left = width;
  button.style.left = `${left}px`;
  comparisonBefore.style.width = `${left}px`;
}

function removeComparison() {
  comparisonWrappers.forEach((comparisonWrapper) => {
    comparisonWrapper.removeEventListener("mousemove", mouseComparisonMove);
    comparisonWrapper.removeEventListener("touchmove", touchComparisonMove);
  });
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

function tabelCost() {
  let input = this.previousElementSibling;
  if (input.checked) {
    return;
  } else {
    let thisId = this.getAttribute("for"),
      activeBlock = document.querySelector(".size-cost-block.active");
    activeBlock.classList.remove("active");
    let newActiveBlock = document.querySelector(`.${thisId}-tabel`);
    newActiveBlock.classList.add("active");
  }
}

function mobileTabelCost() {
  let input = this.previousElementSibling;
  if (input.checked) {
    return;
  } else {
    let thisId = this.getAttribute("data-for"),
      activeBlock = document.querySelector(".size-cost-block.active");
    activeBlock.classList.remove("active");
    let newActiveBlock = document.querySelector(`.${thisId}-tabel`);
    newActiveBlock.classList.add("active");
  }
}

// Cost Table Open End

// Order Section on/off ( Last form )

let order = document.querySelectorAll(".order_button");
let consult = document.querySelector(".consult");
let close = document.querySelector(".close");

for (let i = 0; i < order.length; i++) {
  order[i].addEventListener("click", showOrder);
}

function showOrder() {
  consult.style.display = "flex";
}

close.addEventListener("click", closeOrder);

function closeOrder() {
  consult.style.display = "none";
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
