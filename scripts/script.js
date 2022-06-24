/*--- Variables ---*/

// Cookies section
const cookies = document.querySelectorAll('.cookies');
const closeCookiesBtn = document.querySelectorAll('.cookies__close');

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

/*--- Controls for Cookies section */
closeCookiesBtn.forEach(element => {
    element.addEventListener('click', closeCookies);
});

function closeCookies () {
    cookies.forEach(element => {
        element.style.display = 'none';
    });
};


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