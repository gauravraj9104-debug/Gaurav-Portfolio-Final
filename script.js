/* =========================================================
   GAURAV RAJ PORTFOLIO
   JavaScript Interactions
========================================================= */


/* =========================================================
   1. MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        const icon = menuToggle.querySelector("i");

        if (icon) {

            icon.classList.toggle(
                "fa-bars",
                !isOpen
            );

            icon.classList.toggle(
                "fa-xmark",
                isOpen
            );

        }

    });


    /* Close menu when navigation link is clicked */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        });

    });

}


/* =========================================================
   2. NAVBAR SCROLL EFFECT
========================================================= */

const navbar = document.getElementById("navbar");


function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);

updateNavbar();



/* =========================================================
   3. ACTIVE NAVIGATION LINK
========================================================= */

const sections = document.querySelectorAll(
    "section[id]"
);


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 180;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
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

updateActiveNavigation();



/* =========================================================
   4. SCROLL REVEAL ANIMATION
========================================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-content, " +
    ".about-card, " +
    ".timeline-item, " +
    ".skill-category, " +
    ".service-card, " +
    ".featured-project, " +
    ".project-card, " +
    ".journey-card, " +
    ".contact-wrapper"
);


/*
   Add reveal class automatically
*/

revealElements.forEach(element => {

    element.classList.add("reveal");

});


/*
   Intersection Observer
*/

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================================
   5. BACK TO TOP BUTTON
========================================================= */

const backToTop =
    document.getElementById("backToTop");


function updateBackToTop() {

    if (!backToTop) return;


    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


updateBackToTop();



/* =========================================================
   6. CONTACT FORM VALIDATION + WEB3FORMS
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            let isValid = true;


            /* Get fields */

            const name =
                document.getElementById("name");

            const email =
                document.getElementById("email");

            const subject =
                document.getElementById("subject");

            const message =
                document.getElementById("message");


            /* Clear previous errors */

            clearFormErrors();


            /* Validate Name */

            if (!name.value.trim()) {

                showFieldError(
                    name,
                    "Please enter your name."
                );

                isValid = false;

            } else if (
                name.value.trim().length < 2
            ) {

                showFieldError(
                    name,
                    "Name must contain at least 2 characters."
                );

                isValid = false;

            }


            /* Validate Email */

            if (!email.value.trim()) {

                showFieldError(
                    email,
                    "Please enter your email."
                );

                isValid = false;

            } else if (
                !isValidEmail(email.value.trim())
            ) {

                showFieldError(
                    email,
                    "Please enter a valid email address."
                );

                isValid = false;

            }


            /* Validate Subject */

            if (!subject.value.trim()) {

                showFieldError(
                    subject,
                    "Please enter a subject."
                );

                isValid = false;

            }


            /* Validate Message */

            if (!message.value.trim()) {

                showFieldError(
                    message,
                    "Please enter your message."
                );

                isValid = false;

            } else if (
                message.value.trim().length < 10
            ) {

                showFieldError(
                    message,
                    "Message should contain at least 10 characters."
                );

                isValid = false;

            }


            /* Stop if validation fails */

            if (!isValid) {

                showFormStatus(
                    "Please fix the highlighted fields.",
                    "error"
                );

                return;

            }


            /* Show sending message */

            showFormStatus(
                "Sending your message...",
                "success"
            );


            try {

                const formData =
                    new FormData(contactForm);


                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",
                            body: formData
                        }
                    );


                const result =
                    await response.json();


                if (result.success) {

                    showFormStatus(
                        "Message sent successfully! Thank you for contacting me.",
                        "success"
                    );

                    contactForm.reset();

                } else {

                    showFormStatus(
                        "Something went wrong. Please try again.",
                        "error"
                    );

                }

            } catch (error) {

                console.error(
                    "Web3Forms Error:",
                    error
                );

                showFormStatus(
                    "Unable to send the message. Please try again later.",
                    "error"
                );

            }

        }
    );

}




/* =========================================================
   7. FORM HELPER FUNCTIONS
========================================================= */


function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}



function showFieldError(
    field,
    message
) {

    const formGroup =
        field.closest(".form-group");


    if (!formGroup) return;


    formGroup.classList.add("error");


    const errorMessage =
        formGroup.querySelector(
            ".error-message"
        );


    if (errorMessage) {

        errorMessage.textContent =
            message;

    }

}



function clearFormErrors() {

    const groups =
        document.querySelectorAll(
            ".form-group"
        );


    groups.forEach(group => {

        group.classList.remove("error");


        const errorMessage =
            group.querySelector(
                ".error-message"
            );


        if (errorMessage) {

            errorMessage.textContent = "";

        }

    });


    if (formStatus) {

        formStatus.className =
            "form-status";

        formStatus.textContent = "";

    }

}



function showFormStatus(
    message,
    type
) {

    if (!formStatus) return;


    formStatus.textContent =
        message;


    formStatus.className =
        `form-status show ${type}`;


    /*
       Inline styles keep this independent
       from the main design system.
    */

    if (type === "error") {

        formStatus.style.background =
            "rgba(239, 68, 68, 0.08)";

        formStatus.style.border =
            "1px solid rgba(239, 68, 68, 0.25)";

        formStatus.style.color =
            "#fca5a5";

    } else {

        formStatus.style.background =
            "rgba(34, 197, 94, 0.08)";

        formStatus.style.border =
            "1px solid rgba(34, 197, 94, 0.25)";

        formStatus.style.color =
            "#86efac";

    }

}



/* =========================================================
   8. PROJECT BUTTON
========================================================= */

function showProjectMessage() {

    const message =
        "Project link will be added here when the project URL is available.";

    alert(message);

}


/* =========================================================
   9. CLOSE MOBILE MENU WITH ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            navMenu &&
            navMenu.classList.contains("open")
        ) {

            navMenu.classList.remove(
                "open"
            );


            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    menuToggle.querySelector("i");


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }

    }
);



/* =========================================================
   10. ACTIVE INPUT EFFECT
========================================================= */

const formInputs =
    document.querySelectorAll(
        ".contact-form input, " +
        ".contact-form textarea"
    );


formInputs.forEach(input => {


    input.addEventListener(
        "input",
        () => {

            const group =
                input.closest(".form-group");


            if (
                group &&
                input.value.trim()
            ) {

                group.classList.remove(
                    "error"
                );


                const error =
                    group.querySelector(
                        ".error-message"
                    );


                if (error) {

                    error.textContent = "";

                }

            }

        }
    );


});



/* =========================================================
   11. PREVENT PLACEHOLDER GITHUB LINKS
========================================================= */

const githubLinks =
    document.querySelectorAll(
        'a[href="#"]'
    );


githubLinks.forEach(link => {

    /*
       Only intercept links that are
       explicitly marked as placeholders.
    */

    if (
        link.title &&
        link.title.toLowerCase().includes(
            "github"
        )
    ) {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                alert(
                    "GitHub profile link will be added later."
                );

            }
        );

    }

});



/* =========================================================
   12. PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);