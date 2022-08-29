// Slider

let slideLeft = document.querySelector('#slideLeft');
let slideRight = document.querySelector('#slideRight');

let content = document.querySelector('#sliderContent');
let cells = document.querySelectorAll('.sliderCell');

let left = 0;

let sliderLength = (cells.length-3) * 300;

slideRight.addEventListener('click' , slideToRight);
slideLeft.addEventListener('click' , slideToLeft);

function slideToRight() {
    left -= 330;
    if (left < -sliderLength ){
        left = 0;
    }
    content.style.left = left + 'px';
}

function slideToLeft() {
    left += 330;
    if ( left > 0 ){
        left = 0;
    }
    content.style.left = left + 'px';
}

//Choose a material

let material = document.querySelectorAll('.card');
let inputMaterial = document.querySelector('.choose-material-accept');

for ( var i = 0 ; i < material.length ; i++ ){
    material[i].addEventListener('mouseover' , choose);
    material[i].addEventListener('mouseout' , popularAdd);
    material[i].addEventListener('click' , chooseClick);
}

function choose() { 
    if( this.classList.contains('popular_material') ){
        this.classList.remove('popular_material');
    }
}

function popularAdd() { 
    if ( this.classList.contains('coal') ){
        this.classList.add('popular_material');
    }
}

function chooseClick(){
    var inside = this.classList.contains('choose');
    for ( var j = 0 ; j < material.length ; j++ ){
        if(inside){
            return;
        }else if ( inside == false ){
            if ( material[j].classList.contains('choose') ){
                material[j].classList.toggle('choose');
            }else{
                this.classList.add('choose');
            }
        }
    }
    let chooseMaterial = document.querySelector('.choose');
    inputMaterial.value = chooseMaterial.querySelector('p').innerHTML;
}

// Choose card size

var popular = document.querySelectorAll('.choose-item');
var popularLabel = document.querySelectorAll('.choose-label')

for ( var i = 0 ; i < popular.length ; i++ ){
    popular[i].addEventListener('click' , chooseSize);
    if ( popular[i].parentElement.classList.contains('popular-size') ){
        popular[i].parentElement.addEventListener('mouseover' , popularUnactive);
    }
}

function chooseSize() {
    if (this.type == "radio" && this.checked) {
        for ( var j = 0 ; j < popularLabel.length ; j++ ){
            if ( popularLabel[j].previousElementSibling.checked ) { 
                this.nextElementSibling.classList.remove('unactive');
            }else{
                popularLabel[j].classList.add('unactive');
            }
        } 
    }
}

function popularUnactive() { 
    this.classList.remove('popular-size');
    this.addEventListener('mouseout' , popularActive);
}

function popularActive() { 
    this.classList.add('popular-size');
}

// Button for sent 

let buttonSent = document.querySelector('.send');

buttonSent.addEventListener('click', sendForm);

function sendForm() {
    this.innerHTML = '<img src="./images/checked.png" alt="" />';
    this.style.backgroundColor = 'var(--green-color)';
}