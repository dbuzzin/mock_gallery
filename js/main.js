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
    let fullNav = document.querySelector(".navbar");
    let nav     = document.querySelector(".navbar__inner");
    let navList = document.querySelector(".nav-list");
    let social  = document.querySelector(".social-bar");
    let menuBtn = document.querySelector(".menu-btn");
    let modal   = document.querySelector(".modal");
    let mInner  = document.querySelector(".modal__inner");





    // ====================== Helper Functions  ========================

    const swClass = (el, newClass, oldClass) => {                               // Switch animation classes.

        if(el.classList.contains(oldClass)) el.classList.remove(oldClass);

        void el.offsetWidth;                                                    // DOM reflow to restart animation.

        if(!el.classList.contains(newClass)) el.classList.add(newClass);
    }

    const respond = (screen) => {

        const arr = Object.entries(breakPoints);
        const width = window.innerWidth;

        for(let [key, val] of arr) {

            if(screen === val) {

                if(key === "phone") return width <= val;

                else return width >= val;
                
            }
        }
    }

    const scrolled = () => {

        return window.scrollY >= 50 ? true : false;
    }

    const delay = (time, condition, bool) => {

        let t;

        return condition === bool ? t = time : t = 0;
    }





    // ================= Restructre Header on Resize  ==================

    const responsiveHeader  = () => respond(breakPoints.phone) ? nav.insertBefore(logo, nav.firstChild) : banner.insertBefore(logo, banner.firstChild);      // Move logo into nav bar when using phone.
    const menuInsideModal   = () => respond(breakPoints.phone) ? mInner.appendChild(navList) : nav.insertBefore(navList, nav.firstChild);                    // Move navigation inside of modal when using phone.
    const socialInsideModal = () => respond(breakPoints.phone) ? mInner.appendChild(social) : nav.insertBefore(social, nav.firstChild);                      // Move social media icons into modal when using phone.





    // ======================== Navbar Functions  ======================

    class Navbar {

        constructor(navbarClose, navbarOpen) {

            this.navbarClose = navbarClose;
            this.navbarOpen = navbarOpen;

            this.state = {
                isOpen: true
            }
        }

        reset(el) {

            el.classList.remove(this.navbarOpen, this.navbarClose);

            return this;
        }

        open(el, update) {

            const {navbarClose, navbarOpen} = this;

            update = () => this.state.isOpen = true;

            if(!this.state.isOpen) return swClass(el, navbarOpen, navbarClose, update());

            return this;
        }

        close(el, update) {

            const {navbarClose, navbarOpen} = this;

            update = () => this.state.isOpen = false;

            if(this.state.isOpen) return swClass(el, navbarClose, navbarOpen, update());

            return this;
        }
    }

    const navbar = new Navbar("navbar-close", "navbar-open");

    
    
    
    
    // =================== Menu Open/Close Functions  ==================

    class Menu {

        constructor(menuBtnOpen, menuBtnClose, menuBtnShrink, menuBtnGrow, modalOpen, modalClose) {

            this.menuBtnOpen = menuBtnOpen;
            this.menuBtnClose = menuBtnClose;
            this.menuBtnShrink = menuBtnShrink;
            this.menuBtnGrow = menuBtnGrow;
            this.modalOpen = modalOpen;
            this.modalClose = modalClose;

            this.state = {
                isOpen: false,
                isScaled: false
            }
        }

        reset(btn, modal) {                                                 // Remove all animation classes.

            btn.classList.remove(this.menuBtnClose, this.menuBtnOpen);
            modal.classList.remove(this.modalClose, this.modalOpen);

            return this;
        }

        grow(btn, update) {

            const {menuBtnShrink, menuBtnGrow} = this;

            update = () => this.state.isScaled = false;

            if(this.state.isScaled) return swClass(btn, menuBtnGrow, menuBtnShrink, update());

            return this;
        }

        shrink(btn, update) {

            const {menuBtnShrink, menuBtnGrow} = this;

            update = () => this.state.isScaled = true;

            if(scrolled()) return swClass(btn, menuBtnShrink, menuBtnGrow, update());

            return this;
        }

        open(btn, modal, update) {

            const {menuBtnOpen, menuBtnClose, modalOpen, modalClose} = this;

            update = () => this.state.isOpen = true;

            return  swClass(btn, menuBtnOpen, menuBtnClose, 
                    swClass(modal, modalOpen, modalClose, 
                    update()));
        }

        close(btn, modal, update) {
            
            const {menuBtnOpen, menuBtnClose, modalOpen, modalClose} = this;

            update = () => this.state.isOpen = false;

            return  swClass(btn, menuBtnClose, menuBtnOpen, 
                    swClass(modal, modalClose, modalOpen, 
                    update()));
        }
    }

    const menu = new Menu("menu-btn-open", "menu-btn-close", "menu-btn-shrink", "menu-btn-grow", "modal-open", "modal-close");      // Initialise menu with animation class list.





    // ========================= Handle Events  ========================

    menuBtn.addEventListener("click", function(e) {

        e.preventDefault;

        if(respond(breakPoints.phone)) {

            if(!menu.state.isOpen) {

                menu.grow(this, setTimeout(() => 
                menu.open(this, modal), delay(500, menu.state.isScaled, true)));

                body.classList.add("no-scroll"); 

            } else if(menu.state.isOpen) {

                menu.close(this, modal, setTimeout(() => 
                menu.shrink(this), delay(500, scrolled(), true))); 
                
                body.classList.remove("no-scroll");
            }   
        }   
    });

    window.addEventListener("scroll", function(e) {

        setTimeout(() => {

            if(respond(breakPoints.phone)) {

                if(scrolled()) {
    
                    navbar.close(fullNav);
                    
                    setTimeout(() => {

                        menu.shrink(menuBtn);

                    }, 1000);
        
                } else {
    
                    menu.grow(menuBtn);

                    setTimeout(() => {

                        navbar.open(fullNav);
                        
                    }, 500);
                }
            }
            
        }, 1000);

    });

    window.addEventListener("resize", () => {

        if(respond(breakPoints.tabPort)) {

            if(menu.state.isOpen) {

                menu.close(menuBtn, modal);

                setTimeout(() => {
                    
                    menu.reset(menuBtn, modal);

                }, 700);

                body.classList.remove("no-scroll");

            } else if(!menu.state.isOpen                                                                          // Check for classes so function doesn't run on every resize.
                    && menuBtn.classList.contains(menu.menuBtnClose, menu.menuBtnOpen) 
                    || modal.classList.contains(menu.modalClose, menu.modalOpen)) {

                // menu.reset(menuBtn, modal);

                body.classList.remove("no-scroll");
            }
        }
    });

    ["resize", "load"].forEach(e => window.addEventListener(e, () => {                                   // Run functions both on load and when resized to stay responsive

        responsiveHeader();
        menuInsideModal();
        socialInsideModal();

    }));

})();



