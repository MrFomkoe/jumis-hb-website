// All sliders on a page
const carousels = document.querySelectorAll('[data-carousel]');

// All images within all sliders
const carouselItems = document.querySelectorAll('[data-carousel__item]');

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

// Constructing class to be used further for each slider
class Properties {
    constructor (outerContainer, outerOffset, innerContainer, slides) {
        // Boolean for dragging state
        this.isDragging = false;
        // Mouse / touch start position
        this.startPos = 0;
        // Distance moved
        this.currentTranslate = 0;
        // Previous position
        this.prevTranslate = 0;
        // Animation ID for animation frame
        this.animationID = 0;
        // Index of image
        this.currentIndex = 0;
        // Outer container
        this.outerContainer = outerContainer;
        // Outer container left offset
        this.outerOffset = outerOffset;
        // Indder container
        this.innerContainer = innerContainer;
        // Images in current slider
        this.slides = slides;
        // Width of each slide
        this.slideWidth = function () {
            // Image width
            let imageWidth = this.slides[0].clientWidth;

            // Defining gap between images
            let slideGap = window.getComputedStyle(this.innerContainer).getPropertyValue('gap');
            slideGap = parseInt(slideGap.replace(/\D/g,''));
            
            // Defining and returning full width
            let slideWidth = imageWidth + slideGap;
            return slideWidth;
        }
    }
}

// Main functions
carousels.forEach(carousel => {
    // Defining instance for each slider
    let carouselProperties = new Properties (
        carousel, // outerContainer
        carousel.offsetLeft, // outerOffset
        carousel.querySelector("[data-carousel__inner]"), // innerContainer
        Array.from(carousel.querySelectorAll('[data-carousel__item]')), // slides
    )
    // All images meant to be full screened in particular slider
    const photosToFullscreen = Array.from(carousel.querySelectorAll('[data-fullsreen-photo]')); 
    // Defining slider control buttons for each slider
    const carouselBtns = carousel.closest('.container').querySelectorAll('[data-carousel-btn]')
    carouselBtns.forEach(btn => {
        btn.addEventListener('click', ()=> {
            changeImageByButton(btn, carouselProperties)
        });
    });

    // Touch events
    carousel.addEventListener('touchstart', (event) => {
        touchStart(event, carouselProperties);
    }, { passive: true });
    carousel.addEventListener('touchmove', (event) => {
        touchMove(event, carouselProperties);
    }, { passive: true });
    carousel.addEventListener('touchend', (event) => {
        touchEnd(event, carouselProperties);
    });

    // Listener that positions image by its index after window resize
    window.addEventListener('resize', () => {
        setPositionByIndex(carouselProperties);
        console.log('resized')
    });

    // Listener for fullsreen call for image. 
    // The current item, its index and also the pressed slider's properties are being sent to function
    photosToFullscreen.forEach((item, index) => {
        item.addEventListener('click', () => {
            openModal(item, index, carouselProperties)
        });
    });
});


// Fullscreen settings
function openModal (item, index) {
    // The clone of the slider for pressed image
    const container = item.closest('[data-carousel]').cloneNode(true);
    // Fullscreen modal
    const fullsreenModal = document.querySelector('.modal__fullscreen');
    // Close button
    const closeBtn = fullsreenModal.querySelector('.modal__close');

    // Making instance for cloned slider
    let carouselProperties = new Properties (
        container, // outerContainer
        container.offsetLeft, // outterOffset
        container.querySelector("[data-carousel__inner]"), // innerContainer
        Array.from(container.querySelectorAll('[data-carousel__item]')), // slides
    )
    // New instance's "current index" set to the pressed image's index
    carouselProperties.currentIndex = index;
    
    // Defining new variable, so further code is more clear
    let currentPhotos = carouselProperties.slides;
    let innerContainer = carouselProperties.innerContainer;
    // Removing transition in order to avoid slider movement till the correct photo is fullscreened
    innerContainer.style.transition = 'none';

    // Appending cloned container to modal and displaying modal
    fullsreenModal.appendChild(container);
    fullsreenModal.classList.add('modal__fullscreen--active');

    // Defining buttons for slider controls
    const carouselBtns = fullsreenModal.querySelectorAll('[data-carousel-btn]');

    // Check whether the pressed image is with grid display settings (necessary for index page)
    if (innerContainer.classList.contains('portfolio__images__inner')) {
        innerContainer.classList.remove('portfolio__images__inner');
        innerContainer.classList.add('photo-carousel');
        container.classList.remove('portfolio__images')
        currentPhotos.forEach(photo => {
            photo.classList.remove('portfolio__item');
            photo.classList.add('photo-carousel__item');
        });
    };

    // Setting pressed image to be displayed fullscreen
    setPositionByIndex(carouselProperties);
    // Re-assiging transition 
    setTimeout(() => {
        innerContainer.style.transition = 'transform 0.2s ease-out';
    }, 300);

    // Touch events for fullsreen images
    innerContainer.addEventListener('touchstart', (event) => {
        touchStart(event, carouselProperties);
    });
    innerContainer.addEventListener('touchmove', (event) => {
        touchMove(event, carouselProperties);
    });
    innerContainer.addEventListener('touchend', (event) => {
        touchEnd(event, carouselProperties);
    });

    // Controls for changing of images
    carouselBtns.forEach(btn => {
    btn.addEventListener('click', ()=> {
        changeImageByButton(btn, carouselProperties)
    });
    });

    // Listener for closure of the fullscreen modal + deletion of photos 
    closeBtn.addEventListener('click', () => {
        fullsreenModal.classList.remove('modal__fullscreen--active');
        container.remove();
    });
    
    // Listener that positions fullscreen image by its index after window resize
    window.addEventListener('resize', () => {
        setPositionByIndex(carouselProperties);
    });
}

