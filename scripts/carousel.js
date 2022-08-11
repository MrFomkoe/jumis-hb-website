// Defining all button for all carousels on the webpage

const carouselItems = document.querySelectorAll('[data-carousel__item]');
const carousels = document.querySelectorAll('[data-carousel]');

// Checking window width
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


carousels.forEach(carousel => {
    let carouselProperties = {
        isDragging: false,
        startPos: 0,
        currentTranslate: 0,
        prevTranslate: 0,
        animationID: 0,
        currentIndex: 0,

        outerContainer: carousel,
        outterOffset: carousel.offsetLeft,
        innerContainer: carousel.querySelector("[data-carousel__inner]"),
        slides: Array.from(carousel.querySelectorAll('[data-carousel__item]')),
        slideWidth: function () {
            // Defining image width
            let imageWidth = this.slides[0].clientWidth;

            // Defining gap between images
            let slideGap = window.getComputedStyle(this.innerContainer).getPropertyValue('gap');
            slideGap = parseInt(slideGap.replace(/\D/g,''));
            
            // Defining and returning full width
            let slideWidth = imageWidth + slideGap;
            return slideWidth;
        },
    }
    console.log(carouselProperties.slides)
    const carouselBtns = carousel.closest('.container').querySelectorAll('[data-carousel-btn]')
    carouselBtns.forEach(btn => {
        btn.addEventListener('click', ()=> {
            changeImageByButton(btn, carouselProperties)
        });
    });

    // Touch events
    carousel.addEventListener('touchstart', (event) => {
        touchStart(event, carouselProperties);
    });
    carousel.addEventListener('touchmove', (event) => {
        touchMove(event, carouselProperties);
    });
    carousel.addEventListener('touchend', (event) => {
        touchEnd(event, carouselProperties);
    });

    // Mouse events
    carousel.addEventListener('mousedown', (event) => {
        touchStart(event, carouselProperties);
    });
    carousel.addEventListener('mousemove', (event) => {
        touchMove(event, carouselProperties);
    });
    carousel.addEventListener('mouseup', (event) => {
        touchEnd(event, carouselProperties);
    });

    window.addEventListener('resize', () => {
        setPositionByIndex(carouselProperties);
    });
});

function changeImageByButton (btn, carouselProperties) {
    let offset = btn.classList.contains('arrow-right') ? 1 : -1;
    carouselProperties.currentIndex = carouselProperties.currentIndex += offset;

    if (carouselProperties.currentIndex < 0) {
        carouselProperties.currentIndex = 0;
    }   else if (carouselProperties.currentIndex >= carouselProperties.slides.length - 1) {
        carouselProperties.currentIndex = carouselProperties.slides.length - 1;
    }

    setPositionByIndex(carouselProperties);
}

function touchStart(event, carouselProperties) {
    carouselProperties.startPos = getPositionX(event) - carouselProperties.outterOffset;
    carouselProperties.isDragging = true;
    carouselProperties.animationID = requestAnimationFrame(function() {
        scrollAnimation(carouselProperties)
    });
}

function touchMove (event, carouselProperties) {
    if (carouselProperties.isDragging) {
        const currentPosition = getPositionX(event) - carouselProperties.outterOffset;
        carouselProperties.currentTranslate = parseInt(carouselProperties.prevTranslate + currentPosition - carouselProperties.startPos);
    }
}

function touchEnd(event, carouselProperties) {
    cancelAnimationFrame(carouselProperties.animationID);
    carouselProperties.isDragging = false;
    
    const scrolledBy = carouselProperties.currentTranslate - carouselProperties.prevTranslate;
    carouselProperties.prevTranslate = carouselProperties.currentTranslate;
    

    carouselProperties.currentIndex = getCurrentIndex(carouselProperties, scrolledBy);
    setPositionByIndex(carouselProperties);
    
};

function getPositionX(event) {
    return event.type.includes('mouse') ? 
            event.pageX : 
            event.targetTouches[0].clientX;
}

function scrollAnimation(carouselProperties) {
    setCarouselPosition(carouselProperties);
    if (carouselProperties.isDragging) {
        requestAnimationFrame(function() {
            scrollAnimation(carouselProperties)
        });
    };
}

function setCarouselPosition(carouselProperties) {
    carouselProperties.innerContainer.style.transform = `translateX(${carouselProperties.currentTranslate}px)`;
}



function getCurrentIndex(carouselProperties, scrolledBy) {
    let slideWidth = carouselProperties.slideWidth();
    let offset =  Math.round(scrolledBy / -slideWidth);
    let newIndex = carouselProperties.currentIndex + offset;
    let imagesInViewport = Math.round(carouselProperties.outerContainer.getBoundingClientRect().width / slideWidth) - 1;

    if (newIndex < 0) {
        newIndex = 0;
    }   else if (newIndex >= carouselProperties.slides.length - imagesInViewport) {
        newIndex = carouselProperties.slides.length - imagesInViewport;
    }
    return newIndex; 
}

function setPositionByIndex(carouselProperties) {
    carouselProperties.currentTranslate = carouselProperties.currentIndex * - carouselProperties.slideWidth();
    carouselProperties.prevTranslate = carouselProperties.currentTranslate;
    setCarouselPosition(carouselProperties);
}