// Defining all button for all carousels on the webpage
const carouselBtns = document.querySelectorAll('[data-carousel-btn]')

// Touch controls 
let dragged = false;
let startX;
let x;
let widthToBeScrolled;
let animationId;
let currentIndex = 0;
const carouselItems = document.querySelectorAll('[data-carousel__item]');
const carousels = document.querySelectorAll('[data-carousel]');
let windowWidth = window.innerWidth;

// Disabling context menu + image drag

carouselItems.forEach(item => {
    const carouselImage = item.querySelector('img');
    if (carouselImage != null) {
        carouselImage.addEventListener('dragstart', (e) => e.preventDefault());
        item.oncontextmenu = function (event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    };
});

// Adding touch event listeners to each carousel on webpage

carousels.forEach(carousel => {
    carousel.addEventListener('touchstart', touchScrollStart, {passive: true});
    carousel.addEventListener('touchmove', touchScrollMove, {passive: true});
    carousel.addEventListener('touchend', touchScrollEnd, {passive: true});

    window.addEventListener('resize', () => {
        windowWidth = window.innerWidth;
        if (windowWidth <1024) {
            carousel.addEventListener('mousedown', touchScrollStart, {passive: true});
            carousel.addEventListener('mousemove', touchScrollMove, {passive: true});
            carousel.addEventListener('mouseup', touchScrollEnd, {passive: true});
            carousel.addEventListener('mouseleave', touchScrollEnd, {passive: true});
        } else {
            carousel.removeEventListener('mousedown', touchScrollStart, {passive: true});
            carousel.removeEventListener('mousemove', touchScrollMove, {passive: true});
            carousel.removeEventListener('mouseup', touchScrollEnd, {passive: true});
            carousel.removeEventListener('mouseleave', touchScrollEnd, {passive: true});
        }
    });
});

// Function to determine start position for carousel

function touchScrollStart (e) {
    
    let innerContainer = e.currentTarget.querySelector('[data-carousel__inner]');
    let outerContainer = e.currentTarget;
    dragged = true;
    startX = getPositionX(e) - innerContainer.offsetLeft;

    animationId = requestAnimationFrame(function () {
        touchScrollAnimation(innerContainer, outerContainer);
    })

}

function touchScrollMove (e) {
    if (!dragged) return;
    x = getPositionX(e);
    widthToBeScrolled = x - startX;
}

function touchScrollEnd () {
    dragged = false;
    cancelAnimationFrame(animationId);
}

function touchScrollAnimation(innerContainer, outerContainer) {
    innerContainer.style.left = `${widthToBeScrolled}px`;
    checkBoundary (outerContainer, innerContainer);
    if (dragged) {
        requestAnimationFrame(function() {
            touchScrollAnimation(innerContainer, outerContainer);
        });
    };
}


function checkBoundary (outerContainer, innerContainer) {
    let outer = outerContainer.getBoundingClientRect();
    let inner = innerContainer.getBoundingClientRect();

    if (parseInt(innerContainer.style.left) > 0) {
        innerContainer.style.left = `0px`;
    } else if (inner.right < outer.right) {
        innerContainer.style.left = `-${inner.width - outer.width}px`
    }
}

function getPositionX (event) {
    return event.type.includes('mouse') ? event.pageX : event.targetTouches[0].clientX;
}


// Button carousel controls 
carouselBtns.forEach(element => {
    element.addEventListener('click', changeImageByButton );
});

// Function to scroll images
function changeImageByButton (element) {
    // Gets the actual button pressed
    let button = element.currentTarget;
    // Offset to scroll to next or prev slide
    let offset = button.classList.contains('arrow-right') ? 1 : -1;
    changeImage(element, offset);
}

function changeImage (element, offset) {
        // Gets the parent container to have access to other DOM elements
        let container = element.currentTarget.closest('.container');
        // Carousel
        let innerContainer = container.querySelector('[data-carousel__inner]');
        innerContainer.style.transition = 'none';
        // Individual slides
        let carouselSlides = innerContainer.querySelectorAll('[data-carousel__item]');
        // Defining slide width for scroll animation
        const slideWidth = getSlideWidth(innerContainer, carouselSlides);
    
        // Slide to be shown the first
        const activeSlide = innerContainer.querySelector('[data-active]'); 

        // Index of the above slide
        let currentIndex = [...carouselSlides].indexOf(activeSlide);
        let newIndex = currentIndex + offset;

        // Check of indexes so it won't exceed/subceed amount of elements in nodelist

        if ((slideWidth)/windowWidth >= 0.40) {
            if (newIndex < 0 || newIndex >= carouselSlides.length) return;
        } else if (((slideWidth)/windowWidth >= 0.30) && ((slideWidth)/windowWidth < 0.40)) {
            if (newIndex < 0 || newIndex >= carouselSlides.length - 1) return;
        } else {
            if (newIndex < 0 || newIndex >= carouselSlides.length - 2) return;
        }
    
        // Change of the "active slide"
        carouselSlides[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
    
        // Calculation of widht to be moved
        let widthToBeMoved = -slideWidth * newIndex;


        innerContainer.style.transition = 'all 0.3s ease';
        innerContainer.style.transform = `translateX(${widthToBeMoved}px)`;
}

function getSlideWidth (innerContainer, carouselSlides) {
    let imageWidth = carouselSlides[0].clientWidth;

    // Defining gap between images
    let slideGap = window.getComputedStyle(innerContainer).getPropertyValue('gap');
    slideGap = parseInt(slideGap.replace(/\D/g,''));

    let slideWidth = imageWidth + slideGap;
    return slideWidth;
}

