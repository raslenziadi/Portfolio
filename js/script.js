/* =========================================================
   RASLEN ZIADI PORTFOLIO
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header = document.getElementById("header");

    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navClose = document.getElementById("nav-close");

    const navLinks = document.querySelectorAll(".nav-link");

    const backToTop = document.getElementById("back-to-top");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (navToggle) {

        navToggle.addEventListener("click", () => {
            navMenu.classList.add("show");
            document.body.style.overflow = "hidden";
        });

    }


    if (navClose) {

        navClose.addEventListener("click", closeMenu);

    }


    function closeMenu() {

        navMenu.classList.remove("show");
        document.body.style.overflow = "";

    }


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    /* =====================================================
       HEADER ON SCROLL
    ===================================================== */

    function handleHeader() {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener("scroll", handleHeader);

    handleHeader();


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    function updateScrollProgress() {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        document.documentElement.style.setProperty(
            "--scroll-progress",
            `${progress}%`
        );

    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");


    function updateActiveNavigation() {

        const scrollPosition =
            window.scrollY + 150;


        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                });


                const activeLink =
                    document.querySelector(
                        `.nav-link[href="#${sectionId}"]`
                    );


                if (activeLink) {

                    activeLink.classList.add("active");

                }

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-header, " +
        ".about-text, " +
        ".about-stats, " +
        ".skill-card, " +
        ".timeline-item, " +
        ".project-card, " +
        ".activity-card, " +
        ".certificate-card, " +
        ".education-card, " +
        ".academic-documents, " +
        ".professional-document, " +
        ".contact-intro, " +
        ".contact-link"
    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }

    );


    revealElements.forEach(element => {

        observer.observe(element);

    });


    /* =====================================================
       STAGGERED ANIMATION
    ===================================================== */

    const animatedGroups = [
        ".skills-grid .skill-card",
        ".projects-grid .project-card",
        ".activities-grid .activity-card",
        ".certifications-grid .certificate-card",
        ".professional-documents .professional-document"
    ];


    animatedGroups.forEach(selector => {

        const elements =
            document.querySelectorAll(selector);


        elements.forEach((element, index) => {

            element.style.transitionDelay =
                `${index * 80}ms`;

        });

    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function handleBackToTop() {

        if (window.scrollY > 600) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        handleBackToTop,
        { passive: true }
    );


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       IMAGE TILT EFFECT
    ===================================================== */

    const profileCard =
        document.querySelector(".profile-card");


    if (profileCard && window.innerWidth > 900) {

        profileCard.addEventListener("mousemove", event => {

            const rect =
                profileCard.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX = rect.width / 2;
            const centerY = rect.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -3;

            const rotateY =
                ((x - centerX) / centerX) * 3;


            profileCard.style.animation = "none";

            profileCard.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });


        profileCard.addEventListener("mouseleave", () => {

            profileCard.style.animation =
                "floatingCard 5s ease-in-out infinite";

            profileCard.style.transform = "";

        });

    }


    /* =====================================================
       PROJECT IMAGE PARALLAX-LIKE EFFECT
    ===================================================== */

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth < 900) return;


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const rotateY =
                ((x - rect.width / 2) /
                    rect.width) * 2;

            const rotateX =
                ((y - rect.height / 2) /
                    rect.height) * -2;


            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =====================================================
       YEAR
    ===================================================== */

    const footerYear =
        document.querySelector(".footer-bottom p");

    if (footerYear) {

        footerYear.innerHTML =
            `© ${new Date().getFullYear()} Raslen Ziadi. All rights reserved.`;

    }


    /* =====================================================
       INITIALIZATION
    ===================================================== */

    updateScrollProgress();
    updateActiveNavigation();
    handleBackToTop();

});