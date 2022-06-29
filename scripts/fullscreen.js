// All photos on website that may be fullscreened
const photosToFullscreen = document.querySelectorAll('[data-fullsreen-photo]');

// Function that works with all photos
photosToFullscreen.forEach(element => {
    element.addEventListener('click', (e) => {
        // Image that has been pressed
        let currentImage = e.target;
        // Image's source
        let currentImageSrc = currentImage.src;
        // Modal that will host a photo
        let currentModal = document.querySelector('.modal__fullscreen');
        // Image inside this modal
        let fullscreenImage = currentModal.querySelector('.modal__fullscreen-photo');
        // Close button
        let closeBtn = currentModal.querySelector('.modal__close');
        
        // Check for mobile devices so close button wouldn't appear
        if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            closeBtn.style.display = 'block';
        }

        // Putting the photo source inside the host modal
        fullscreenImage.src = currentImageSrc;

        // Making modal visible
        currentModal.classList.add('modal__fullscreen--active');

        // Controls for closure of the modal
        currentModal.addEventListener('click', closeModal);
        closeBtn.addEventListener('click', closeModal);

        // Function to close the modal
        function closeModal() {
            currentModal.classList.remove('modal__fullscreen--active');
            closeBtn.style.display = 'none';
        };
    });
});

