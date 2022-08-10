// Cookies section
const cookiesPanel = document.querySelectorAll('.cookies');
const closeCookiesBtn = document.querySelectorAll('.cookies__close');

/*--- Controls for Cookies section */
closeCookiesBtn.forEach(element => {
    element.addEventListener('click', closeCookies);
});

function closeCookies () {
    cookiesPanel.forEach(element => {
        element.style.display = 'none';
    });
};


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
const restoreIntroLinks = document.querySelectorAll('[data-restore-intro]');

// Language selector
// const langSelector = document.querySelectorAll('.lang-selector__list');
const langSelector = document.querySelectorAll('[data-collapse-selector]');



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


let mobileMenuSelector = document.getElementById('mobile-selector');

mobileMenuSelector.addEventListener('click', showMoblieMenu);

function showMoblieMenu (event) {
    let selector = event.currentTarget;
    
    let mobileContainer = selector.closest('.mobile-navigation');
    let mobileMenuCloseBtn = mobileContainer.querySelector('.mobile-nav__close');
    let mobileMenu = mobileContainer.querySelector('.mobile-nav');
    let contactPageLink = mobileContainer.querySelector('[data-contact-link]');
    mobileMenu.style.top = '0';
    
    mobileMenuCloseBtn.addEventListener('click', () => {
        mobileMenu.style.top = '-100%';
    });

    contactPageLink.addEventListener('click', () => {
        mobileMenu.style.top = '-100%';
    });
}

let mobileServicesBtn = document.querySelectorAll('[data-mobile-services]')


mobileServicesBtn.forEach(btn => {
    btn.addEventListener('click', showMoblieServices);
});

function showMoblieServices (event) {
    let mobileServices = document.querySelector('.mobile-nav__services-list');
    let mobileServicesClose = document.querySelector('.mobile-nav__services-list__close');
    
    console.log(mobileServices)


    mobileServices.style.top = '0';
    
    mobileServicesClose.addEventListener('click', () => {
        mobileServices.style.top = '-100%';
    });
};

let reviewsHideBtn = document.querySelectorAll('.reviews__text_hide-btn');

reviewsHideBtn.forEach(btn => {
    btn.addEventListener('click', (element) => {
        let seeMore = element.currentTarget.previousElementSibling;
        seeMore.style.display = 'inline';
        btn.style.display = 'none';
    });
});