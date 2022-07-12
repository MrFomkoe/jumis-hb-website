// All photos on website that may be fullscreened
const photosToFullscreen = Array.from(document.querySelectorAll('[data-fullsreen-photo]')); 

for (let i = 0; i < photosToFullscreen.length; i++) {
    photosToFullscreen[i].id = `photo_${i}`;
}

// Function to populate the modal with photos
photosToFullscreen.forEach((item) => {
    item.addEventListener('click', openModal);
});

function getCurrentIndex() {

}

function openModal (element) {
    let pressedImage = element.currentTarget;
    let pressedImageId = pressedImage.id;

    const carouselContainer = element.currentTarget.closest('[data-carousel]').cloneNode(true);
    carouselContainer.style.transition = 'none';

    const fullsreenModal = document.querySelector('.modal__fullscreen');
    const closeBtn = fullsreenModal.querySelector('.modal__close');

    fullsreenModal.appendChild(carouselContainer);
    fullsreenModal.classList.add('modal__fullscreen--active');

    const currentPhotos = Array.from(fullsreenModal.querySelectorAll('[data-carousel__item]'));
    if (carouselContainer.classList.contains('portfolio__images')) {
        carouselContainer.classList.remove('portfolio__images');
        carouselContainer.classList.add('photo-carousel');
        currentPhotos.forEach(photo => {
            photo.classList.remove('portfolio__item');
            photo.classList.add('photo-carousel__item');
        });
    };
    console.log(currentIndex)
    currentIndex = currentPhotos.findIndex(item => {
        if (item.id === pressedImageId) {
            return true
        }
    }) 

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
    setTimeout(() => {
        carouselContainer.style.transition = 'all 0.3s ease-in-out';
    }, 100);

    closeBtn.addEventListener('click', () => {
        fullsreenModal.classList.remove('modal__fullscreen--active');
        carouselContainer.remove();
    });
}
