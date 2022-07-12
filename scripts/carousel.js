// Defining all button for all carousels on the webpage
const carouselBtns = document.querySelectorAll('[data-carousel-btn]')

// Event listener for buttons
carouselBtns.forEach(element => {
    element.addEventListener('click', scrollImageByButton );
});

// Function to scroll images
function scrollImageByButton (element) {
    // Gets the actual button pressed
    let button = element.currentTarget;
    // Gets the parent container to have access to other DOM elements
    let container = button.closest('.container');
    // Carousel
    let carouselContainer = container.querySelector('[data-carousel]');
    // Individual slides
    let carouselSlides = container.querySelectorAll('[data-carousel__item]');
    // Defining slide width for scroll animation
    const slideWidth = carouselSlides[0].clientWidth;
    // Defining gap between images
    let slideGap = window.getComputedStyle(carouselContainer).getPropertyValue('gap');
    slideGap = parseInt(slideGap.replace(/\D/g,''));
    // Offset to scroll to next or prev
    let offset = button.classList.contains('arrow-right') ? 1 : -1;
    // Slide to be shown the first
    const activeSlide = carouselContainer.querySelector('[data-active]'); 
    // Index of the above slide
    let newIndex = [...carouselSlides].indexOf(activeSlide) + offset;
    // Check of indexes so it won't exceed/subceed amount of elements in nodelist
    let windowWidth = window.innerWidth;
    if ((slideWidth+slideGap)/windowWidth >= 0.40) {
        if (newIndex < 0 || newIndex >= carouselSlides.length) return;
    } else if (((slideWidth+slideGap)/windowWidth >= 0.30) && ((slideWidth+slideGap)/windowWidth < 0.40)) {
        if (newIndex < 0 || newIndex >= carouselSlides.length - 1) return;
    } else {
        if (newIndex < 0 || newIndex >= carouselSlides.length - 2) return;
    }

    // Change of the "active slide"
    carouselSlides[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;

    // Calculation of widht to be moved
    let widthToBeMoved = -(slideWidth + slideGap) * newIndex;
    // Animation for scroll
    carouselContainer.style.transform = `translateX(${widthToBeMoved}px)`;
}

// Touch controls 
let isDragging = false;
let statePos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationId;
let currentIndex = 0;
const carouselItems = document.querySelectorAll('[data-carousel__item]');

carouselItems.forEach(item => {

    // Get images from page
    const carouselImage = item.querySelector('img');

    // Disable context menu 
    if (carouselImage != null) {
        carouselImage.addEventListener('dragstart', (e) => e.preventDefault());
        item.oncontextmenu = function (event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    };

 
});


