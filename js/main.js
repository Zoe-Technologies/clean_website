/* -------------------------------------------


------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    /* -------------------------------------------
    
    preloader
    
    ------------------------------------------- */

    const initPreloader = () => {
        let preloaderPercent = document.querySelector('.mil-percent');
        let preloaderLine = document.querySelector('.mil-preload-line');
        let preloader = document.querySelector('.mil-preloader-frame');
        let progress = 0;

        function updatePreloader() {
            if (progress <= 100) {
                preloaderPercent.textContent = progress;
                preloaderLine.style.width = progress + "%";
                progress += 10;
            } else {
                clearInterval(preloaderInterval);
                setTimeout(() => {
                    preloader.classList.add('mil-complete');
                }, 500); // Затримка в пів секунди перед додаванням класу
            }
        }

        let preloaderInterval = setInterval(updatePreloader, 100);
    };

    // Додаємо затримку в пів секунди перед запуском initPreloader
    setTimeout(initPreloader, 500);
    /* -------------------------------------------
    
    page transitions
    
    ------------------------------------------- */
    const options = {
        containers: ['#swupMain', '#swupMenu'],
        animateHistoryBrowsing: true,
        linkSelector: 'a:not([data-no-swup]):not([href^="#"])',
        plugins: [new SwupBodyClassPlugin()]
    };

    const swup = new Swup(options);

    /* -------------------------------------------
    
    smooth scroll
    
    ------------------------------------------- */
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    
    /* -------------------------------------------
    
    Email form
    
    ------------------------------------------- */
  // ===== EmailJS Debug Implementation =====
// This version includes extensive debugging and error trapping

// Wait for the EmailJS library to load
window.onload = function() {
    console.log("🔍 Window loaded - Starting EmailJS setup");
    
    // Check if EmailJS is available
    if (typeof emailjs === 'undefined') {
        console.error("❌ ERROR: EmailJS library is not loaded!");
        alert("The email service library is not loaded. Please check your internet connection or try again later.");
        return;
    }
    
    try {
        // Initialize EmailJS with your public key
        console.log("🔄 Initializing EmailJS...");
        emailjs.init("Loou1rzwRThVVBP-i");
        console.log("✅ EmailJS initialized successfully");
        
        // Setup form after EmailJS is initialized
        setupDiscountForm();
    } catch (error) {
        console.error("❌ EmailJS initialization failed:", error);
        alert("Failed to initialize the email service. Please try again later.");
    }
};

