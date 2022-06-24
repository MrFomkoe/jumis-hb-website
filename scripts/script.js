/*--- Variables ---*/

// Section with company introduction
const introduction = document.querySelector('.introduction');
// Link "services"
const servicesLink = document.querySelector('.main-nav__services-list');
// Container with list of services
const servicesContainer = document.querySelector('.services-list');
// All other links in navigation
// const mainNavLinks = document.querySelectorAll('.main-nav__link');

// About us link
const aboutUs = document.querySelector('.about-us');

// Language selector
const langSelector = document.querySelector('.lang-selector__list');

// Portfolio photos
const portfolioPhotos = document.querySelectorAll('.portfolio__item')

/*--- Controls for introduction section ---*/

// Function that hides introduction section
function hideIntro () {
    introduction.style.height = '0';
    introduction.parentElement.style.marginBottom = '0';
};

// Function that restores introduction section
function restoreIntro () {
    introduction.style.height = '320px';
    introduction.parentElement.style.marginBottom = '60px';
};

// Event listener for services link to hide intro section
servicesLink.addEventListener('click', hideIntro);

// Event listener for restoring the intro section
// mainNavLinks.forEach(element => {
//     element.addEventListener('mouseenter', restoreIntro)
// });

aboutUs.addEventListener('mouseenter', restoreIntro);

/*--- Language selector controls ---*/

// Function to collapse language selector
langSelector.addEventListener('click', () => {
    langSelector.classList.toggle('collapsed');
})

// Fulscreen photo controls
portfolioPhotos.forEach(element => {
    element.addEventListener('click', makeFullscreen);
});

function makeFullscreen (element) {
    console.log('click');
    element.currentTarget.classList.toggle('fullscreen-photo');
    console.log(element.currentTarget)
}