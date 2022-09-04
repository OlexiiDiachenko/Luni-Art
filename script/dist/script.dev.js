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
    speed: 600,
    easing: 'ease',
    draggable: false
  });
  $('.slider_size').slick({
    dots: true,
    slidesToShow: 2,
    speed: 600,
    easing: 'ease',
    draggable: false
  });
  $('.slider_video').slick({
    slidesToShow: 3,
    speed: 600,
    easing: 'ease',
    draggable: false
  });
}); //Choose a material

var cardMaterial = document.querySelectorAll('.card');

for (var i = 0; i < cardMaterial.length; i++) {
  cardMaterial[i].addEventListener('mouseover', choose);
  cardMaterial[i].addEventListener('mouseout', popularAdd);
  cardMaterial[i].addEventListener('click', chooseClick);
}

function choose() {
  if (this.classList.contains('popular_material')) {
    this.classList.remove('popular_material');
  }
}

function popularAdd() {
  if (this.classList.contains('coal')) {
    this.classList.add('popular_material');
  }
}

function chooseClick() {
  for (var i = 0; i < cardMaterial.length; i++) {
    if (cardMaterial[i].querySelector('input').checked) {
      cardMaterial[i].classList.add('choose');
    } else {
      cardMaterial[i].classList.remove('choose');
    }
  }
} // Choose card size


var popular = document.querySelectorAll('.choose-item');
var popularLabel = document.querySelectorAll('.choose-label');

for (var i = 0; i < popular.length; i++) {
  popular[i].addEventListener('click', chooseSize); // if ( popular[i].parentElement.classList.contains('popular-size') ){
  //     popular[i].parentElement.addEventListener('mouseover' , popularUnactive);
  // }
}

function chooseSize() {
  if (this.type == "radio" && this.checked) {
    for (var j = 0; j < popularLabel.length; j++) {
      if (popularLabel[j].previousElementSibling.checked) {
        this.nextElementSibling.classList.remove('unactive');
      } else {
        popularLabel[j].classList.add('unactive');
      }
    }
  }
} // function popularUnactive() { 
//     this.classList.remove('popular-size');
//     this.addEventListener('mouseout' , popularActive);
// }
// function popularActive() { 
//     this.classList.add('popular-size');
// }
// Button for sent 


var buttonSent = document.querySelector('.send');
buttonSent.addEventListener('click', sendForm);

function sendForm() {
  this.innerHTML = '<img src="./images/checked.png" alt="" />';
  this.style.backgroundColor = 'var(--green-color)';
}