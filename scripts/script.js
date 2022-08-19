/*--- Variables ---*/

// Section with company introduction
const introduction = document.querySelector('.introduction');
// Link "services"
const servicesLink = document.querySelector('.main-nav__services-list');
// Container with list of services
const servicesContainer = document.querySelector('.services-list')
// About us link
const restoreIntroLinks = document.querySelectorAll('[data-restore-intro]');

// Language selector
const langSelector = document.querySelectorAll('[data-collapse-selector]');



/*--- Controls for introduction section ---*/

// Function that hides introduction section when "Pakalpojumi" link is pressed
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

// Collapsong services list
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

// Defining mobile selector
let mobileMenuSelector = document.getElementById('mobile-selector');
// Adding listener
mobileMenuSelector.addEventListener('click', showMoblieMenu);

// Function to show mobile menu
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

// Defining additional "Pakalpojumi" button
let mobileServicesBtn = document.querySelectorAll('[data-mobile-services]')

// Adding listener for services list in mobile view
mobileServicesBtn.forEach(btn => {
    btn.addEventListener('click', showMoblieServices);
});

// Function to show services list in mobile view
function showMoblieServices (event) {
    let mobileServices = document.querySelector('.mobile-nav__services-list');
    let mobileServicesClose = document.querySelector('.mobile-nav__services-list__close');
    
    mobileServices.style.top = '0';

    mobileServicesClose.addEventListener('click', () => {
        mobileServices.style.top = '-100%';
    });
};

// "Skatit vairak" buttons for  reviews section in mobile view
let reviewsHideBtn = document.querySelectorAll('.reviews__text_hide-btn');

// Listener to show additional text in rieviews section
reviewsHideBtn.forEach(btn => {
    btn.addEventListener('click', (element) => {
        let seeMore = element.currentTarget.previousElementSibling;
        seeMore.style.display = 'inline';
        btn.style.display = 'none';
    });
});