const animateCSS = (element, animation) => {
    const prefix = 'animate__';
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, `${prefix}${animation}`);
};