function setupDiscountForm() {
    console.log("🔄 Setting up discount form...");
    
    // Get the form element
    const form = document.getElementById("discount-form");
    
    if (!form) {
        console.error("❌ Form with ID 'discount-form' not found!");
        return;
    }
    
    console.log("✅ Form found:", form);
    
    // Verify all required elements exist
    const elements = {
        nameInput: document.getElementById("user-name-3"),
        emailInput: document.getElementById("user-email-3"),
        phoneInput: document.getElementById("user-phone-3"),
        submitBtn: document.getElementById("submit-btn")
    };
    
    // Check if all elements exist
    let missingElements = [];
    for (const [key, element] of Object.entries(elements)) {
        if (!element) {
            missingElements.push(key);
            console.error(`❌ Element '${key}' not found!`);
        }
    }
    
    if (missingElements.length > 0) {
        console.error(`❌ Missing form elements: ${missingElements.join(", ")}`);
        return;
    }
    
    console.log("✅ All form elements found");
    
    // Add form submission handler
    form.addEventListener("submit", function(event) {
        console.log("🔄 Form submit event triggered");
        event.preventDefault();
        
        // Disable the submit button
        elements.submitBtn.disabled = true;
        elements.submitBtn.innerHTML = "Sending...";
        
        // Get input values
        const formData = {
            userName: elements.nameInput.value.trim(),
            userEmail: elements.emailInput.value.trim(),
            userPhone: elements.phoneInput.value.trim()
        };
        
        console.log("📝 Form data collected:", formData);
        
        // Validate inputs
        if (!formData.userName || !formData.userEmail || !formData.userPhone) {
            console.error("❌ Validation error: Empty fields");
            alert("Please fill in all fields.");
            elements.submitBtn.disabled = false;
            elements.submitBtn.innerHTML = "Get it now<i class='far fa-arrow-right mil-bg-m-1 mil-a-1'></i>";
            return;
        }
        
        // Prepare template parameters
        const templateParams = {
            user_name: formData.userName,
            user_email: formData.userEmail,
            user_phone: formData.userPhone,
            discount_code: "50% OFF FIRST PURCHASE"
        };
        
        console.log("🔄 Sending email with params:", templateParams);
        console.log("🔄 Using service ID:", "hostinger_smtp");
        console.log("🔄 Using template ID:", "template_gcc85pw");
        
        // Send email with verbose logging and better error handling
        emailjs.send("hostinger_smtp", "template_gcc85pw", templateParams)
            .then(function(response) {
                console.log("✅ Email sent successfully!", response);
                console.log("📊 Response status:", response.status);
                console.log("📝 Response text:", response.text);
                
                alert("Success! Your discount code has been sent to your email.");
                form.reset();
            })
            .catch(function(error) {
                console.error("❌ Failed to send email:", error);
                
                if (error.status) {
                    console.error("📊 Error status:", error.status);
                }
                
                if (error.text) {
                    console.error("📝 Error text:", error.text);
                }
                
                // Provide more specific error messages based on error type
                if (error.status === 400) {
                    alert("There was an error with your request. Please check your information and try again.");
                } else if (error.status === 401 || error.status === 403) {
                    alert("Authorization error. Please contact support.");
                } else if (error.status >= 500) {
                    alert("Server error. Please try again later.");
                } else {
                    alert("Failed to send email. Please check your internet connection and try again.");
                }
            })
            .finally(function() {
                // Re-enable the submit button
                elements.submitBtn.disabled = false;
                elements.submitBtn.innerHTML = "Get it now<i class='far fa-arrow-right mil-bg-m-1 mil-a-1'></i>";
                console.log("🔄 Form reset to initial state");
            });
    });
    
    console.log("✅ Form setup complete and ready for submissions");
}

