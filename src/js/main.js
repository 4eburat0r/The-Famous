document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.buyButton');

    buttons.forEach((button, index) => {
        const buttonState = localStorage.getItem(`buttonState${index}`);
            if (buttonState === 'purchased') {
                button.innerHTML = "Купить";
                button.classList.remove('in-cart');
                localStorage.removeItem(`buttonState${index}`);
            } else {
                button.innerHTML = "✔ В корзине";
                button.classList.add('in-cart');
                localStorage.setItem(`buttonState${index}`, 'purchased');
            }
    });
});

document.addEventListener('htmx:beforeRequest', function(evt) {
    const button = evt.target;
    const loader = button.nextElementSibling;
    button.style.display = 'none';
    loader.style.display = 'block';
});

document.addEventListener('htmx:afterRequest', function(evt) {
    const button = evt.target;
    const loader = button.nextElementSibling;
    const index = Array.from(document.querySelectorAll('.buyButton')).indexOf(button);
    const response = evt.detail.xhr.response;
    if (response) {
        const buttonState = localStorage.getItem(`buttonState${index}`);
        if (buttonState === 'purchased') {
            button.innerHTML = "Купить";
            button.classList.remove('in-cart');
            localStorage.removeItem(`buttonState${index}`);
        } else {
            button.innerHTML = "✔ В корзине";
            button.classList.add('in-cart');
            localStorage.setItem(`buttonState${index}`, 'purchased');
        }
    }
    loader.style.display = 'none';
    button.style.display = 'block';
});
