// Defining all button for all carousels on the webpage
const carouselBtns = document.querySelectorAll('[data-carousel-btn]')

// Touch controls 
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationId;
let currentIndex = 0;
const carouselItems = document.querySelectorAll('[data-carousel__item]');






carouselItems.forEach(item => {
    // Disable context menu 
    const carouselImage = item.querySelector('img');
    if (carouselImage != null) {
        carouselImage.addEventListener('dragstart', (e) => e.preventDefault());
        item.oncontextmenu = function (event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    };

    item.addEventListener('touchstart', touchStart);
    item.addEventListener('touchend', touchEnd);
    item.addEventListener('touchmove', touchMove);
});

function touchStart (event) {
    // Carousel
    let carouselContainer = event.currentTarget.closest('[data-carousel]');
    // Individual slides
    let carouselSlides = Array.from(carouselContainer.querySelectorAll('[data-carousel__item]'));
    currentIndex = getCurrentIndex(event, carouselSlides);
    startPosition = getPositionX(event, carouselContainer);
    isDragging = true;

    animationId = requestAnimationFrame(function () {
            animation(carouselContainer);
    });
}

function animation (carouselContainer) {
    setSliderPosition(carouselContainer);
    if (isDragging) {
        requestAnimationFrame(function () {
            animation(carouselContainer)
        })
    };
}

function touchEnd (event) {
    // Carousel
    let carouselContainer = event.currentTarget.closest('[data-carousel]');
    // Individual slides
    let carouselSlides = Array.from(carouselContainer.querySelectorAll('[data-carousel__item]'));

    isDragging = false;
    cancelAnimationFrame(animationId);
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy <-100 && currentIndex < carouselSlides.length - 1) {
        currentIndex += 1;
    }

    if (movedBy > 100 && currentIndex >  0 ) {
        currentIndex -= 1;
    }

    setPositionByAfterTouch (carouselSlides, carouselContainer);
}

function touchMove (event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPosition;
    }
}

function getPositionX (event) {
    return event.touches[0].clientX;
}

function setSliderPosition(carouselContainer) {
    carouselContainer.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByAfterTouch (carouselSlides, carouselContainer) {
    const slideWidth = carouselSlides[0].clientWidth;
    currentTranslate = currentIndex * -slideWidth;
    prevTranslate = currentTranslate;
    setSliderPosition(carouselContainer);
}