// ===== ambil elemen dari HTML =====
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const themeToggle = document.getElementById("theme-toggle");
const backToTop = document.getElementById("back-to-top");
const navLinks = document.querySelectorAll("a[href^='#']");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");


// ===== hamburger menu =====
hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("active");
});


// ===== smooth scrolling =====
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function (event) {
        const target = this.getAttribute("href");

        // abaikan link kosong seperti href="#"
        if (target.length <= 1) {
            event.preventDefault();
            return;
        }

        const section = document.querySelector(target);
        if (section) {
            event.preventDefault();
            section.scrollIntoView({ behavior: "smooth" });
        }

        // tutup menu hamburger setelah link diklik
        navMenu.classList.remove("active");
    });
}


// ===== dark / light mode =====
// teks tombol menunjukkan mode yang akan dipilih
themeToggle.textContent = "Light";

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeToggle.textContent = "Dark";
    } else {
        themeToggle.textContent = "Light";
    }
});


// ===== filter project =====
for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {
        const filter = this.getAttribute("data-filter");

        // pindahkan tanda active ke tombol yang diklik
        for (let j = 0; j < filterButtons.length; j++) {
            filterButtons[j].classList.remove("active");
        }
        this.classList.add("active");

        // tampilkan atau sembunyikan kartu
        for (let k = 0; k < projectCards.length; k++) {
            const category = projectCards[k].getAttribute("data-category");

            if (filter === "all" || filter === category) {
                projectCards[k].classList.remove("hide");
            } else {
                projectCards[k].classList.add("hide");
            }
        }
    });
}


// ===== tombol back to top =====
backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// ===== animasi saat scroll =====
// elemen yang akan muncul pelan-pelan
const revealItems = document.querySelectorAll(
    ".about-text, .about-info, .skill-card, .project-card, .timeline-item, .certificate-card, .contact-container"
);

// beri class reveal di awal (disembunyikan oleh CSS)
for (let i = 0; i < revealItems.length; i++) {
    revealItems[i].classList.add("reveal");
}

function showOnScroll() {
    const windowHeight = window.innerHeight;

    for (let i = 0; i < revealItems.length; i++) {
        const top = revealItems[i].getBoundingClientRect().top;

        // kalau elemen sudah masuk layar, tampilkan
        if (top < windowHeight - 60) {
            revealItems[i].classList.add("visible");
        }
    }
}


// ===== event scroll =====
window.addEventListener("scroll", function () {
    // munculkan tombol back to top setelah scroll 300px
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

    showOnScroll();
});

// jalankan sekali saat halaman dibuka
showOnScroll();