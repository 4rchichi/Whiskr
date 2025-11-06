
const menuItems = document.querySelectorAll('.menu-item');
const contentSections = document.querySelectorAll('.content-section');


menuItems.forEach(item => {
    item.addEventListener('mouseenter', function () {

        menuItems.forEach(mi => mi.classList.remove('active'));

        this.classList.add('active');

        const sectionId = this.getAttribute('data-section');

        contentSections.forEach(section => section.classList.remove('active'));

        document.getElementById(sectionId).classList.add('active');
    });
});
