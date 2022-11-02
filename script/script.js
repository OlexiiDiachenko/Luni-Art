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
  button.addEventListener("touchstart", mouseComparison);
});

function mouseComparison() {
  this.parentElement.addEventListener("mousemove", mouseComparisonMove);
  this.parentElement.addEventListener("touchmove", mouseComparisonMove);
  document.addEventListener("mouseup", removeComparison);
  document.addEventListener("touchcancel", removeComparison);
}

function mouseComparisonMove(event) {
  let comparisonBefore = this.querySelector(".image-comparison_before");
  let button = this.querySelector(".comparison-button");
  let left = event.pageX - this.offsetLeft;
  let width = this.clientWidth;
  if (left < 0) left = 0;
  if (left > width) left = width;
  button.style.left = `${left}px`;
  comparisonBefore.style.width = `${left}px`;
}

function removeComparison() {
  comparisonWrappers.forEach((comparisonWrapper) => {
    comparisonWrapper.removeEventListener("mousemove", mouseComparisonMove);
    comparisonWrapper.removeEventListener("touchmove", mouseComparisonMove);
  });
}

// Comparison End

// Cost Table Open

let materials = document.querySelectorAll(".card-label");

materials.forEach((material) => {
  material.addEventListener("click", tabelCost);
});

function tabelCost() {
  let input = this.previousElementSibling;
  if (input.checked) {
    return;
  } else {
    let thisId = this.getAttribute("for");
    let activeBlock = document.querySelector(".size-cost-block.active");
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

// Choose the massanger

let massangersImages = document.querySelectorAll(".massanger_images");

for (let i = 0; i < massangersImages.length; i++) {
  massangersImages[i].addEventListener("click", massangerChoose);
}

function massangerChoose() {
  for (let j = 0; j < massangersImages.length; j++) {
    if (!massangersImages[j].classList.contains("unactive_massanger")) {
      massangersImages[j].classList.add("unactive_massanger");
    } else {
      continue;
    }
  }
  if (this.classList.contains("unactive_massanger")) {
    this.classList.remove("unactive_massanger");
  }
}

// let imageComparison = document.querySelector("#image-comparison");
// let imageComparisonDown = document.querySelector("#image-comparison_down");
// let buttonComparison = document.querySelectorAll(".image-comparison_slider");

// buttonComparison.forEach((button) => {
//   button.addEventListener("touchmove", (evt) => {
//     let touches = evt.changedTouches;
//     let newLeft = getComputedStyle(imageComparison.parentElement).paddingLeft;
//     let width = parseFloat(getComputedStyle(imageComparison).width);
//     let offset = touches[0].clientX - parseFloat(newLeft);
//     if (offset >= width) {
//       offset = width;
//     }
//     if (offset < 0) offset = 0;
//     button.style.left = `${offset}px`;
//     button.addEventListener("touchend", () => {
//       let changeImage = button.parentElement.querySelector(
//         ".image-comparison_before"
//       );
//       let width = parseFloat(getComputedStyle(imageComparison).width);
//       let newWidth = width - parseFloat(getComputedStyle(changeImage).width);
//       changeImage.style.width = ` ${newWidth}px`;
//       console.log(width);
//     });
//   });
// });
