document.addEventListener("DOMContentLoaded", function () {

    /* 1. TYPING EFFECT ON THE BANNER TAGLINE */
    const tagline = document.querySelector(".banner-content > p");
    if (tagline) {
        const text = tagline.textContent.trim();
        let i = 0;
        tagline.textContent = "";
        tagline.classList.add("typing");

        function typeLetter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeLetter, 50);
            } else {
                tagline.classList.remove("typing");
            }
        }
        typeLetter();
    }

    /* 2. FADE-IN ON SCROLL (HOMEPAGE) */
    const revealItems = document.querySelectorAll(
        ".homepage h2, .homepage h2 + p, .homepage ul, .homepage table, .homepage button, .homepage footer, .social-links"
    );
    revealItems.forEach(function (el) {
        el.classList.add("reveal");
    });

    document.querySelectorAll(".homepage table td").forEach(function (td, index) {
        td.style.transitionDelay = (index * 0.12) + "s";
        td.classList.add("reveal");
    });

    const homeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                homeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal").forEach(function (el) {
        homeObserver.observe(el);
    });

    /* 3. BACK-TO-TOP BUTTON */
    const topButton = document.createElement("button");
    topButton.textContent = "\u2191";
    topButton.className = "back-to-top";
    topButton.setAttribute("aria-label", "Back to top");
    document.body.appendChild(topButton);

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            topButton.classList.add("show");
        } else {
            topButton.classList.remove("show");
        }
    });

    topButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* 4. TABS */
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");
    tabButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            tabButtons.forEach(function (b) { b.classList.remove("active"); });
            tabPanels.forEach(function (p) { p.classList.remove("active"); });
            btn.classList.add("active");
            document.getElementById(btn.dataset.tab).classList.add("active");
        });
    });

    /* 5. ACCORDION FAQ */
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(function (question) {
        question.addEventListener("click", function () {
            const item = question.parentElement;
            const answer = item.querySelector(".faq-answer");
            const wasOpen = item.classList.contains("open");

            document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
                openItem.classList.remove("open");
                openItem.querySelector(".faq-answer").style.maxHeight = null;
            });

            if (!wasOpen) {
                item.classList.add("open");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    /* 6. LIGHTBOX GALLERY */
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    const lightboxImg = document.createElement("img");
    const lightboxClose = document.createElement("span");
    lightboxClose.className = "lightbox-close";
    lightboxClose.innerHTML = "&times;";
    lightbox.appendChild(lightboxClose);
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    document.querySelectorAll(".homepage table img").forEach(function (img) {
        img.style.cursor = "zoom-in";
        img.addEventListener("click", function () {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add("show");
        });
    });

    function closeLightbox() {
        lightbox.classList.remove("show");
    }

    lightbox.addEventListener("click", function (e) {
        if (e.target !== lightboxImg) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeLightbox();
    });

    /* 7. DONATE MODAL */
    const donateBtn = document.getElementById("donate-btn");
    const modal = document.getElementById("donate-modal");
    if (donateBtn && modal) {
        const modalClose = modal.querySelector(".modal-close");
        const donateForm = document.getElementById("donate-form");
        const thankYou = document.getElementById("thank-you");

        donateBtn.addEventListener("click", () => modal.classList.add("show"));
        modalClose.addEventListener("click", () => {
            modal.classList.remove("show");
            thankYou.style.display = "none";
        });
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("show");
                thankYou.style.display = "none";
            }
        });
        donateForm.addEventListener("submit", function (e) {
            e.preventDefault();
            thankYou.style.display = "block";
            donateForm.reset();
            setTimeout(() => {
                modal.classList.remove("show");
                thankYou.style.display = "none";
            }, 2500);
        });
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                modal.classList.remove("show");
                thankYou.style.display = "none";
            }
        });
    }

    /* 8. ABOUT US PAGE ANIMATIONS */
    const aboutPage = document.querySelector("body.aboutpage");
    if (aboutPage) {
        const revealElements = aboutPage.querySelectorAll("main > h1, main > h2, main > p, main > section, main > table");
        
        if ("IntersectionObserver" in window) {
            const aboutObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });

            revealElements.forEach(function (element, index) {
                element.classList.add("about-reveal");
                element.style.transitionDelay = (index * 0.08) + "s";
                aboutObserver.observe(element);
            });
        } else {
            revealElements.forEach((el) => el.classList.add("is-visible"));
        }

        // Read More Button
        const readMoreBtn = document.getElementById("readMoreBtn");
        const aboutExtra = document.getElementById("aboutExtra");
        if (readMoreBtn && aboutExtra) {
            aboutExtra.classList.remove("is-open");
            aboutExtra.hidden = true;
            readMoreBtn.textContent = "Read More About Us";
            readMoreBtn.setAttribute("aria-expanded", "false");

            readMoreBtn.addEventListener("click", function () {
                if (aboutExtra.hidden) {
                    aboutExtra.hidden = false;
                    requestAnimationFrame(() => aboutExtra.classList.add("is-open"));
                    readMoreBtn.textContent = "Read Less";
                    readMoreBtn.setAttribute("aria-expanded", "true");
                } else {
                    aboutExtra.classList.remove("is-open");
                    readMoreBtn.textContent = "Read More About Us";
                    readMoreBtn.setAttribute("aria-expanded", "false");
                    setTimeout(function () {
                        if (!aboutExtra.classList.contains("is-open")) aboutExtra.hidden = true;
                    }, 400);
                }
            });
        }
    }

    /* 9. COUNTER (ABOUT PAGE) */
    const counters = document.querySelectorAll(".counter");
    if (counters.length) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        function animate(el) {
            const target = parseInt(el.dataset.target, 10) || 0;
            if (reduceMotion) { el.textContent = target; return; }
            const duration = 1200;
            const start = performance.now();
            function frame(now) {
                const p = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(target * eased);
                if (p < 1) requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
        }
        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(c => counterObserver.observe(c));
    }

    /* 10. SCROLL PROGRESS BAR */
    const bar = document.querySelector('.scroll-progress');
    if (bar) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            bar.style.width = (scrolled * 100) + '%';
        });
    }

    /* 11. TEAM TABLE STAGGER (ABOUT PAGE) */
    const rows = document.querySelectorAll('.aboutpage .team-table tr:not(:first-child)');
    if (rows.length) {
        const rowObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('row-show');
            });
        }, { threshold: 0.2 });
        rows.forEach((row, i) => {
            row.classList.add('row-hidden');
            row.style.transitionDelay = (i * 0.15) + 's';
            rowObserver.observe(row);
        });
    }

    /* 12. PILLAR CARDS: REVEAL + 3D TILT (ABOUT PAGE) */
    const pillars = document.querySelectorAll(".aboutpage .pillar");
    if (pillars.length) {
        const pillarObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        pillars.forEach((card, i) => {
            card.classList.add("about-reveal");
            card.style.transitionDelay = (i * 0.12) + "s";
            pillarObserver.observe(card);
            card.addEventListener("mousemove", (e) => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = `translateY(-8px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
            });
            card.addEventListener("mouseleave", () => card.style.transform = "");
        });
    }

    /* 13. BANNER FADE-IN ON LOAD (ABOUT PAGE) */
    const banner = document.querySelector(".aboutpage .home-banner");
    if (banner) {
        setTimeout(() => banner.classList.add("banner-loaded"), 100);
    }

    /* 14. CONTACT FORM SUBMISSION */
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = form.querySelector(".submit-btn");
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.style.opacity = "0.8";
            btn.disabled = true;

            setTimeout(() => {
                form.innerHTML = `
                    <div style="text-align: center; padding: 40px 20px;">
                        <i class="fas fa-check-circle" style="font-size: 50px; color: #2f855a; margin-bottom: 15px;"></i>
                        <h3 style="color: #12355b; margin-bottom: 10px;">Message Sent!</h3>
                        <p style="color: #4a5568;">Thank you for your enquiry. We will get back to you soon.</p>
                    </div>
                `;
            }, 1500);
        });
    }

    /* 15. AUTO-FILL SUBJECT FROM URL */
    const urlParams = new URLSearchParams(window.location.search);
    const subjectParam = urlParams.get('subject');
    if (subjectParam) {
        const selectBox = document.querySelector('select[name="subject"]');
        if (selectBox) {
            selectBox.value = subjectParam;
            selectBox.style.borderColor = "#ffd43b";
            selectBox.style.backgroundColor = "#fff8e0";
        }
    }

    /* 16. COPY TO CLIPBOARD ON CONTACT CARDS */
    const infoItems = document.querySelectorAll(".info-item");
    infoItems.forEach(item => {
        const tooltip = document.createElement("span");
        tooltip.className = "copy-tooltip";
        tooltip.textContent = "Copied!";
        item.appendChild(tooltip);

        item.addEventListener("click", () => {
            const textToCopy = item.querySelector(".value").textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                item.classList.add("copied");
                setTimeout(() => item.classList.remove("copied"), 2000);
            });
        });
    });

    /* 17. BULLETPROOF CONTACT SCROLL REVEAL */
       /* 17. BULLETPROOF CONTACT SCROLL REVEAL */
    const contactElements = document.querySelectorAll(
        ".contact-header, .info-item, .enquiry-section" // Removed .location and .map-section here!
    );
    
    if (contactElements.length) {
        contactElements.forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(40px)";
            el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        });

        const revealOnScroll = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    obs.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1, 
            rootMargin: "0px 0px -50px 0px" 
        });

        contactElements.forEach(el => revealOnScroll.observe(el));
    }

    /* 18. CONTACT BANNER FADE-IN */
    const contactBanner = document.querySelector(".contactpage .home-banner");
    if (contactBanner) {
        setTimeout(() => {
            contactBanner.classList.add("banner-loaded");
        }, 100);
    }

    /* 19. FULLSCREEN MAP MODAL */
    const expandBtns = document.querySelectorAll(".map-expand-btn");
    
    if (expandBtns.length) {
        const mapModal = document.createElement("div");
        mapModal.className = "map-modal";
        mapModal.innerHTML = `
            <button class="map-modal-close">&times;</button>
            <iframe src="" allowfullscreen="" loading="lazy"></iframe>
        `;
        document.body.appendChild(mapModal);

        const modalIframe = mapModal.querySelector("iframe");
        const modalClose = mapModal.querySelector(".map-modal-close");

        expandBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const mapIframe = btn.parentElement.querySelector("iframe");
                modalIframe.src = mapIframe.src;
                mapModal.classList.add("show");
            });
        });

        const closeMapModal = () => {
            mapModal.classList.remove("show");
            setTimeout(() => modalIframe.src = "", 300); 
        };

        modalClose.addEventListener("click", closeMapModal);
        mapModal.addEventListener("click", (e) => {
            if (e.target === mapModal) closeMapModal();
        });
        
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && mapModal.classList.contains("show")) {
                closeMapModal();
            }
        });
    }

});

/* =========================================
   20. TEXTBOOK SHOPPING CART
   ========================================= */
let cart = [];
let total = 0;

function addToCart(name, price, image) {
    // Check if item is already in cart
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    
    updateCartUI();
}

function updateCartUI() {
    const cartItemsDiv = document.getElementById("cart-items");
    const cartTotalSpan = document.getElementById("cart-total");
    
    if (!cartItemsDiv) return; // Exit if not on textbooks page
    
    cartItemsDiv.innerHTML = "";
    total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is currently empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            
            cartItemsDiv.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>R${item.price} x ${item.quantity}</p>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
    }
    
    cartTotalSpan.textContent = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add some textbooks first.");
        return;
    }
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const confirmCheckout = confirm(`You are about to purchase ${totalItems} items for a total of R${total}.\n\nProceed to payment?`);
    
    if (confirmCheckout) {
        alert("Thank you for your purchase! Your order has been placed.");
        cart = [];
        updateCartUI();
    }
}

    /* 21. TEXTBOOK PAGE SCROLL REVEAL */
    const textbookElements = document.querySelectorAll(
        ".textbookpage .main-title, " +
        ".textbookpage .textbook, " +
        ".textbookpage .shopping-cart, " +
        ".textbookpage .info-section"
    );

    if (textbookElements.length) {
        // Create the observer
        const textbookObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target); // Animate only once
                }
            });
        }, { 
            threshold: 0.1, 
            rootMargin: "0px 0px -50px 0px" 
        });

        // Add the starting class and observe
        textbookElements.forEach(el => {
            el.classList.add("reveal-scroll");
            textbookObserver.observe(el);
        });
    }

        /* 25. SUBJECTS PAGE SCROLL REVEAL */
    const subjectElements = document.querySelectorAll(
        ".subjects-page .subject-card, " +
        ".subjects-page .table-container, " +
        ".subjects-page .online-session-banner, " +
        ".subjects-page .inperson-session-banner, " +
        ".subjects-page .features-list"
    );

    if (subjectElements.length) {
        const subjectObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target); // Animate only once
                }
            });
        }, { 
            threshold: 0.1, 
            rootMargin: "0px 0px -50px 0px" 
        });

        subjectElements.forEach(el => {
            el.classList.add("reveal-scroll");
            subjectObserver.observe(el);
        });
    }



