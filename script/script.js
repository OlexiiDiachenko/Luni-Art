$(document).ready(function () {
  $(".slider_photo").slick({
    slidesToShow: 3,
    speed: 1000,
    easing: "ease",
    draggable: false,
  });

  $(".slider_size").slick({
    dots: true,
    slidesToShow: 2,
    speed: 1000,
    easing: "ease",
    draggable: false,
  });

  $(".slider_video").slick({
    slidesToShow: 3,
    speed: 1000,
    easing: "ease",
    draggable: false,
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

// Function for Material Cost

let coal = document.querySelector(".coal input");
let coalLabel = document.querySelector(".coal label");
let coalPrice = document.querySelector(".choose-grid_coal");
let oil = document.querySelector(".oil input");
let oilLabel = document.querySelector(".oil label");
let oilPrice = document.querySelector(".choose-grid_oil");
let people = document.querySelectorAll(".humans-count-item");
let peopleChoose = document.querySelectorAll(".humans-count-label");
let totalCountPeople = 1;
let arrCoalCost = [];
let arrOilCost = [];

coalPrice.classList.add("active_material");
// coal.checked = true;
percentCost(coalPrice);

if (!coal.checked) {
  coalLabel.addEventListener("click", coalTable);
} else {
  percentCost(coalPrice);
}

if (!oil.checked) {
  oilLabel.addEventListener("click", oilTable);
} else {
  percentCost(oilPrice);
}

for (let i = 0; i < peopleChoose.length; i++) {
  peopleChoose[i].addEventListener("click", newCount);
}

function newCount() {
  let countPeople = this.previousElementSibling.getAttribute("data-count");
  if (coal.checked) {
    newCost(coalPrice, countPeople, arrCoalCost);
  }

  if (oil.checked) {
    newCost(oilPrice, countPeople, arrOilCost);
  }
}

function coalTable() {
  coalPrice.classList.add("active_material");
  if (oilPrice.classList.contains("active_material")) {
    oilPrice.classList.remove("active_material");
  }
  peopleCount();

  newCost(coalPrice, totalCountPeople, arrCoalCost);
  percentCost(coalPrice);
}

function oilTable() {
  coal.removeAttribute("checked");
  oilPrice.classList.add("active_material");
  if (coalPrice.classList.contains("active_material")) {
    coalPrice.classList.remove("active_material");
  }
  peopleCount();
  newCost(oilPrice, totalCountPeople, arrOilCost);
  percentCost(oilPrice);
}

// Function for reading a count people.
function peopleCount() {
  // Array with a peoples ( green peoples on website. ) Our radioinputs

  for (i = 0; i < people.length; i++) {
    // If we found a people, who has checked status, we need get his Number, our data-count

    if (people[i].checked) {
      totalCountPeople = people[i].getAttribute("data-count");

      // Else , we checked next
    } else {
      continue;
    }
  }
}

function percentCost(materialPercent) {
  let size = materialPercent.querySelectorAll(".size_choose");
  for (let i = 0; i < size.length; i++) {
    let cost = size[i].querySelector(".cost");
    let percent = size[i].querySelector(".percent");
    if (percent == null) {
      continue;
    } else {
      percent.innerHTML = parseInt(cost.innerHTML) * 0.2 + "₴";
    }
  }
}

function newCost(tablePrice, count, arrCost) {
  let NewCost = tablePrice.querySelectorAll(".size_choose");
  for (let i = 0; i < NewCost.length; i++) {
    let a = NewCost[i];
    let cost = a.querySelector(".cost");
    if (cost == null) {
      continue;
    } else {
      arrCost.push(parseInt(cost.innerHTML));
      if (arrCost.length > 5) {
        arrCost.pop();
      }
    }
  }

  for (let j = 0; j < NewCost.length; j++) {
    let cost = NewCost[j].querySelector(".cost");
    if (j == 0) {
      if (count > 2) {
        NewCost[j].classList.add("unactive");
        cost.innerHTML = cost.innerHTML;
      } else {
        if (NewCost[j].classList.contains("unactive")) {
          NewCost[j].classList.remove("unactive");
        }
        cost.innerHTML = arrCost[j] + (count - 1) * 150;
      }
    } else if (j == 1) {
      if (count > 4) {
        NewCost[j].classList.add("unactive");
        cost.innerHTML = cost.innerHTML;
      } else {
        if (NewCost[j].classList.contains("unactive")) {
          NewCost[j].classList.remove("unactive");
        }
        cost.innerHTML = arrCost[j] + (count - 1) * 200;
      }
    } else if (j == 2) {
      if (count > 6) {
        NewCost[j].classList.add("unactive");
        cost.innerHTML = cost.innerHTML;
      } else {
        if (NewCost[j].classList.contains("unactive")) {
          NewCost[j].classList.remove("unactive");
        }
        cost.innerHTML = arrCost[j] + (count - 1) * 300;
      }
    } else if (j == 3) {
      cost.innerHTML = arrCost[j] + (count - 1) * 400;
    } else if (j == 4) {
      cost.innerHTML = arrCost[j] + (count - 1) * 500;
    }
  }
  let activeMaterial = document.querySelector(".active_material");
  percentCost(activeMaterial);
}

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
