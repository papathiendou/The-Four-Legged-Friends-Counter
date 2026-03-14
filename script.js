document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Animations ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Cart Sidebar logic ---
    const cartBtn = document.querySelector('.cart-btn');
    const closeCartBtn = document.querySelector('.close-cart');
    const closeCartBtn2 = document.querySelector('.close-cart-btn'); // btn inside empty cart
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const quickAddBtns = document.querySelectorAll('.quick-add');
    const cartCount = document.querySelector('.cart-count');

    let itemsInCart = 0;

    const openCart = () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeCart = () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
    });

    closeCartBtn.addEventListener('click', closeCart);
    if(closeCartBtn2) closeCartBtn2.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Add to cart simulation
    quickAddBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Increment logic
            itemsInCart++;
            cartCount.textContent = itemsInCart;
            
            // Visual feedback on button
            const originalText = btn.textContent;
            btn.textContent = "✓ Ajouté";
            btn.style.backgroundColor = "var(--clr-dark)";
            btn.style.color = "#fff";
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = "";
                btn.style.color = "";
            }, 2000);

            // Open cart
            openCart();
        });
    });

    // Mobile menu alert (demo)
    const mobileMenu = document.querySelector('.mobile-menu-btn');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            alert('Menu mobile cliqué !');
        });
    }
});