// Add a test function that can be called from the console for debugging
window.testEmailJS = function() {
    console.log("🔍 Testing EmailJS connection...");
    
    // Send a test email
    emailjs.send("hostinger_smtp", "template_gcc85pw", {
        user_name: "Test User",
        user_email: "test@example.com",
        user_phone: "+61123456789",
        discount_code: "TEST DISCOUNT"
    })
    .then(function(response) {
        console.log("✅ Test email sent successfully!", response);
    })
    .catch(function(error) {
        console.error("❌ Test email failed:", error);
    });
};

    /* -------------------------------------------
    
    menu
    
    ------------------------------------------- */
    const menuBtn = document.querySelector('.mil-menu-btn');
    const mainMenu = document.querySelector('.mil-main-menu');
    const topPanel = document.querySelector('.mil-top-panel');
    const menuLinks = document.querySelectorAll('.mil-main-menu a');

    if (menuBtn && mainMenu) {
        menuBtn.addEventListener('click', function () {
            menuBtn.classList.toggle('mil-active');
            mainMenu.classList.toggle('mil-active');
        });
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (menuBtn && mainMenu) {
                menuBtn.classList.remove('mil-active');
                mainMenu.classList.remove('mil-active');
            }
        });
    });

    window.addEventListener('scroll', function () {
        if (mainMenu && topPanel) {
            if (window.scrollY > 10) {
                mainMenu.classList.add('mil-scroll');
                topPanel.classList.add('mil-scroll');
            } else {
                mainMenu.classList.remove('mil-scroll');
                topPanel.classList.remove('mil-scroll');
            }
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetPosition = targetElement.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(document.documentElement).fontSize) * 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* -------------------------------------------
    
    right buttons
    
    ------------------------------------------- */
    const milRightButtonsFrame = document.querySelector('.mil-right-buttons-frame');
    const milOpenWindow = document.querySelector('.mil-open-window');
    const milOrderCallWindow = document.querySelector('.mil-order-call-window');
    const milBackToTop = document.querySelector('.mil-back-to-top');

    if (milRightButtonsFrame && milBackToTop) {
        window.addEventListener('scroll', function () {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop + windowHeight >= documentHeight - 100) {
                milRightButtonsFrame.classList.add('mil-on-bottom');
            } else {
                milRightButtonsFrame.classList.remove('mil-on-bottom');
            }

            if (scrollTop >= 200) {
                milBackToTop.classList.add('mil-active');
            } else {
                milBackToTop.classList.remove('mil-active');
            }
        });
    }

    if (milOpenWindow && milOrderCallWindow) {
        milOpenWindow.addEventListener('click', function () {
            this.classList.toggle('mil-active');
            milOrderCallWindow.classList.toggle('mil-active');
        });
    }

    /* -------------------------------------------
    
    sliders
    
    ------------------------------------------- */
    const initSliders = () => {
        const reviewsSliderEl = document.querySelector('.mil-reviews-slider');
        const teamSliderEl = document.querySelector('.mil-team-slider');

        if (reviewsSliderEl) {
            const menu = [
                '<div class="mil-custom-dot mil-slide-1"></div>',
                '<div class="mil-custom-dot mil-slide-2"></div>',
                '<div class="mil-custom-dot mil-slide-3"></div>',
                '<div class="mil-custom-dot mil-slide-4"></div>',
                '<div class="mil-custom-dot mil-slide-5"></div>',
                '<div class="mil-custom-dot mil-slide-6"></div>',
                '<div class="mil-custom-dot mil-slide-7"></div>'
            ];

            new Swiper(reviewsSliderEl, {
                pagination: {
                    el: '.mil-revi-pagination',
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (menu[index]) + '</span>';
                    },
                },
                speed: 800,
                effect: 'fade',
                parallax: true,
                navigation: {
                    nextEl: '.mil-revi-next',
                    prevEl: '.mil-revi-prev',
                },
            });
        }

        if (teamSliderEl) {
            new Swiper(teamSliderEl, {
                spaceBetween: 15,
                slidesPerView: 2,
                loop: true,
                speed: 5000,
                autoplay: {
                    delay: 0,
                },
                freeMode: true,
                breakpoints: {
                    768: {
                        slidesPerView: 4,
                    },
                    992: {
                        slidesPerView: 7,
                    },
                },
            });
        }
    };

    initSliders();

    /* -------------------------------------------
    
    scroll animation

    ------------------------------------------- */
    const initScrollAnimations = () => {
        const animateSections = (selector, animationProps, scrollTriggerConfig) => {
            document.querySelectorAll(selector).forEach((section) => {
                const props = animationProps(section);
                const config = scrollTriggerConfig(section);
                gsap.fromTo(section, props.from, {
                    ...props.to,
                    scrollTrigger: config
                });
            });
        };

        // Fade In Animation
        animateSections(".mil-up",
            () => ({
                from: {
                    opacity: 0,
                    y: 60,
                    ease: 'sine'
                },
                to: {
                    opacity: 1,
                    y: 0
                }
            }),
            (section) => ({
                trigger: section,
                toggleActions: 'play none none reverse'
            })
        );

        // Parallax Animation
        animateSections(".mil-parallax-img",
            (section) => ({
                from: {
                    y: section.getAttribute("data-value-1"),
                    ease: 'sine'
                },
                to: {
                    y: section.getAttribute("data-value-2")
                }
            }),
            (section) => ({
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse'
            })
        );

        // Rotate Animation
        animateSections(".mil-rotate",
            (section) => ({
                from: {
                    rotate: 0,
                    ease: 'sine'
                },
                to: {
                    rotate: section.getAttribute("data-value")
                }
            }),
            (section) => ({
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse'
            })
        );

        // Scale Animation
        animateSections(".mil-scale-img",
            (section) => ({
                from: {
                    scale: section.getAttribute("data-value-1"),
                    ease: 'sine'
                },
                to: {
                    scale: section.getAttribute("data-value-2")
                }
            }),
            (section) => ({
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse'
            })
        );

        // Scale Animation with Y offset
        animateSections(".mil-scale-img-2",
            (section) => ({
                from: {
                    y: '-130',
                    scale: section.getAttribute("data-value-1"),
                    ease: 'sine'
                },
                to: {
                    y: '0',
                    scale: section.getAttribute("data-value-2")
                }
            }),
            (section) => ({
                trigger: section,
                end: "top top+=120",
                scrub: true,
                toggleActions: 'play none none reverse'
            })
        );

        // Scale Animation starting from top offset
        animateSections(".mil-scale-img-top",
            (section) => ({
                from: {
                    scale: section.getAttribute("data-value-1"),
                    ease: 'sine'
                },
                to: {
                    scale: section.getAttribute("data-value-2")
                }
            }),
            (section) => ({
                trigger: section,
                scrub: true,
                start: "top top+=120",
                toggleActions: 'play none none reverse'
            })
        );

        // Counter Animation
        document.querySelectorAll(".mil-counter").forEach(element => {
            const zero = {
                val: 0
            };
            const num = parseFloat(element.dataset.number);
            const decimals = num.toString().split(".")[1]?.length || 0;

            gsap.to(zero, {
                val: num,
                duration: 1.8,
                scrollTrigger: {
                    trigger: element,
                    toggleActions: 'play none none reverse'
                },
                onUpdate: () => {
                    element.textContent = zero.val.toFixed(decimals);
                }
            });
        });
    };


    initScrollAnimations();

    /* -------------------------------------------
    
    accordion
    
    ------------------------------------------- */
    const initAccordion = () => {
        const accordions = document.querySelectorAll(".mil-accordion");

        accordions.forEach(button => {
            button.addEventListener("click", () => {
                const panel = button.nextElementSibling;
                const icon = button.querySelector(".mil-icon");

                accordions.forEach(otherButton => {
                    if (otherButton !== button) {
                        otherButton.classList.remove("mil-active");
                        if (otherButton.querySelector(".mil-icon")) {
                            otherButton.querySelector(".mil-icon").textContent = "+";
                        }
                        if (otherButton.nextElementSibling) {
                            otherButton.nextElementSibling.style.maxHeight = null;
                        }
                    }
                });

                button.classList.toggle("mil-active");
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                    icon.textContent = "+";
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                    icon.textContent = "−";
                }

                ScrollTrigger.refresh();
            });
        });
    };

    initAccordion();

    /* -------------------------------------------
    
    popup
    
    ------------------------------------------- */
    let popupClicked = false;

    const initPopup = () => {
        const callPopupButton = document.querySelector('.mil-call-popup');
        const closePopupButton = document.querySelector('.mil-close-popup');
        const discountPopup = document.querySelector('.mil-discount-popup');

        if (callPopupButton && discountPopup) {
            callPopupButton.addEventListener('click', function () {
                discountPopup.classList.add('mil-active');
                popupClicked = true;
            });
        }

        if (closePopupButton && discountPopup) {
            closePopupButton.addEventListener('click', function () {
                discountPopup.classList.remove('mil-active');
            });
        }
    };

    initPopup();

    setTimeout(function () {

        document.querySelector('.mil-discount-popup').classList.add('mil-active');

    }, 20000);

    /* -------------------------------------------
        
    forms

    ------------------------------------------- */

    const initForms = () => {
        var phoneInputs = document.querySelectorAll('.mil-phone-input');

        phoneInputs.forEach(function (phoneInput) {
            var cleave = new Cleave(phoneInput, {
                delimiters: ['(', ')', '-', '-'],
                blocks: [3, 3, 3, 2, 2],
                prefix: '+61',
                numericOnly: true,
                noImmediatePrefix: true,
            });

            phoneInput.addEventListener('focus', function () {
                if (phoneInput.value === '') {
                    phoneInput.value = '+61';
                }
            });

            phoneInput.addEventListener('blur', function () {
                if (phoneInput.value === '+61' || phoneInput.value === '+61(') {
                    phoneInput.value = '';
                }
            });
        });
    };
    initForms();

    /* -------------------------------------------
            
    custom select
            
    ------------------------------------------- */
    const initSelect = () => {
        document.querySelectorAll(".mil-custom-select").forEach((customSelect) => {
            const selectBtn = customSelect.querySelector(".mil-select-button");
            const selectedValue = customSelect.querySelector(".mil-selected-value");
            const optionsList = customSelect.querySelectorAll(".mil-select-dropdown li");

            if (selectBtn && selectedValue && optionsList.length > 0) {
                selectBtn.addEventListener("click", () => {
                    customSelect.classList.toggle("mil-active");
                });

                optionsList.forEach((option) => {
                    function handler(e) {
                        if (e.type === "click" && e.clientX !== 0 && e.clientY !== 0) {
                            selectedValue.textContent = option.children[1].textContent;
                            customSelect.classList.remove("mil-active");
                            if (!selectedValue.classList.contains("mil-selected")) {
                                selectedValue.classList.add("mil-selected");
                            }
                        }
                        if (e.key === "Enter") {
                            selectedValue.textContent = option.textContent;
                            customSelect.classList.remove("mil-active");
                            if (!selectedValue.classList.contains("mil-selected")) {
                                selectedValue.classList.add("mil-selected");
                            }
                        }
                    }
                    option.addEventListener("keyup", handler);
                    option.addEventListener("click", handler);
                });
            }
        });
    };
    initSelect();

    /* -------------------------------------------
                    
    before/after
                    
    ------------------------------------------- */
    const initBF = () => {
        var subject = document.querySelector('.mil-before-and-after');
        var scraper = document.querySelector('.mil-subject-scraper');
        var after = document.querySelector('.mil-subject-after');

        if (!subject || !scraper || !after) return;

        var distance = (window.innerWidth - subject.clientWidth) / 2;
        window.onresize = recalculateDistance;
        var px = 0;
        var touches = [];

        subject.addEventListener('mousemove', dragScraper, false);
        subject.addEventListener('touchmove', dragScraper, false);

        function recalculateDistance() {
            distance = (window.innerWidth - subject.clientWidth) / 2;
        }

        function dragScraper(event) {
            px = event.clientX - distance;

            if (px == null) {
                touches = event.touches;
                px = touches[0].clientX - distance;
            }
            if (px < 0) {
                px = 0;
            }
            scraper.style.transform = 'translate(' + px + 'px, 0)';
            after.style.transform = 'translate(-' + px + 'px, 0)';
        }
    };

    initBF();



    /* -------------------------------------------
                            
    fancybox
                            
    ------------------------------------------- */
    const initFancybox = () => {
        const galleryItems = document.querySelectorAll('[data-fancybox="gallery"]');

        Fancybox.defaults.Hash = false;

        Fancybox.bind('[data-fancybox="gallery"]', {
            loop: true,
            toolbar: true,
            buttons: ["zoom", "close"],
        });
    };

    initFancybox();

    /*----------------------------------------------------------
    ------------------------------------------------------------

    REINIT

    ------------------------------------------------------------
    ----------------------------------------------------------*/
    document.addEventListener("swup:contentReplaced", function () {
        window.scrollTo(0, 0);
        lenis.scrollTo(0, {
            immediate: true
        });
        /* -------------------------------------------

        menu

        ------------------------------------------- */
        const menuBtn = document.querySelector('.mil-menu-btn');
        const mainMenu = document.querySelector('.mil-main-menu');
        const menuLinks = document.querySelectorAll('.mil-main-menu a');

        function toggleMenu() {
            menuBtn.classList.toggle('mil-active');
            mainMenu.classList.toggle('mil-active');
        }

        menuLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetPosition = targetElement.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(document.documentElement).fontSize) * 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        initAccordion();
        initSliders();
        initScrollAnimations();
        initPopup();
        initForms();
        initSelect();
        initBF();
        initFancybox();
        ScrollTrigger.refresh();
    });
});
