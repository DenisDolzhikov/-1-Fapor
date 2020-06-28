"use strict";

/* Sticky nav */
let stickyNav = document.querySelector('.top-nav');

if (window.scrollY > 120) {
    stickyNav.classList.add('scroll');
}

function onScroll() {
    window.addEventListener('scroll', callbackFunc);

    function callbackFunc() {
        if (window.matchMedia("(min-width: 1024px)").matches) {
            let y = window.pageYOffset;

            if (y > 120) {
                stickyNav.classList.add('scroll');
                stickyNav.style.transition = '0.5s';
            } else {
                stickyNav.classList.remove('scroll');
            }
        }
    }
}

window.onload = function() {
    onScroll();

    /* Preloader */
    document.body.classList.add('loaded');
  
};


/* Overlay nav */
function openOverlayNav() {
    document.getElementById('overlayNav').style.height = '100%';
}

function closeOverlayNav() {
    document.getElementById('overlayNav').style.height = '0%';
}


/* Sliders */

let headerSliderSelector = document.querySelector('.header-slider');
let headerSlider = new Flickity(headerSliderSelector, {
    cellAlign: 'left',
    contain: true,
    autoPlay: 5000
});

let worksSliderSelector = document.querySelector('.works-slider');
let worksSlider = new Flickity(worksSliderSelector, {
    cellAlign: 'left',
    contain: true,
    draggable: true,
});

let worksSliderMobileSelector = document.querySelector('.works-slider-mobile');
let worksSliderMobile = new Flickity(worksSliderMobileSelector, {
    cellAlign: 'left',
    contain: true,
    draggable: true,
});

let ourTeamListSliderSelector = document.querySelector('.our-team-slider');
let ourTeamListSlider = new Flickity(ourTeamListSliderSelector, {
    cellAlign: true,
    draggable: true,
});

let featuresSliderSelector = document.querySelector('.features-slider');
let featuresSlider = new Flickity(featuresSliderSelector, {
    cellAlign: true,
    draggable: true,
});

let recognitionSliderSelector = document.querySelector('.recognition-slider');
let recognitionSlider = new Flickity(recognitionSliderSelector, {
    cellAlign: true,
    draggable: true,
});

/* Animations */

// Header animations
headerSlider.on( 'select', function(index) {
  if (index == 1) {

      let headerText = document.getElementsByClassName('slide-text2');
      for (let i = 0; i < headerText.length; i++) {
          headerText[i].style.visibility = "visible";
          headerText[i].classList.add('animate__fadeInRight');
      }
  } else if (index == 2) {

      let headerText = document.getElementsByClassName('slide-text3');
      for (let i = 0; i < headerText.length; i++) {
          headerText[i].style.visibility = "visible";
          headerText[i].classList.add('animate__fadeInRight');
      }
  } else if (index == 3) {
    
        let headerText = document.getElementsByClassName('slide-text4');
        for (let i = 0; i < headerText.length; i++) {
          headerText[i].style.visibility = "visible";
            headerText[i].classList.add('animate__fadeInRight');
        }
  }
});


/* Tabs */
function openTab(event, tabName) {

    let tabContentItems = document.getElementsByClassName('works-tab-content-cell');
    for (let i = 0; i < tabContentItems.length; i++) {
        tabContentItems[i].style.display = 'none';
    }

    let tabLinksItems = document.getElementsByClassName('works-tab-links-item');
    for (let i = 0; i < tabLinksItems.length; i++) {
        tabLinksItems[i].className = tabLinksItems[i].className.replace(' active', '');
    }

    document.getElementById(tabName).style.display = 'block';
    event.currentTarget.className += ' active';
}

document.getElementById('defaultOpen').click();


// Modal boxes

let currentlyOpenModals = [];

const noModalsOpen = () => !currentlyOpenModals.length;

const openModal = modalId => {
  const modalWrapper = document.getElementById(modalId);
  modalWrapper.classList.add("visible");
  currentlyOpenModals.push(modalWrapper);
};

// By definition, it's always the topmost modal that will be closed first
const closeTopmostModal = () => {
  if (noModalsOpen()) {
    return;
  }

  const modalWrapper = currentlyOpenModals[currentlyOpenModals.length - 1];
  modalWrapper.classList.remove("visible");
  currentlyOpenModals.pop();
};

