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

    if ("IntersectionObserver" in window) {
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
    } else {
        document.querySelectorAll(".reveal").forEach(function (el) {
            el.classList.add("visible");
        });
    }

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
            tabButtons.forEach(function (b) {
                b.classList.remove("active");
            });

            tabPanels.forEach(function (p) {
                p.classList.remove("active");
            });

            btn.classList.add("active");

            const targetPanel = document.getElementById(btn.dataset.tab);

            if (targetPanel) {
                targetPanel.classList.add("active");
            }
        });
    });

    /* 5. ACCORDION FAQ */
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {
        question.addEventListener("click", function () {
            const item = question.parentElement;
            const answer = item.querySelector(".faq-answer");

            if (!answer) return;

            const wasOpen = item.classList.contains("open");

            document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
                openItem.classList.remove("open");

                const openAnswer = openItem.querySelector(".faq-answer");

                if (openAnswer) {
                    openAnswer.style.maxHeight = null;
                }
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
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeLightbox();
        }
    });

    /* 7. DONATE MODAL */
    const donateBtn = document.getElementById("donate-btn");
    const modal = document.getElementById("donate-modal");

    if (donateBtn && modal) {
        const modalClose = modal.querySelector(".modal-close");
        const donateForm = document.getElementById("donate-form");
        const thankYou = document.getElementById("thank-you");

        donateBtn.addEventListener("click", function () {
            modal.classList.add("show");
        });

        if (modalClose) {
            modalClose.addEventListener("click", function () {
                modal.classList.remove("show");

                if (thankYou) {
                    thankYou.style.display = "none";
                }
            });
        }

        modal.addEventListener("click", function (e) {
            if (e.target === modal) {
                modal.classList.remove("show");

                if (thankYou) {
                    thankYou.style.display = "none";
                }
            }
        });

        if (donateForm) {
            donateForm.addEventListener("submit", function (e) {
                e.preventDefault();

                if (thankYou) {
                    thankYou.style.display = "block";
                }

                donateForm.reset();

                setTimeout(function () {
                    modal.classList.remove("show");

                    if (thankYou) {
                        thankYou.style.display = "none";
                    }
                }, 2500);
            });
        }

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                modal.classList.remove("show");

                if (thankYou) {
                    thankYou.style.display = "none";
                }
            }
        });
    }

    /* 8. ABOUT US PAGE ANIMATIONS */
    const aboutPage = document.querySelector("body.aboutpage");

    if (aboutPage) {
        const revealElements = aboutPage.querySelectorAll(
            "main > h1, main > h2, main > p, main > section, main > table"
        );

        if ("IntersectionObserver" in window) {
            const aboutObserver = new IntersectionObserver(
                function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.12 }
            );

            revealElements.forEach(function (element, index) {
                element.classList.add("about-reveal");
                element.style.transitionDelay = (index * 0.08) + "s";
                aboutObserver.observe(element);
            });
        } else {
            revealElements.forEach(function (el) {
                el.classList.add("is-visible");
            });
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

                    requestAnimationFrame(function () {
                        aboutExtra.classList.add("is-open");
                    });

                    readMoreBtn.textContent = "Read Less";
                    readMoreBtn.setAttribute("aria-expanded", "true");
                } else {
                    aboutExtra.classList.remove("is-open");

                    readMoreBtn.textContent = "Read More About Us";
                    readMoreBtn.setAttribute("aria-expanded", "false");

                    setTimeout(function () {
                        if (!aboutExtra.classList.contains("is-open")) {
                            aboutExtra.hidden = true;
                        }
                    }, 400);
                }
            });
        }
    }

    /* 9. COUNTER (ABOUT PAGE) */
    const counters = document.querySelectorAll(".counter");

    if (counters.length) {
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        function animate(el) {
            const target = parseInt(el.dataset.target, 10) || 0;

            if (reduceMotion) {
                el.textContent = target;
                return;
            }

            const duration = 1200;
            const start = performance.now();

            function frame(now) {
                const p = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3);

                el.textContent = Math.round(target * eased);

                if (p < 1) {
                    requestAnimationFrame(frame);
                }
            }

            requestAnimationFrame(frame);
        }

        if ("IntersectionObserver" in window) {
            const counterObserver = new IntersectionObserver(
                function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            animate(entry.target);
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.5 }
            );

            counters.forEach(function (c) {
                counterObserver.observe(c);
            });
        } else {
            counters.forEach(animate);
        }
    }

    /* 10. SCROLL PROGRESS BAR */
    const bar = document.querySelector(".scroll-progress");

    if (bar) {
        window.addEventListener("scroll", function () {
            const scrollableHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            const scrolled = scrollableHeight > 0
                ? window.scrollY / scrollableHeight
                : 0;

            bar.style.width = (scrolled * 100) + "%";
        });
    }

    /* 11. TEAM TABLE STAGGER (ABOUT PAGE) */
    const rows = document.querySelectorAll(
        ".aboutpage .team-table tr:not(:first-child)"
    );

    if (rows.length && "IntersectionObserver" in window) {
        const rowObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("row-show");
                    }
                });
            },
            { threshold: 0.2 }
        );

        rows.forEach(function (row, i) {
            row.classList.add("row-hidden");
            row.style.transitionDelay = (i * 0.15) + "s";
            rowObserver.observe(row);
        });
    } else {
        rows.forEach(function (row) {
            row.classList.add("row-show");
        });
    }

    /* 12. PILLAR CARDS: REVEAL + 3D TILT (ABOUT PAGE) */
    const pillars = document.querySelectorAll(".aboutpage .pillar");

    if (pillars.length) {
        if ("IntersectionObserver" in window) {
            const pillarObserver = new IntersectionObserver(
                function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.15 }
            );

            pillars.forEach(function (card, i) {
                card.classList.add("about-reveal");
                card.style.transitionDelay = (i * 0.12) + "s";
                pillarObserver.observe(card);
            });
        } else {
            pillars.forEach(function (card) {
                card.classList.add("is-visible");
            });
        }

        pillars.forEach(function (card) {
            card.addEventListener("mousemove", function (e) {
                const r = card.getBoundingClientRect();

                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;

                card.style.transform = `translateY(-8px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
            });

            card.addEventListener("mouseleave", function () {
                card.style.transform = "";
            });
        });
    }

    /* 13. BANNER FADE-IN ON LOAD (ABOUT PAGE) */
    const banner = document.querySelector(".aboutpage .home-banner");

    if (banner) {
        setTimeout(function () {
            banner.classList.add("banner-loaded");
        }, 100);
    }

    /* 14. CONTACT FORM SUBMISSION */
    const form = document.getElementById("contactForm");

    if (form) {
        const submitButton = form.querySelector(".submit-btn");
        const originalButtonHTML = submitButton
            ? submitButton.innerHTML
            : "";

        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            // Validate the required fields
            if (!form.reportValidity()) {
                return;
            }

            // Check the Formspree endpoint
            const formspreeURL = form.action;

            if (
                !/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(formspreeURL) ||
                formspreeURL.includes("YOUR_FORM_ID")
            ) {
                alert(
                    "Please check your Formspree URL in Contact us.html."
                );
                return;
            }

            // Prevent duplicate submissions
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML =
                    '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }

            try {
                // Send the enquiry to Formspree
                const response = await fetch(formspreeURL, {
                    method: "POST",
                    body: new FormData(form),
                    headers: {
                        Accept: "application/json"
                    }
                });

                if (response.ok) {
                    alert(
                        "Thank you! Your enquiry has been sent successfully."
                    );

                    // Reset the form only after successful submission
                    form.reset();
                } else {
                    let errorMessage =
                        "Your enquiry could not be sent. Please check your Formspree account and try again.";

                    try {
                        const result = await response.json();

                        if (result.errors && result.errors.length > 0) {
                            errorMessage = result.errors
                                .map(function (error) {
                                    return error.message;
                                })
                                .join("\n");
                        }
                    } catch (error) {
                        // Keep the default error message
                    }

                    alert(errorMessage);

                    console.error(
                        "Formspree response error:",
                        response.status
                    );
                }
            } catch (error) {
                alert(
                    "A connection error occurred. Please check your internet connection and try again."
                );

                console.error(
                    "Formspree submission error:",
                    error
                );
            } finally {
                // Restore the submit button
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonHTML;
                }
            }
        });
    }

    /* 15. AUTO-FILL SUBJECT FROM URL */
    const urlParams = new URLSearchParams(window.location.search);
    const subjectParam = urlParams.get("subject");

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

    infoItems.forEach(function (item) {
        const tooltip = document.createElement("span");
        tooltip.className = "copy-tooltip";
        tooltip.textContent = "Copied!";
        item.appendChild(tooltip);

        item.addEventListener("click", function () {
            const valueElement = item.querySelector(".value");

            if (!valueElement) return;

            const textToCopy = valueElement.textContent.trim();

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy)
                    .then(function () {
                        item.classList.add("copied");

                        setTimeout(function () {
                            item.classList.remove("copied");
                        }, 2000);
                    })
                    .catch(function () {
                        alert(
                            "Unable to copy automatically. Please copy this information manually: " +
                            textToCopy
                        );
                    });
            } else {
                alert(
                    "Clipboard access is unavailable. Please copy this information manually: " +
                    textToCopy
                );
            }
        });
    });

    /* 17. BULLETPROOF CONTACT SCROLL REVEAL */
    const contactElements = document.querySelectorAll(
        ".contact-header, .info-item, .enquiry-section"
    );

    if (contactElements.length) {
        contactElements.forEach(function (el) {
            el.style.opacity = "0";
            el.style.transform = "translateY(40px)";
            el.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";
        });

        if ("IntersectionObserver" in window) {
            const revealOnScroll = new IntersectionObserver(
                function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = "1";
                            entry.target.style.transform = "translateY(0)";
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: "0px 0px -50px 0px"
                }
            );

            contactElements.forEach(function (el) {
                revealOnScroll.observe(el);
            });
        } else {
            contactElements.forEach(function (el) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            });
        }
    }

    /* 18. CONTACT BANNER FADE-IN */
    const contactBanner = document.querySelector(
        ".contactpage .home-banner"
    );

    if (contactBanner) {
        setTimeout(function () {
            contactBanner.classList.add("banner-loaded");
        }, 100);
    }

    /* 19. FULLSCREEN MAP MODAL */
    const expandBtns = document.querySelectorAll(".map-expand-btn");

    if (expandBtns.length) {
        const mapModal = document.createElement("div");
        mapModal.className = "map-modal";

        mapModal.innerHTML = `
            <button class="map-modal-close" aria-label="Close map">&times;</button>
            <iframe src="" allowfullscreen="" loading="lazy"></iframe>
        `;

        document.body.appendChild(mapModal);

        const modalIframe = mapModal.querySelector("iframe");
        const modalClose = mapModal.querySelector(".map-modal-close");

        expandBtns.forEach(function (btn) {
            btn.addEventListener("click", function () {
                const mapIframe = btn.parentElement.querySelector("iframe");

                if (mapIframe) {
                    modalIframe.src = mapIframe.src;
                    mapModal.classList.add("show");
                }
            });
        });

        function closeMapModal() {
            mapModal.classList.remove("show");

            setTimeout(function () {
                modalIframe.src = "";
            }, 300);
        }

        modalClose.addEventListener("click", closeMapModal);

        mapModal.addEventListener("click", function (e) {
            if (e.target === mapModal) {
                closeMapModal();
            }
        });

        document.addEventListener("keydown", function (e) {
            if (
                e.key === "Escape" &&
                mapModal.classList.contains("show")
            ) {
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
    const existingItem = cart.find(function (item) {
        return item.name === name;
    });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    updateCartUI();
}

function updateCartUI() {
    const cartItemsDiv = document.getElementById("cart-items");
    const cartTotalSpan = document.getElementById("cart-total");

    if (!cartItemsDiv) return;

    cartItemsDiv.innerHTML = "";
    total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML =
            '<p class="empty-cart">Your cart is currently empty.</p>';
    } else {
        cart.forEach(function (item, index) {
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

    if (cartTotalSpan) {
        cartTotalSpan.textContent = total;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function checkout() {
    if (cart.length === 0) {
        alert(
            "Your cart is empty! Please add some textbooks first."
        );
        return;
    }

    const totalItems = cart.reduce(function (sum, item) {
        return sum + item.quantity;
    }, 0);

    const confirmCheckout = confirm(
        `You are about to purchase ${totalItems} items for a total of R${total}.\n\nProceed to payment?`
    );

    if (confirmCheckout) {
        alert(
            "Thank you for your purchase! Your order has been placed."
        );

        cart = [];
        updateCartUI();
    }
}


/* 21. TEXTBOOK PAGE SCROLL REVEAL */

document.addEventListener("DOMContentLoaded", function () {
    const textbookElements = document.querySelectorAll(
        ".textbookpage .main-title, " +
        ".textbookpage .textbook, " +
        ".textbookpage .shopping-cart, " +
        ".textbookpage .info-section"
    );

    if (textbookElements.length) {
        if ("IntersectionObserver" in window) {
            const textbookObserver = new IntersectionObserver(
                function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: "0px 0px -50px 0px"
                }
            );

            textbookElements.forEach(function (el) {
                el.classList.add("reveal-scroll");
                textbookObserver.observe(el);
            });
        } else {
            textbookElements.forEach(function (el) {
                el.classList.add("is-visible");
            });
        }
    }
});


/* 25. SUBJECTS PAGE SCROLL REVEAL */

document.addEventListener("DOMContentLoaded", function () {
    const subjectElements = document.querySelectorAll(
        ".subjects-page .subject-card, " +
        ".subjects-page .table-container, " +
        ".subjects-page .online-session-banner, " +
        ".subjects-page .inperson-session-banner, " +
        ".subjects-page .features-list"
    );

    if (subjectElements.length) {
        if ("IntersectionObserver" in window) {
            const subjectObserver = new IntersectionObserver(
                function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: "0px 0px -50px 0px"
                }
            );

            subjectElements.forEach(function (el) {
                el.classList.add("reveal-scroll");
                subjectObserver.observe(el);
            });
        } else {
            subjectElements.forEach(function (el) {
                el.classList.add("is-visible");
            });
        }
    }
});


// LIGHTBOX for the homepage images (with thumbnail strip)

document.addEventListener("DOMContentLoaded", function () {
    const images = Array.from(
        document.querySelectorAll(".lightbox-img")
    );

    const box = document.getElementById("lightbox");

    if (!box || images.length === 0) return;

    const bigImg = document.getElementById("lbImage");
    const caption = document.getElementById("lbCaption");
    const thumbBar = document.getElementById("lbThumbs");

    if (!bigImg || !caption || !thumbBar) return;

    let current = 0;

    const thumbs = images.map(function (img, i) {
        const t = document.createElement("img");

        t.src = img.src;
        t.alt = img.alt;

        t.addEventListener("click", function () {
            show(i);
        });

        thumbBar.appendChild(t);

        return t;
    });

    function show(i) {
        current = (i + images.length) % images.length;

        bigImg.src = images[current].src;
        bigImg.alt = images[current].alt;
        caption.textContent = images[current].alt;

        thumbs.forEach(function (t, n) {
            t.classList.toggle("active", n === current);
        });
    }

    function open(i) {
        show(i);
        box.classList.add("open");
    }

    function close() {
        box.classList.remove("open");
    }

    images.forEach(function (img, i) {
        img.addEventListener("click", function () {
            open(i);
        });
    });

    const closeButton = document.getElementById("lbClose");
    const previousButton = document.getElementById("lbPrev");
    const nextButton = document.getElementById("lbNext");

    if (closeButton) {
        closeButton.addEventListener("click", close);
    }

    if (previousButton) {
        previousButton.addEventListener("click", function () {
            show(current - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", function () {
            show(current + 1);
        });
    }

    box.addEventListener("click", function (e) {
        if (e.target === box) {
            close();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (!box.classList.contains("open")) return;

        if (e.key === "Escape") {
            close();
        }

        if (e.key === "ArrowLeft") {
            show(current - 1);
        }

        if (e.key === "ArrowRight") {
            show(current + 1);
        }
    });
});
