document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.products');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');

    let currentIndex = 0;

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : 0;
        carousel.style.transform = `translateX(-${currentIndex * 320}px)`;
    });

    nextButton.addEventListener('click', () => {
        const maxIndex = carousel.children.length - 1;
        currentIndex = (currentIndex < maxIndex) ? currentIndex + 1 : maxIndex;
        carousel.style.transform = `translateX(-${currentIndex * 320}px)`;
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector('.products-carousel .products');
    const nextButton = document.querySelector('.carousel-next');
    const prevButton = document.querySelector('.carousel-prev');
    const totalItems = document.querySelectorAll('.products-carousel .product').length;
    const itemsPerPage = 3; // Number of items displayed at a time
    let currentIndex = 0;

    function updateButtons() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex + itemsPerPage >= totalItems;
    }

    nextButton.addEventListener('click', function () {
        if (currentIndex + itemsPerPage < totalItems) {
            currentIndex += itemsPerPage;
            carousel.style.transform = `translateX(-${currentIndex * 100 / itemsPerPage}%)`;
        }
        updateButtons();
    });

    prevButton.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex -= itemsPerPage;
            carousel.style.transform = `translateX(-${currentIndex * 100 / itemsPerPage}%)`;
        }
        updateButtons();
    });

    updateButtons();
});
