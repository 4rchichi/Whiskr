/* Navigation initialization - Sets up mobile menu and scroll-to-hide header functionality */
document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('header');
    var toggle = document.querySelector('.menu-toggle');
    if (!header) return;

    /* Mobile menu toggle - Opens/closes mobile navigation menu */
    if (toggle) {
        toggle.addEventListener('click', function () {
            header.classList.toggle('menu-open');
        });
    }

    /* Close mobile menu - Closes menu when navigation link is clicked */
    header.querySelectorAll('nav a').forEach(function (link) {
        link.addEventListener('click', function () {
            header.classList.remove('menu-open');
        });
    });

    /* Scroll detection - Variables for tracking scroll position */
    var lastScrollTop = 0;
    var scrollThreshold = 100;
    var isScrolling = false;

    /* Hide header on scroll down - Hides header when scrolling down, shows when scrolling up */
    window.addEventListener('scroll', function () {
        if (isScrolling) return;

        isScrolling = true;
        requestAnimationFrame(function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            /* Only hide/show header after scrolling past threshold */
            if (scrollTop > scrollThreshold) {
                if (scrollTop > lastScrollTop && !header.classList.contains('menu-open')) {
                    /* Scrolling down - hide header */
                    header.classList.add('hidden');
                } else if (scrollTop < lastScrollTop) {
                    /* Scrolling up - show header */
                    header.classList.remove('hidden');
                }
            } else {
                /* Near top of page - always show header */
                header.classList.remove('hidden');
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            isScrolling = false;
        });
    });
});
