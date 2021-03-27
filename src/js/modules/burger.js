const burger = (menuSelector, burgerSelector) => {
    const menuElem = document.querySelector(menuSelector),
          burgerElem = document.querySelector(burgerSelector);

    burgerElem.addEventListener('click', () => {

        if(window.screen.availWidth < 993) {
            if(menuElem.style.display == 'block') {
                menuElem.style.display = 'none';
            } else {
                menuElem.style.display = 'block';
            }
        }
    });

    window.addEventListener('resize', () => {
        if(window.screen.availWidth > 992) {
            menuElem.style.display = 'none';
        }
    });
};

export default burger;