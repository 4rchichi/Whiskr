document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('header');
    var toggle = document.querySelector('.menu-toggle');
    if (!header) return;


    if (toggle) {
        toggle.addEventListener('click', function () {
            header.classList.toggle('menu-open');
        });
    }


    header.querySelectorAll('nav a').forEach(function (link) {
        link.addEventListener('click', function () {
            header.classList.remove('menu-open');
        });
    });


    var lastScrollTop = 0;
    var scrollThreshold = 100;
    var isScrolling = false;

    window.addEventListener('scroll', function () {
        if (isScrolling) return;

        isScrolling = true;
        requestAnimationFrame(function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;


            if (scrollTop > scrollThreshold) {
                if (scrollTop > lastScrollTop && !header.classList.contains('menu-open')) {

                    header.classList.add('hidden');
                } else if (scrollTop < lastScrollTop) {

                    header.classList.remove('hidden');
                }
            } else {

                header.classList.remove('hidden');
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            isScrolling = false;
        });
    });
});
