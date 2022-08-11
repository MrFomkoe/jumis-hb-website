// All photos on website that may be fullscreened
const photosToFullscreen = Array.from(document.querySelectorAll('[data-fullsreen-photo]')); 

for (let i = 0; i < carouselItems.length; i++) {
    carouselItems[i].id = `photo_${i}`;
}


let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let previousTranslate = 0;


// Function to populate the modal with photos
photosToFullscreen.forEach((item) => {
    item.addEventListener('click', openModal);
});



function openModal (element) {

    const carouselContainer = element.currentTarget.closest('[data-carousel__inner]').cloneNode(true);
    carouselContainer.style.left = '0px'
    carouselContainer.style.transition = 'none';

    const fullsreenModal = document.querySelector('.modal__fullscreen');
    const closeBtn = fullsreenModal.querySelector('.modal__close');

    fullsreenModal.appendChild(carouselContainer);
    fullsreenModal.classList.add('modal__fullscreen--active');

    const currentPhotos = Array.from(fullsreenModal.querySelectorAll('[data-carousel__item]'));

    // Check whether the pressed image is with grid display settings
    if (carouselContainer.classList.contains('portfolio__images__inner')) {
        carouselContainer.classList.remove('portfolio__images__inner');
        carouselContainer.classList.add('photo-carousel');
        currentPhotos.forEach(photo => {
            photo.classList.remove('portfolio__item');
            photo.classList.add('photo-carousel__item');
        });
    };

    currentIndex = getCurrentIndex(element, currentPhotos);

    // Defining slide width for scroll animation
    const slideWidth = currentPhotos[0].clientWidth;
    // Slide to be shown the first
    const activeSlide = carouselContainer.querySelector('[data-active]'); 


    // Change of the "active slide"
    currentPhotos[currentIndex].dataset.active = true;
    if (activeSlide.id != currentPhotos[currentIndex].id) {
        delete activeSlide.dataset.active;
    }

    // Calculation of widht to be moved
    let widthToBeMoved = -(slideWidth) * currentIndex;
    // Animation for scroll
    carouselContainer.style.transform = `translateX(${widthToBeMoved}px)`;

    carouselContainer.addEventListener('touchstart', changeImageByTouchStart, {passive: true});
    carouselContainer.addEventListener('touchmove', changeImageByTouchMove, {passive: true});
    carouselContainer.addEventListener('touchend', changeImageByTouchEnd, {passive: true});

    closeBtn.addEventListener('click', () => {
        fullsreenModal.classList.remove('modal__fullscreen--active');
        carouselContainer.remove();
    });
}

function changeImageByTouchStart (event) {
    startPosition = event.targetTouches[0].clientX;
    isDragging = true;
}

function changeImageByTouchMove (event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = currentPosition - startPosition;
    }
}

function changeImageByTouchEnd (event) {
    if (currentTranslate < -100) {
        offset = 1;
    } else if (currentTranslate > 100) {
        offset = -1;
    };
    changeImage(event, offset);
}


function getCurrentIndex(element, carouselSlides) {
    let pressedImage = element.currentTarget;
    let pressedImageId = pressedImage.id;
    currentIndex = carouselSlides.findIndex(item => {
        if (item.id === pressedImageId) {
            return true
        }
    });
    return currentIndex;
}