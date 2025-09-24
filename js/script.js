document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });

    // Testimonial Carousel
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = Array.from(carouselTrack.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');

    let slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;

    // Arrange slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    // Initialize first slide as current
    if (slides.length > 0) {
        slides[0].classList.add('current-slide');
    }

    // When I click left, move slides to the left
    prevButton.addEventListener('click', () => {
        const currentSlide = carouselTrack.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;

        if (prevSlide) {
            moveToSlide(carouselTrack, currentSlide, prevSlide);
            currentIndex--;
        } else { // Loop to the last slide
            const lastSlide = slides[slides.length - 1];
            moveToSlide(carouselTrack, currentSlide, lastSlide);
            currentIndex = slides.length - 1;
        }
    });

    // When I click right, move slides to the right
    nextButton.addEventListener('click', () => {
        const currentSlide = carouselTrack.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;

        if (nextSlide) {
            moveToSlide(carouselTrack, currentSlide, nextSlide);
            currentIndex++;
        } else { // Loop to the first slide
            const firstSlide = slides[0];
            moveToSlide(carouselTrack, currentSlide, firstSlide);
            currentIndex = 0;
        }
    });

    // Handle window resize for carousel
    window.addEventListener('resize', () => {
        slideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });
        // Reset transform to current slide's position after resize
        const currentSlide = carouselTrack.querySelector('.current-slide');
        if (currentSlide) {
             carouselTrack.style.transform = 'translateX(-' + currentSlide.style.left + ')';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});