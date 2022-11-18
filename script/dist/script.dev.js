"use strict";

$(document).ready(function () {
  function imageComparison(selector) {
    var comparison = $(selector).addClass("image-comparison");
    var images = comparison
      .find("img")
      .addClass("image-comparison_image")
      .css("max-width", comparison.width());
    var before = comparison
      .find(".image-comparison_before")
      .append(images.eq(0));
    comparison
      .find(".image-comparison_slider")
      .on("dragstart", function () {
        return false;
      })
      .on("mousedown", function (e) {
        var slider = $(this);
        var doc = $(document).on("mousemove", function (e) {
          var offset = e.pageX - comparison.position().left;
          var width = comparison.width();
          if (offset < 0) offset = 0;
          if (offset > width) offset = width;
          slider.css("left", offset + "px");
          before.css("width", offset + "px");
        });
        doc.on("mouseup", function () {
          return doc.off("mousemove");
        });
      });
  }

  imageComparison("#image-comparison");
  imageComparison("#image-comparison_down");
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
}); // Function for Material Cost

var coal = document.querySelector(".coal input");
var coalLabel = document.querySelector(".coal label");
var coalPrice = document.querySelector(".choose-grid_coal");
var oil = document.querySelector(".oil input");
var oilLabel = document.querySelector(".oil label");
var oilPrice = document.querySelector(".choose-grid_oil");
var people = document.querySelectorAll(".humans-count-item");
var peopleChoose = document.querySelectorAll(".humans-count-label");
var totalCountPeople = 1;
var arrCoalCost = [];
var arrOilCost = [];
coalPrice.classList.add("active_material");
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

for (var _i = 0; _i < peopleChoose.length; _i++) {
  peopleChoose[_i].addEventListener("click", newCount);
}

function newCount() {
  var countPeople = this.previousElementSibling.getAttribute("data-count");

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
} // Function for reading a count people.

function peopleCount() {
  // Array with a peoples ( green peoples on website. ) Our radioinputs
  for (i = 0; i < people.length; i++) {
    // If we found a people, who has checked status, we need get his Number, our data-count
    if (people[i].checked) {
      totalCountPeople = people[i].getAttribute("data-count"); // Else , we checked next
    } else {
      continue;
    }
  }
}

function percentCost(materialPercent) {
  var size = materialPercent.querySelectorAll(".size_choose");

  for (var _i2 = 0; _i2 < size.length; _i2++) {
    var cost = size[_i2].querySelector(".cost");

    var percent = size[_i2].querySelector(".percent");

    if (percent == null) {
      continue;
    } else {
      percent.innerHTML = parseInt(cost.innerHTML) * 0.2 + "₴";
    }
  }
}

function newCost(tablePrice, count, arrCost) {
  var NewCost = tablePrice.querySelectorAll(".size_choose");

  for (var _i3 = 0; _i3 < NewCost.length; _i3++) {
    var a = NewCost[_i3];
    var cost = a.querySelector(".cost");

    if (cost == null) {
      continue;
    } else {
      arrCost.push(parseInt(cost.innerHTML));

      if (arrCost.length > 5) {
        arrCost.pop();
      }
    }
  }

  for (var j = 0; j < NewCost.length; j++) {
    var _cost = NewCost[j].querySelector(".cost");

    if (j == 0) {
      if (count > 2) {
        NewCost[j].classList.add("unactive");
        _cost.innerHTML = _cost.innerHTML;
      } else {
        if (NewCost[j].classList.contains("unactive")) {
          NewCost[j].classList.remove("unactive");
        }

        _cost.innerHTML = arrCost[j] + (count - 1) * 150;
      }
    } else if (j == 1) {
      if (count > 4) {
        NewCost[j].classList.add("unactive");
        _cost.innerHTML = _cost.innerHTML;
      } else {
        if (NewCost[j].classList.contains("unactive")) {
          NewCost[j].classList.remove("unactive");
        }

        _cost.innerHTML = arrCost[j] + (count - 1) * 200;
      }
    } else if (j == 2) {
      if (count > 6) {
        NewCost[j].classList.add("unactive");
        _cost.innerHTML = _cost.innerHTML;
      } else {
        if (NewCost[j].classList.contains("unactive")) {
          NewCost[j].classList.remove("unactive");
        }

        _cost.innerHTML = arrCost[j] + (count - 1) * 300;
      }
    } else if (j == 3) {
      _cost.innerHTML = arrCost[j] + (count - 1) * 400;
    } else if (j == 4) {
      _cost.innerHTML = arrCost[j] + (count - 1) * 500;
    }
  }

  var activeMaterial = document.querySelector(".active_material");
  percentCost(activeMaterial);
} // Order Section on/off ( Last form )

var order = document.querySelectorAll(".order_button");
var consult = document.querySelector(".consult");
var close = document.querySelector(".close");

for (var _i4 = 0; _i4 < order.length; _i4++) {
  order[_i4].addEventListener("click", showOrder);
}

function showOrder() {
  consult.style.display = "flex";
}

close.addEventListener("click", closeOrder);

function closeOrder() {
  consult.style.display = "none";
} // A little validate a form in order menu

var phone = document.querySelector("#phone");
var name = document.querySelector("#name");
var inputsConsult = document.querySelectorAll(".userInfo-input");

for (var _i5 = 0; _i5 < inputsConsult.length; _i5++) {
  inputsConsult[_i5].addEventListener("blur", validate);

  inputsConsult[_i5].addEventListener("input", validate);
}

function validate() {
  var lengthWrite = parseInt(this.value.length);
  var validateLength = this.getAttribute("data-length");

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
} // Choose the messenger

var messengersImages = document.querySelectorAll(".messenger_images");

for (var _i6 = 0; _i6 < messengersImages.length; _i6++) {
  messengersImages[_i6].addEventListener("click", messengerChoose);
}

function messengerChoose() {
  for (var j = 0; j < messengersImages.length; j++) {
    if (!messengersImages[j].classList.contains("unactive_messenger")) {
      messengersImages[j].classList.add("unactive_messenger");
    } else {
      continue;
    }
  }

  if (this.classList.contains("unactive_messenger")) {
    this.classList.remove("unactive_messenger");
  }
}
