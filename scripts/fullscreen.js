// All photos on website that may be fullscreened
const photosToFullscreen = Array.from(document.querySelectorAll('[data-fullsreen-photo]')); 

for (let i = 0; i < carouselItems.length; i++) {
    carouselItems[i].id = `photo_${i}`;
}

// Function to populate the modal with photos
photosToFullscreen.forEach((item, index) => {
    item.addEventListener('click', openModal(item, index));
});

function openModal (item, index) {
    return function (event) {
        const container = item.closest('[data-carousel__inner]').cloneNode(true);
        console.log(item)
    }
}