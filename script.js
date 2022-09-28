'use strict';
//global  variables
let productValue=0;
let productsInCart=0;
let price = 250.0
let discount = 0.5;
let lightboxGallery;
let lightboxHero;


/*******Mobile Menu ********/
 const menu = document.querySelector('.menu');
 const btnHamburger = document.querySelector('.hamburger');
 const bntMenuClose=document.getElementById('btnClose');
/****************************************/
const cart = document.querySelector('.cart');
const cartOpen = document.querySelector('.btnCart');

const btnMinus = document.getElementById('btnMinus');
const btnPlus = document.getElementById('btnPlus');
const productCounter = document.querySelector('.counter')
const gallery = document.querySelectorAll('.pic');

const defaultImage = document.getElementById('product-img');

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const btnAddCard = document.querySelector('.btn');
const cartCount = document.querySelector('.cart-count');
const productInShoppingCart = document.querySelector('.products-in-cart');

const msgEmpty = document.querySelector('.msg-empty');
const checkout = document.querySelector('.checkout');


const overlay = document.querySelector('.overlay');
const mainContent = document.querySelector('.main-content');



 //open mobile menu
 btnHamburger.addEventListener('click', onClick);

 function onClick () {
    menu.classList.remove('hidden');
 }

 //close mobile menu
bntMenuClose.addEventListener('click', closeMenu)
function closeMenu(){
   menu.classList.add('hidden');
}
/***********************************/

//Open card
cartOpen.addEventListener('click', displayCard)

function displayCard(){
   cart.classList.toggle('hidden');
}


/**************DISPLAY COUNTER***********/
btnMinus.addEventListener('click', counterMinus);
btnPlus.addEventListener('click', counterPlus);

function counterPlus () {
   setProductCounter(1);
}

function counterMinus () {
   setProductCounter(-1);
}

function setProductCounter(value){
 if((productValue+value)>=0){
   productValue+=value;
   productCounter.innerHTML=productValue;
 }
}
/******************************************/
gallery.forEach(img=>{
   img.addEventListener('click',onImgClick)
});

function onImgClick(e){
   //clear active class for all imgs
   gallery.forEach(img=>{
      img.classList.remove('active');
   })
   //set active class on target img
   e.target.parentElement.classList.add('active');

   //update default image
   defaultImage.src= e.target.src.replace('-thumbnail', '');
}


//display slider
prevBtn.addEventListener('click', handleprevBtn);
nextBtn.addEventListener('click', handlenextBtn);

function handlenextBtn(){
   let imgIndex=currentImgIndex();
   imgIndex++;
   if(imgIndex>4){
      imgIndex=1;
   }

   setDefaultImage(imgIndex);
}

function handleprevBtn(){
   let imgIndex=currentImgIndex();
   imgIndex--;
   if(imgIndex<1){
      imgIndex=4;
   }

   setDefaultImage(imgIndex);
}

function currentImgIndex(){
   const imageIndex=parseInt(defaultImage.src.split('/').pop().replace('.jpg', '').replace('image-product-', ''));
   return imageIndex;
}

function setDefaultImage(index){
  defaultImage.src=`./images/image-product-${index}.jpg`;
}

btnAddCard.addEventListener('click', addProductToCart)

function addProductToCart(){
   productsInCart+=productValue;

   const productHTMLElement =`
   <div class="item">
            <img class="product-img" src="./images/image-product-1-thumbnail.jpg" alt="product 1 thumb">
            <div class="details">
                <div class="product-name">Autumn Limited Edition...</div>
                <div class="price-group">
                    <div class="price">$${price*discount}</div> x
                    <div class="count">${productsInCart}</div>
                    <div class="total-amount">$${price*discount*productsInCart}</div>
                </div>
            </div>
            <img id="btnDelete" src="./images/icon-delete.svg" alt="icon delete">
        </div>  `;
        productInShoppingCart.innerHTML = productHTMLElement;
        const btnDelete= document.getElementById('btnDelete');
        btnDelete.addEventListener('click', deleteProduct);

   updateCart();
}

function updateCart() {
updateCartIcon();
updateMsgEmtpty();
updateCheckBtn();

}

function updateMsgEmtpty () {
   if(productsInCart===0){
      if(msgEmpty.classList.contains('hidden')){
         msgEmpty.classList.remove('hidden');
      }
   } else {
      if (!msgEmpty.classList.contains('hidden')){
         msgEmpty.classList.add('hidden');
      }
   }
}


function updateCheckBtn(){
   if(productsInCart===0){
      if(!checkout.classList.contains('hidden')){}
      checkout.classList.add('hidden');
   } else {
      checkout.classList.remove('hidden');
   }
}

function updateCartIcon(){
   cartCount.textContent=productsInCart;
   if (productsInCart == 0) {
      if (!cartCount.classList.contains('hidden')) {
          cartCount.classList.add('hidden');
      }
  } else {
      cartCount.classList.remove('hidden');
  }
}



function deleteProduct(){
   productsInCart--;
   updateCart();
    const el = document.querySelector('.count');
    const totalAmount = document.querySelector('.total-amount');
    el.innerHTML=productsInCart;
    totalAmount.innerHTML= `$${price*discount*productsInCart}`;

    if(productsInCart===0){
      productInShoppingCart.innerHTML='';
    }
}


defaultImage.addEventListener('click', displayModal);

function displayModal(){
   if(window.innerWidth>=1440){
      if(overlay.childElementCount===1){
   const newNode=mainContent.cloneNode(true);
   overlay.appendChild(newNode);
   

   const overlayClose=document.getElementById('btnOverlayClose');
   overlayClose.addEventListener('click', onClickClose);

   lightboxGallery = overlay.querySelectorAll('.pic');
   lightboxHero = overlay.querySelector('.product-hero');
   lightboxGallery.forEach(img => {
       img.addEventListener('click', onThumbClickLightbox);
   });

   const btnOverlayNext = overlay.querySelector('.next');
   const btnOverlayPrevious = overlay.querySelector('.prev');
   btnOverlayNext.addEventListener('click', handleBtnClickNextOverlay);
   btnOverlayPrevious.addEventListener('click', handleBtnClickPreviousOverlay);
}
overlay.classList.remove('hidden');
}
}

function onClickClose(){
   overlay.classList.add('hidden');
}


function onThumbClickLightbox(event) {
   //clear active state for all thumbnails
   lightboxGallery.forEach(img => {
       img.classList.remove('active');
   });
   //set active thumbnail
   event.target.parentElement.classList.add('active');
   //update hero image
   lightboxHero.src = event.target.src.replace('-thumbnail', '');
}


function handleBtnClickNextOverlay(){
   let imgIndex=currentOverlayImgIndex();
   imgIndex++;
   if(imgIndex>4){
      imgIndex=1;
   }

   setOverlayDefaultImage(imgIndex);
}

function handleBtnClickPreviousOverlay(){
   let imgIndex=currentOverlayImgIndex();
   imgIndex--;
   if(imgIndex<1){
      imgIndex=4;
   }

   setOverlayDefaultImage(imgIndex);
}

function currentOverlayImgIndex(){
   const imageIndex=parseInt(lightboxHero.src.split('/').pop().replace('.jpg', '').replace('image-product-', ''));
   return imageIndex;
}

function setOverlayDefaultImage(index){
  lightboxHero.src=`./images/image-product-${index}.jpg`;
}