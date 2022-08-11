// Defining all button for all carousels on the webpage

const carouselItems = document.querySelectorAll('[data-carousel__item]');
const carousels = document.querySelectorAll('[data-carousel]');



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

class properties {
    constructor (isDragging, startPos, currentTranslate, prevTranslate, animationID, currentIndex, outerContainer, outerOffset, innerContainer, slides) {
        this.isDragging = isDragging;
        this.startPos = startPos;
        this.currentTranslate = currentTranslate;
        this.prevTranslate = prevTranslate;
        this.animationID = animationID;
        this.currentIndex = currentIndex;
        this.outerContainer = outerContainer;
        this.outerOffset = outerOffset;
        this.innerContainer = innerContainer;
        this.slides = slides;
        this.slideWidth = this.getSlideWidth(slides);
    }
    getSlideWidth(slides) {
        // Defining image width
        let imageWidth = slides[0].clientWidth;

        // Defining gap between images
        let slideGap = window.getComputedStyle(this.innerContainer).getPropertyValue('gap');
        slideGap = parseInt(slideGap.replace(/\D/g,''));
        
        // Defining and returning full width
        let slideWidth = imageWidth + slideGap;
        return slideWidth;
    }
}


carousels.forEach(carousel => {
    let carouselProperties = new properties (
        false, // isDragging
        0, // startPos
        0, // currentTranslate
        0, // prevTranslate
        0, // animationID
        0, // currentIndex
        carousel, // outerContainer
        carousel.offsetLeft, // outerOffset
        carousel.querySelector("[data-carousel__inner]"), // innerContainer
        Array.from(carousel.querySelectorAll('[data-carousel__item]')), // slides
    )



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


    window.addEventListener('resize', () => {
        setPositionByIndex(carouselProperties);
        
    });

    // Settings for fullscreen image selector
    const photosToFullscreen = Array.from(carousel.querySelectorAll('[data-fullsreen-photo]')); 
    photosToFullscreen.forEach((item, index) => {
        item.addEventListener('click', () => {
            openModal(item, index, carouselProperties)
        });
    });
});



function openModal (item, index) {
    
        const container = item.closest('[data-carousel]').cloneNode(true);
        const fullsreenModal = document.querySelector('.modal__fullscreen');
        const closeBtn = fullsreenModal.querySelector('.modal__close');

        let carouselProperties = new properties (
            false, // isDragging
            0, // startPos
            0, // currentTranslate
            0, // prevTranslate
            0, // animationID
            0, // currentIndex
            container, // outerContainer
            container.offsetLeft, // outterOffset
            container.querySelector("[data-carousel__inner]"), // innerContainer
            Array.from(container.querySelectorAll('[data-carousel__item]')), // slides
        )
        carouselProperties.currentIndex = index;

        let currentPhotos = carouselProperties.slides;
        let innerContainer = carouselProperties.innerContainer;
        innerContainer.style.transition = 'none';

    
        fullsreenModal.appendChild(container);
        fullsreenModal.classList.add('modal__fullscreen--active');


        // Check whether the pressed image is with grid display settings
        if (innerContainer.classList.contains('portfolio__images__inner')) {
            innerContainer.classList.remove('portfolio__images__inner');
            innerContainer.classList.add('photo-carousel');
            container.classList.remove('portfolio__images')
            currentPhotos.forEach(photo => {
                photo.classList.remove('portfolio__item');
                photo.classList.add('photo-carousel__item');
            });
        };

        setPositionByIndex(carouselProperties);
        setTimeout(() => {
            innerContainer.style.transition = 'transform 0.2s ease-out';
        }, 300);

        // Touch events
        innerContainer.addEventListener('touchstart', (event) => {
            touchStart(event, carouselProperties);
        });
        innerContainer.addEventListener('touchmove', (event) => {
            touchMove(event, carouselProperties);
        });
        innerContainer.addEventListener('touchend', (event) => {
            touchEnd(event, carouselProperties);
        });

        const carouselBtns = innerContainer.closest('.container').querySelectorAll('[data-carousel-btn]')
        carouselBtns.forEach(btn => {
        btn.addEventListener('click', ()=> {
            changeImageByButton(btn, carouselProperties)
        });
    });

        closeBtn.addEventListener('click', () => {
            fullsreenModal.classList.remove('modal__fullscreen--active');
            container.remove();
        });
        
}

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
    carouselProperties.startPos = getPositionX(event) - carouselProperties.outerOffset;
    carouselProperties.isDragging = true;
    carouselProperties.animationID = requestAnimationFrame(function() {
        scrollAnimation(carouselProperties)
    });
}

function touchMove (event, carouselProperties) {
    if (carouselProperties.isDragging) {
        const currentPosition = getPositionX(event) - carouselProperties.outerOffset;
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
    // let slideWidth = carouselProperties.slideWidth();
    let slideWidth = carouselProperties.getSlideWidth(carouselProperties.slides);

    let offset =  Math.round(scrolledBy / -slideWidth);
    let newIndex = carouselProperties.currentIndex + offset;
    let imagesInViewport = Math.round(carouselProperties.outerContainer.getBoundingClientRect().width / slideWidth);

    if (newIndex < 0) {
        newIndex = 0;
    }   else if (newIndex >= carouselProperties.slides.length - imagesInViewport) {
        newIndex = carouselProperties.slides.length - imagesInViewport;
    }
    return newIndex; 
}

function setPositionByIndex(carouselProperties) {
    // carouselProperties.currentTranslate = carouselProperties.currentIndex * - carouselProperties.slideWidth();
    carouselProperties.currentTranslate = carouselProperties.currentIndex * - carouselProperties.getSlideWidth(carouselProperties.slides);
    carouselProperties.prevTranslate = carouselProperties.currentTranslate;
    setCarouselPosition(carouselProperties);
}