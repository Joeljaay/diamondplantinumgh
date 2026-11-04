const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-menu");

if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        });
    });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const bannerImages = Array.from(document.querySelectorAll(".banner-slide"));
if (bannerImages.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let activeBannerImage = 0;
    window.setInterval(() => {
        bannerImages[activeBannerImage].classList.remove("is-active");
        activeBannerImage = (activeBannerImage + 1) % bannerImages.length;
        bannerImages[activeBannerImage].classList.add("is-active");
    }, 5000);
}

const slides = Array.from(document.querySelectorAll(".hero-image"));
const dots = Array.from(document.querySelectorAll(".slide-dot"));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (slides.length > 1 && dots.length === slides.length && !reducedMotion.matches) {
    let currentSlide = 0;
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide = index;
            updateSlide();
        });
    });

    function updateSlide() {
        slides.forEach((image, index) => {
            image.classList.toggle("is-active", index === currentSlide);
            dots[index].setAttribute("aria-current", String(index === currentSlide));
        });
    }

    window.setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }, 5000);
} else if (slides.length > 1 && dots.length === slides.length) {
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            slides.forEach((image, imageIndex) => {
                image.classList.toggle("is-active", imageIndex === index);
                dots[imageIndex].setAttribute("aria-current", String(imageIndex === index));
            });
        });
    });
}
