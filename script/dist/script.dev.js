"use strict";

$(document).ready(function () {
  function imageComparison(selector) {
    var comparison = $(selector).addClass('image-comparison').prepend('<div class="image-comparison_before"></div>').append('<button class="image-comparison_slider"></button>');
    var images = comparison.find('img').addClass('image-comparison_image').css('max-width', comparison.width());
    var before = comparison.find('.image-comparison_before').append(images.eq(0));
    comparison.find('.image-comparison_slider').on('dragstart', function () {
      return false;
    }).on('mousedown', function (e) {
      var slider = $(this);
      var doc = $(document).on('mousemove', function (e) {
        var offset = e.pageX - comparison.position().left;
        var width = comparison.width();
        if (offset < 0) offset = 0;
        if (offset > width) offset = width;
        slider.css('left', offset + 'px');
        before.css('width', offset + 'px');
      });
      doc.on('mouseup', function () {
        return doc.off('mousemove');
      });
    });
  }

  imageComparison('#image-comparison');
  imageComparison('#image-comparison_down');
  $('.slider_photo').slick({
    slidesToShow: 3,
    speed: 1000,
    easing: 'ease',
    draggable: false
  });
  $('.slider_size').slick({
    dots: true,
    slidesToShow: 2,
    speed: 1000,
    easing: 'ease',
    draggable: false
  });
  $('.slider_video').slick({
    slidesToShow: 3,
    speed: 1000,
    easing: 'ease',
    draggable: false
  });
}); // Function for Material - Cost

var coal = document.querySelector('.coal input');
var coalLabel = document.querySelector('.coal label');
var coalPrice = document.querySelector('.choose-grid_coal');
var oil = document.querySelector('.oil input');
var oilLabel = document.querySelector('.oil label');
var oilPrice = document.querySelector('.choose-grid_oil');
var defaultPrice = document.querySelector('.default');
var people = document.querySelectorAll('.humans-count-item');
var countPeople = 0;

if (!coal.checked) {
  coalLabel.addEventListener('click', coalTable);
}

if (!oil.checked) {
  oilLabel.addEventListener('click', oilTable);
}

function coalTable() {
  coalPrice.classList.add('active_material');

  if (defaultPrice.classList.contains('active_material')) {
    defaultPrice.classList.remove('active_material');
  }

  if (oilPrice.classList.contains('active_material')) {
    oilPrice.classList.remove('active_material');
  }

  percentCost(coalPrice);
}

function oilTable() {
  oilPrice.classList.add('active_material');

  if (defaultPrice.classList.contains('active_material')) {
    defaultPrice.classList.remove('active_material');
  }

  if (coalPrice.classList.contains('active_material')) {
    coalPrice.classList.remove('active_material');
  }

  percentCost(oilPrice);
}

function percentCost(materialPercent) {
  var size = materialPercent.querySelectorAll('.size_choose');

  for (var i = 0; i < size.length; i++) {
    var cost = size[i].querySelector('.cost');
    var percent = size[i].querySelector('.percent');

    if (percent == null) {
      continue;
    } else {
      percent.innerHTML = parseInt(cost.innerHTML) * 0.2 + '₴';
    }
  }
}

for (var i = 0; i < people.length; i++) {
  people[i].nextElementSibling.addEventListener('click', newCount);
}

function newCount() {
  countPeople = this.previousElementSibling.getAttribute('data-count');
  console.log(countPeople);

  if (!coal.checked) {
    newCost(oilPrice, countPeople);
  } else if (!oil.checked) {
    newCost(coalPrice, countPeople);
  }
}

function newCost(tablePrice, count, costSize) {
  var arrCost = [];
  var NewCost = tablePrice.querySelectorAll('.size_choose');

  for (var _i = 0; _i < NewCost.length; _i++) {
    var a = NewCost[_i];
    var cost = a.querySelector('.cost');

    if (cost == null) {
      continue;
    } else {
      arrCost.push(parseInt(cost.innerHTML));
    }
  }

  console.log(arrCost);

  for (var j = 0; j < NewCost.length; j++) {
    var _cost = NewCost[j].querySelector('.cost');

    if (j == 0) {
      if (count > 2) {
        NewCost[j].classList.add('unactive');
        _cost.innerHTML = _cost.innerHTML;
      } else {
        if (NewCost[j].classList.contains('unactive')) {
          NewCost[j].classList.remove('unactive');
        }

        _cost.innerHTML = arrCost[j] + (count - 1) * 150;
      }
    } else if (j == 1) {
      if (count > 4) {
        NewCost[j].classList.add('unactive');
        _cost.innerHTML = _cost.innerHTML;
      } else {
        if (NewCost[j].classList.contains('unactive')) {
          NewCost[j].classList.remove('unactive');
        }

        _cost.innerHTML = arrCost[j] + (count - 1) * 200;
      }
    } else if (j == 2) {
      if (count > 6) {
        NewCost[j].classList.add('unactive');
        _cost.innerHTML = _cost.innerHTML;
      } else {
        if (NewCost[j].classList.contains('unactive')) {
          NewCost[j].classList.remove('unactive');
        }

        _cost.innerHTML = arrCost[j] + (count - 1) * 300;
      }
    } else if (j == 3) {
      _cost.innerHTML = arrCost[j] + (count - 1) * 400;
    } else if (j == 4) {
      _cost.innerHTML = arrCost[j] + (count - 1) * 500;
    }
  }

  var activeMaterial = document.querySelector('.active_material');
  percentCost(activeMaterial);
} // Order Section on/off ( Last form )


var order = document.querySelectorAll('.order_button');
var consult = document.querySelector('.consult');
var close = document.querySelector('.close');

for (var _i2 = 0; _i2 < order.length; _i2++) {
  order[_i2].addEventListener('click', showOrder);
}

function showOrder() {
  consult.style.animationName = 'show';
  consult.style.display = 'flex';
}

close.addEventListener('click', closeOrder);

function closeOrder() {
  consult.style.display = 'none';
} // A little validate a form in order menu


var phone = document.querySelector('#phone');
var name = document.querySelector('#name');
var inputsConsult = document.querySelectorAll('.userInfo-input');

for (var _i3 = 0; _i3 < inputsConsult.length; _i3++) {
  inputsConsult[_i3].addEventListener('blur', validate);

  inputsConsult[_i3].addEventListener('input', validate);
}

function validate() {
  var lengthWrite = parseInt(this.value.length);
  var validateLength = this.getAttribute('data-length');

  if (lengthWrite < validateLength) {
    this.style.borderBottom = '1px solid rgba(255 , 0 , 0 , 0.25)';

    if (this.parentElement.classList.contains('valid')) {
      this.parentElement.classList.remove('valid');
    }
  } else {
    this.style.borderBottom = '1px solid rgba(0 , 255 , 0 , 0.25)';
    this.parentElement.classList.add('valid');
  }
}

phone.addEventListener('focus', startNubmer);
phone.addEventListener('blur', removeNubmer);

function startNubmer() {
  if (this.value.length > 4) {
    this.value = this.value;
  } else {
    this.value = '+' + 380;
  }
}

function removeNubmer() {
  if (this.value == +380) {
    this.value = '';
  } else {
    this.value = this.value;
  }
}