// Function to change images via click on button
function changeImageByButton (btn, carouselProperties) {
    // Getting current image's width
    let slideWidth = getSlideWidth(carouselProperties);
    // Amount of images in viewport
    let imagesInViewport = getimagesInViewport(carouselProperties, slideWidth)

    // Changing index
    let offset = btn.classList.contains('arrow-right') ? 1 : -1;
    carouselProperties.currentIndex = carouselProperties.currentIndex += offset;

    // Check of boundaries so all images would fit viewport
    if (carouselProperties.currentIndex < 0) {
        carouselProperties.currentIndex = 0;
    }   else if (carouselProperties.currentIndex >= carouselProperties.slides.length - imagesInViewport) {
        carouselProperties.currentIndex = carouselProperties.slides.length - imagesInViewport;
    }

    // Setting position of image
    setPositionByIndex(carouselProperties);
}

// Section for touch controls

// Touch start
function touchStart(event, carouselProperties) {
    // Getting x position of touch
    carouselProperties.startPos = getPositionX(event) - carouselProperties.outerOffset;
    // Changing state of dragging
    carouselProperties.isDragging = true;
    // Starting animation frame
    carouselProperties.animationID = requestAnimationFrame(function() {
        scrollAnimation(carouselProperties)
    });
}

// Touch movement
function touchMove (event, carouselProperties) {
    if (carouselProperties.isDragging) {
        // Getting current position of touch
        const currentPosition = getPositionX(event) - carouselProperties.outerOffset;
        carouselProperties.currentTranslate = parseInt(carouselProperties.prevTranslate + currentPosition - carouselProperties.startPos);
    }
}

// Touch end
function touchEnd(event, carouselProperties) {
    // Canceling animation frame
    cancelAnimationFrame(carouselProperties.animationID);
    // Changing state of dragging
    carouselProperties.isDragging = false;
    // Defining amount px that were scrolled from touch start to latest touch move
    const scrolledBy = carouselProperties.currentTranslate - carouselProperties.prevTranslate;
    carouselProperties.prevTranslate = carouselProperties.currentTranslate;
    
    // Getting index to be taken as current for slider
    carouselProperties.currentIndex = getCurrentIndex(carouselProperties, scrolledBy);
    // Setting position of image by index
    setPositionByIndex(carouselProperties);
};

// Function to get position of touch
function getPositionX(event) {
    return event.type.includes('mouse') ? 
            event.pageX : 
            event.targetTouches[0].clientX;
}

// Function for smooth animation
function scrollAnimation(carouselProperties) {
    setCarouselPosition(carouselProperties);
    if (carouselProperties.isDragging) {
        requestAnimationFrame(function() {
            scrollAnimation(carouselProperties)
        });
    };
}

// Function for translate of slider
function setCarouselPosition(carouselProperties) {
    carouselProperties.innerContainer.style.transform = `translateX(${carouselProperties.currentTranslate}px)`;
}

// Function to get slide width
function getSlideWidth (carouselProperties) {
    let calcSlideWidth = carouselProperties.slideWidth();
    return calcSlideWidth;
}

// Function to get amount of images in viewport
function getimagesInViewport (carouselProperties, slideWidth) {
    let calcImagesInViewport = Math.floor(carouselProperties.outerContainer.getBoundingClientRect().width / slideWidth);
    return calcImagesInViewport;
}

// Function to get index based on images in viewport
function getCurrentIndex(carouselProperties, scrolledBy) {
    let slideWidth = getSlideWidth(carouselProperties);
    let imagesInViewport = getimagesInViewport(carouselProperties, slideWidth)
    if (imagesInViewport <= 0) {
        imagesInViewport = 1;
    }

    // Set of checks to make responsive offset
    let offset =  scrolledBy / -slideWidth;
    if (offset < -0.2) {
        offset = Math.floor(offset);
        // offset = 0
    } else if (offset > 0.2) {
        offset = Math.ceil(offset);
    } else if (offset > -0.19 || offset < 0.19) {
        offset = Math.round(offset);
    }

    let newIndex = carouselProperties.currentIndex + offset;

    // Check of boundaries
    if (newIndex < 0) {
        newIndex = 0;
    }   else if (newIndex >= carouselProperties.slides.length - imagesInViewport) {
        newIndex = carouselProperties.slides.length - imagesInViewport;
    }
    return newIndex; 
}

// Function to set position by current index
function setPositionByIndex(carouselProperties) {
    carouselProperties.currentTranslate = carouselProperties.currentIndex * - carouselProperties.slideWidth();
    carouselProperties.prevTranslate = carouselProperties.currentTranslate;
    setCarouselPosition(carouselProperties);
}