;(function() {

    // =================================================================
    //
    //                     Main Page Functionality
    //
    // =================================================================
    // Coded by Danny Pearson



    // =============== Initialise Variables & DOM Cache  ===============

    const breakPoints = {
        phone   : 599,
        tabPort : 600,
        tabLand : 900
    }

    let body    = document.body;
    let logo    = document.querySelector(".logo");
    let banner  = document.querySelector(".banner__inner");
    let nav     = document.querySelector(".navbar__inner");
    let navList = document.querySelector(".nav-list");
    let social  = document.querySelector(".social-bar");
    let menuBtn = document.querySelector(".menu-btn");
    let modal   = document.querySelector(".modal");
    let mInner  = document.querySelector(".modal__inner");





    // ================= Cross-Site Cookie Settings  ===================





    // ================= Restructre Header on Resize  ==================

    const calcScreen = () => window.innerWidth;     // Determine screen width.

    const responsiveHeader  = () => calcScreen() <= breakPoints.phone ? nav.insertBefore(logo, nav.firstChild) : banner.insertBefore(logo, banner.firstChild);      // Move logo into nav bar when using phone.
    const menuInsideModal   = () => calcScreen() <= breakPoints.phone ? mInner.appendChild(navList) : nav.insertBefore(navList, nav.firstChild);                    // Move navigation inside of modal when using phone.
    const socialInsideModal = () => calcScreen() <= breakPoints.phone ? mInner.appendChild(social) : nav.insertBefore(social, nav.firstChild);                      // Move social media icons into modal when using phone.





    // =================== Menu Open/Close Functions  ==================

    class Menu {

        constructor(menuBtnOpen, menuBtnClose, modalOpen, modalClose) {

            this.menuBtnOpen = menuBtnOpen;
            this.menuBtnClose = menuBtnClose;
            this.modalOpen = modalOpen;
            this.modalClose = modalClose;

            this.isOpen = false;
        }

        reset(btn, modal) {                             // Remove all animation classes.

            btn.classList.remove(this.menuBtnClose, this.menuBtnOpen);
            modal.classList.remove(this.modalClose, this.modalOpen);

            return this;
        }
        
        swClass(el, newClass, oldClass) {               // Switch animation classes.

            el.classList.remove(oldClass)
            void el.offsetWidth;                        // DOM reflow to restart animation.
            el.classList.add(newClass)

            return this;
        }

        changeState(b) { return this.isOpen = b }

        open(btn, modal) {

            const {menuBtnOpen, menuBtnClose, modalOpen, modalClose} = this;

            return this.swClass(btn, menuBtnOpen, menuBtnClose, this.swClass(modal, modalOpen, modalClose, this.changeState(true)));
        }

        close(btn, modal) {
            
            const {menuBtnOpen, menuBtnClose, modalOpen, modalClose} = this;

            return this.swClass(btn, menuBtnClose, menuBtnOpen, this.swClass(modal, modalClose, modalOpen, this.changeState(false)));
        }
    }

    const menu = new Menu("menu-btn-open", "menu-btn-close", "modal-open", "modal-close");      // Initialise menu with animation class list.





    // ========================= Handle Events  ========================

    menuBtn.addEventListener("click", function(e) {

        e.preventDefault;

        if(!menu.isOpen) {

            menu.open(this, modal);

            body.classList.add("no-scroll");

        } else if(menu.isOpen) {

            menu.close(this, modal);
            
            body.classList.remove("no-scroll");
        }   
    });

    menuBtn.addEventListener("animationend", function(e) {
    
        e.preventDefault;   

        if(!menu.isOpen) return menu.reset(this, modal);                                                // Remove animation classes once finished running.
    });

    modal.addEventListener("animationend", function(e) {

        e.preventDefault;   

        if(calcScreen() >= breakPoints.tabPort && !menu.isOpen) return menu.reset(menuBtn, this);       // Reset when modal closed due to resizing. This stops an invisible modal preventing use.
    });

    window.addEventListener("resize", () => {

        if(calcScreen() >= breakPoints.tabPort && menu.isOpen) {

            menu.close(menuBtn, modal);

            body.classList.remove("no-scroll");

        } else if(!menu.isOpen                                                                          // Check for classes so function doesn't run on every resize.
                && menuBtn.classList.contains(menu.menuBtnClose, menu.menuBtnOpen) 
                || modal.classList.contains(menu.modalClose, menu.modalOpen)) {

            menu.reset(menuBtn, modal);

            body.classList.remove("no-scroll");
        }
    });

    ["resize", "load"].forEach(e => window.addEventListener(e, () => {                                   // Run functions both on load and when resized to stay responsive

        responsiveHeader();
        menuInsideModal();
        socialInsideModal();

    }));

})();



