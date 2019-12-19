;(function() {

    // =================================================================
    //
    //                     Main Page Functionality
    //
    // =================================================================
    // Coded by Danny Pearson





    // =============== Initialise Variables & DOM Cache  ===============

    const bp = {
        phone   : 599,
        tabPort : 600,
        tabLand : 900
    }

    let isOpen = false;

    let body    = document.body;
    let logo    = document.querySelector(".logo");
    let banner  = document.querySelector(".banner__inner");
    let nav     = document.querySelector(".navbar__inner");
    let navList = document.querySelector(".nav-list");
    let social  = document.querySelector(".social-bar");
    let menuBtn = document.querySelector(".menu-btn");
    let modal   = document.querySelector(".modal");
    let mInner  = document.querySelector(".modal__inner");

    const calcScreen = () => window.innerWidth || window.addEventListener("resize", () => window.innerWidth);

    const responsiveHeader  = () => calcScreen() <= bp.phone ? nav.insertBefore(logo, nav.firstChild) : banner.insertBefore(logo, banner.firstChild);
    const menuInsideModal   = () => calcScreen() <= bp.phone ? mInner.appendChild(navList) : nav.insertBefore(navList, nav.firstChild);
    const socialInsideModal = () => calcScreen() <= bp.phone ? mInner.appendChild(social) : nav.insertBefore(social, nav.firstChild);  





    // =================== Restructre DOM on Resize  ===================

    ["resize", "load"].forEach(e => window.addEventListener(e, () => {
        responsiveHeader();
        menuInsideModal();
        socialInsideModal();
    }));

    window.addEventListener("resize", () => {
        if(calcScreen() >= bp.tabPort && isOpen) {
            closeMenu(menuBtn);
        }
    });





    // =================== Menu Open/Close Functions  ==================

    const menuTransition = (el, rmClass, addClass) => {
        el.classList.remove(rmClass);
        void el.offsetWidth;
        el.classList.add(addClass);
    }

    const closeMenu = (el) => {
        menuTransition(el, "menu-btn-open", "menu-btn-close");
        menuTransition(modal, "modal-open", "modal-close");
        setTimeout(() => {
            el.classList.remove("menu-btn-close")
            modal.classList.remove("modal-close")
        }, 800);
        body.classList.remove("no-scroll");
        isOpen = false;
    }





    // ========================= Handle Events  ========================

    menuBtn.addEventListener("click", function(e) {

        e.preventDefault;

        if(!isOpen && !this.classList.contains("menu-btn-open") && !modal.classList.contains("modal-open")) {
            body.classList.add("no-scroll");
            menuTransition(this, "menu-btn-close", "menu-btn-open");
            menuTransition(modal, "modal-close", "modal-open");
            
            isOpen = true;
        } else if(isOpen && this.classList.contains("menu-btn-open") && modal.classList.contains("modal-open")) {
            closeMenu(this);
        }
        
    });
})();



