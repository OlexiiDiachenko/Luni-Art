$(document).ready(function(){
function imageComparison(selector){
    let comparison = $(selector)
        .addClass('image-comparison')

    let images = comparison
        .find('img')
        .addClass('image-comparison_image')
        .css('max-width' , comparison.width());

    let before = comparison
        .find('.image-comparison_before')
        .append(images.eq(0))

    comparison
        .find('.image-comparison_slider')
        .on('dragstart' , () => false)
        .on('mousedown' , function (e) {
            let slider = $(this);

            let doc = $(document).on('mousemove' , (e) => {
                let offset = e.pageX - comparison.position().left;
                let width = comparison.width();

                if(offset < 0) offset = 0;
                if(offset > width) offset = width;

                slider.css('left' , offset + 'px');
                before.css('width' , offset + 'px');

            });

            doc.on('mouseup', () => doc.off('mousemove'));
        });
}

imageComparison('#image-comparison');
imageComparison('#image-comparison_down');

    $('.slider_photo').slick({
        slidesToShow:3,
        speed:1000,
        easing:'ease',
        draggable:false,
    });

    $('.slider_size').slick({
        dots:true,
        slidesToShow:2,
        speed:1000,
        easing:'ease',
        draggable:false,
    });

    $('.slider_video').slick({
        slidesToShow:3,
        speed:1000,
        easing:'ease',
        draggable:false,
    });
})

// Function for Material - Cost

let coal = document.querySelector('.coal input');
let coalLabel = document.querySelector('.coal label');
let coalPrice = document.querySelector('.choose-grid_coal')
let oil = document.querySelector('.oil input');
let oilLabel = document.querySelector('.oil label');
let oilPrice = document.querySelector('.choose-grid_oil')
let people = document.querySelectorAll('.humans-count-item');
let countPeople = 0;

if ( !coal.checked ){
    coalLabel.addEventListener('click' , coalTable);
}else{
    percentCost(coalPrice);
}

if ( !oil.checked ){
    oilLabel.addEventListener('click' , oilTable);
}

function coalTable(){
    coalPrice.classList.add('active_material');
    if(oilPrice.classList.contains('active_material')){
        oilPrice.classList.remove('active_material');
    }
    percentCost(coalPrice);
}

function oilTable(){
    coal.removeAttribute('checked');
    console.log(coal.getAttribute('checked'));
    oilPrice.classList.add('active_material');
    if(coalPrice.classList.contains('active_material')){
        coalPrice.classList.remove('active_material');
    }
    percentCost(oilPrice);
}

function percentCost(materialPercent) { 
    let size = materialPercent.querySelectorAll('.size_choose');
    for ( let i = 0 ; i < size.length ; i++ ){
        let cost = size[i].querySelector('.cost');
        let percent = size[i].querySelector('.percent');
        if ( percent == null ){
            continue;
        }else{
            percent.innerHTML = parseInt(cost.innerHTML) * 0.2 + '₴';
        }
    }
}

for ( let i = 0 ; i < people.length ; i++ ){
    people[i].nextElementSibling.addEventListener('click' , newCount);
}

function newCount() { 
    countPeople = this.previousElementSibling.getAttribute('data-count');
    console.log(countPeople);
    if ( !coal.checked ){
        newCost(oilPrice , countPeople);
    } else if ( !oil.checked ){
        newCost(coalPrice , countPeople);
    }
}

function newCost(tablePrice , count , costSize ) { 

    let arrCost = [];
    let NewCost = tablePrice.querySelectorAll('.size_choose');
    for ( let i = 0 ; i < NewCost.length ; i++ ){ 
        let a = NewCost[i];
        let cost = a.querySelector('.cost');
        if ( cost == null ){
            continue;
        }else{
            arrCost.push(parseInt(cost.innerHTML));
        }
    }
    console.log(arrCost);
 
    for ( let j = 0 ; j < NewCost.length ; j++ ){
        let cost = NewCost[j].querySelector('.cost');
        if( j == 0 ){
            if ( count > 2 ){
                NewCost[j].classList.add('unactive');
                cost.innerHTML = cost.innerHTML;
            }else{
                if ( NewCost[j].classList.contains('unactive') ){
                    NewCost[j].classList.remove('unactive')
                }
                cost.innerHTML = arrCost[j] + ((count-1) * 150);
            }
        }else if( j == 1 ){
            if ( count > 4 ){
                NewCost[j].classList.add('unactive');
                cost.innerHTML = cost.innerHTML;
            }else{
                if ( NewCost[j].classList.contains('unactive') ){
                    NewCost[j].classList.remove('unactive')
                }
                cost.innerHTML = arrCost[j] + ((count-1) * 200);
            }
        }else if( j == 2 ){
            if ( count > 6 ){
                NewCost[j].classList.add('unactive');
                cost.innerHTML = cost.innerHTML;
            }else{
                if ( NewCost[j].classList.contains('unactive') ){
                    NewCost[j].classList.remove('unactive')
                }
                cost.innerHTML = arrCost[j] + ((count-1) * 300);
            }
        }else if( j == 3 ){
            cost.innerHTML = arrCost[j] + ((count-1) * 400);
        }else if( j == 4 ){
            cost.innerHTML = arrCost[j] + ((count-1) * 500);
        }
    }
    let activeMaterial = document.querySelector('.active_material');
    percentCost(activeMaterial);
}

// Order Section on/off ( Last form )

let order = document.querySelectorAll('.order_button');
let consult = document.querySelector('.consult');
let close = document.querySelector('.close');

for ( let i = 0 ; i < order.length ; i++ ){ 
    order[i].addEventListener('click' , showOrder);
}

function showOrder() { 
    consult.style.animationName = 'show';
    consult.style.display = 'flex';
}

close.addEventListener('click' , closeOrder);

function closeOrder() { 
    consult.style.display = 'none'; 
}

// A little validate a form in order menu

const phone = document.querySelector('#phone');
const name = document.querySelector('#name');
let inputsConsult = document.querySelectorAll('.userInfo-input');

for ( let i = 0 ; i < inputsConsult.length ; i++ ){ 
    inputsConsult[i].addEventListener('blur' , validate);
    inputsConsult[i].addEventListener('input' , validate)
}

function validate() { 
    let lengthWrite = parseInt(this.value.length);
    let validateLength = this.getAttribute('data-length');
    if ( lengthWrite < validateLength ){
        this.style.borderBottom = '1px solid rgba(255 , 0 , 0 , 0.25)';
        if ( this.parentElement.classList.contains('valid') ){
            this.parentElement.classList.remove('valid');
        }
    }else{
        this.style.borderBottom = '1px solid rgba(0 , 255 , 0 , 0.25)';
        this.parentElement.classList.add('valid');
    }
}

phone.addEventListener('focus' , startNubmer);
phone.addEventListener('blur' , removeNubmer);

function startNubmer() { 
    if ( this.value.length > 4 ){
        this.value = this.value;
    }else{
        this.value = '+' + 380;
    }
}

function removeNubmer() { 
    if ( this.value == +380 ){
        this.value = '';
    } else { 
        this.value = this.value;
    }
}