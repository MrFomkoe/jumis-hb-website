// Portfolio photos
const portfolioPhotos = document.querySelectorAll('.portfolio__item');


portfolioPhotos.forEach(element => {
    element.addEventListener('click', (e) => {
        let currentImage = e.currentTarget;
        let modal = currentImage.parentNode;
        console.log(modal);
        modal.classList.toggle('fullscreen-image');



        // console.log(currentImage);
        // let currentContainer = currentImage.closest('.container');
        // console.log(currentContainer);
        // let currentModal = currentContainer.querySelector('.modal');
        // console.log(currentModal);
    });
});