const modalTriggers = document.querySelectorAll(".modal-trigger");
modalTriggers.forEach(modalTrigger => {
  modalTrigger.addEventListener("click", clickEvent => {
    const trigger = clickEvent.target;
    const modalId = trigger.getAttribute("data-modal-id");
    openModal(modalId);
  });
});

// Otherwise, clicking the content of a modal will propagate the click to the modal wrapper,
// and that will close the entire thing. That's not what we want!
document.querySelectorAll(".modal-box-window").forEach(modal => {
  modal.addEventListener("click", clickEvent => {
    clickEvent.stopPropagation();
  });
});

const modalWrappers = document.querySelectorAll(".modal-box-wrapper");
modalWrappers.forEach(modalWrapper => {
  modalWrapper.addEventListener("click", () => {
    closeTopmostModal();
  });
});

document.querySelectorAll(".close-modal-button").forEach(closeModalButton => {
  closeModalButton.addEventListener("click", () => {
    closeTopmostModal();
  });
});

document.body.addEventListener("keyup", keyEvent => {
  if (keyEvent.key === "Escape") {
    closeTopmostModal();
  }
});


// Blured images by lazy load
if (window.addEventListener && window.requestAnimationFrame && document.getElementsByClassName) window.addEventListener('load', function() {

    // start
    var pItem = document.getElementsByClassName('progressive replace'), timer;
  
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', scroller, false);
    inView();
  
  
    // throttled scroll/resize
    function scroller(e) {

        timer = timer || setTimeout(function() {
            timer = null;
            requestAnimationFrame(inView);
        }, 300);
    }
  
  
    // image in view?
    function inView() {
  
        var wT = window.pageYOffset, wB = wT + window.innerHeight, cRect, pT, pB, p = 0;

        while (p < pItem.length) {
            cRect = pItem[p].getBoundingClientRect();
            pT = wT + cRect.top;
            pB = pT + cRect.height;
    
            if (wT < pB && wB > pT) {
                loadFullImage(pItem[p]);
                pItem[p].classList.remove('replace');
            }
            else p++;
        }
    }
  
    
    // replace with full image
    function loadFullImage(item) {

        if (!item || !item.href) return;

        // load image
        var img = new Image();
        if (item.dataset) {
            img.srcset = item.dataset.srcset || '';
            img.sizes = item.dataset.sizes || '';
        }
        img.src = item.href;
        img.className = 'reveal';
        if (img.complete) addImg();
        else img.onload = addImg;
    
        // replace image
        function addImg() {
    
            // disable click
            item.addEventListener('click', function(e) { e.preventDefault(); }, false);

            // add full image
            item.appendChild(img).addEventListener('animationend', function(e) {
                // remove preview image
                var pImg = item.querySelector && item.querySelector('img.preview');
                if (pImg) {
                    e.target.alt = pImg.alt || '';
                    item.removeChild(pImg);
                    e.target.classList.remove('reveal');
                }
            });
        }
    }

}, false);


//Check observer API by Lozad js
const observer = lozad();
observer.observe();


//Animated numbers

$('.dynamicNumber').dynamicNumber();

let target1 = $('.number1');
let targetPos1 = target1.offset().top;
let winHeight1 = $(window).height();
let scrollToElem1 = targetPos1 - winHeight1;
$(window).scroll(function(){
  let winScrollTop1 = $(this).scrollTop();
    if (winScrollTop1 > scrollToElem1) {
      //Will work when the user scrolls to number 1
      $('.number1').dynamicNumber('start');
    }
});

let target2 = $('.number2');
let targetPos2 = target2.offset().top;
let winHeight2 = $(window).height();
let scrollToElem2 = targetPos2 - winHeight2;
$(window).scroll(function() {
    let winScrollTop2 = $(this).scrollTop();
    if (winScrollTop2 > scrollToElem2) {
      // Will work when the user scrolls to number2
      $('.number2').dynamicNumber('start');
    }
});

let target3 = $('.number3');
let targetPos3 = target3.offset().top;
let winHeight3 = $(window).height();
let scrollToElem3 = targetPos3 - winHeight3;
$(window).scroll(function(){
  var winScrollTop3 = $(this).scrollTop();
  if (winScrollTop3 > scrollToElem3) {
    // Will work when the user scrolls to number3
    $('.number3').dynamicNumber('start');
  }
});


