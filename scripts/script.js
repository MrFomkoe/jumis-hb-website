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
const restoreIntroLinks = document.querySelectorAll('[data-restore-intro]');

// Language selector
// const langSelector = document.querySelectorAll('.lang-selector__list');
const langSelector = document.querySelectorAll('[data-collapse-selector]');
console.log(langSelector)

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
    if (!introduction) {
        return
    }
    introduction.style.height = '0';
    introduction.parentElement.style.marginBottom = '0';
};

// Function that restores introduction section
function restoreIntro () {
    if (!introduction) {
        return
    }
    introduction.style.height = '320px';
    introduction.parentElement.style.marginBottom = '60px';
};

function collapseServicesList () {
    if (servicesContainer.classList.contains('not-index-page')) {
        servicesContainer.classList.toggle('collapsed');
    };
};


// Event listener for services link to hide intro section
servicesLink.addEventListener('click', hideIntro);
servicesLink.addEventListener('click', collapseServicesList);
restoreIntroLinks.forEach(element => {
    element.addEventListener('mouseenter', restoreIntro);
});


/*--- Language selector controls ---*/

// Function to collapse language selector
langSelector.forEach(element => {
    element.addEventListener('click', (e) => {
        element.parentElement.classList.toggle('collapsed');
    })
});
// Fulscreen photo controls