document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.buyButton');
    const loaders = document.querySelectorAll('.loader');

    buttons.forEach((button, index) => {
        const buttonState = localStorage.getItem(`buttonState${index}`);

        if (buttonState === 'purchased') {
            button.innerHTML = "&#10004;&nbsp;&nbsp;&nbsp;В корзине"; 
            button.classList.add('in-cart'); 
        }

        button.addEventListener('click', function() {
            const loader = loaders[index];

            if (localStorage.getItem(`buttonState${index}`) === 'purchased') {
                loader.style.display = 'block'; 
                button.style.display = 'none';

                fetch('https://jsonplaceholder.typicode.com/posts/1')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem(`response${index}`, JSON.stringify(data));
                        
                        button.innerHTML = "Купить"; 
                        button.classList.remove('in-cart'); 

                        localStorage.removeItem(`response${index}`); 
                        localStorage.removeItem(`buttonState${index}`); 
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    })
                    .finally(() => {
                        setTimeout(() => {
                            loader.style.display = 'none'; 
                            button.style.display = 'block';
                            button.classList.add('buy'); 
                        }, 1000);
                    });
            } 
            else 
            {
                loader.style.display = 'block'; 
                button.style.display = 'none';

                fetch('https://jsonplaceholder.typicode.com/posts/1')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem(`response${index}`, JSON.stringify(data));
                        
                        button.innerHTML = "&#10004;&nbsp;&nbsp;&nbsp;В корзине";
                        button.classList.remove('buy'); 

                        localStorage.setItem(`buttonState${index}`, 'purchased'); 
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    })
                    .finally(() => {
                        setTimeout(() => {
                            loader.style.display = 'none'; 
                            button.style.display = 'block'; 
                            button.classList.add('in-cart'); 
                        }, 1000);
                    });
            }
        });
    });
});
