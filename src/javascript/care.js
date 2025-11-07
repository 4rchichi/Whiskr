/* Care menu elements - Selects menu items and content sections */
const menuItems = document.querySelectorAll('.menu-item');
const contentSections = document.querySelectorAll('.content-section');

/* Hover navigation - Switches care sections on menu item hover */
menuItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
        /* Removes active state from all menu items */
        menuItems.forEach(mi => mi.classList.remove('active'));

        /* Activates hovered menu item */
        this.classList.add('active');

        /* Gets section ID from data attribute */
        const sectionId = this.getAttribute('data-section');

        /* Hiddes all content sections */
        contentSections.forEach(section => section.classList.remove('active'));

        /* Shows matching content section */
        document.getElementById(sectionId).classList.add('active');
    });
});
