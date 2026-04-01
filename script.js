document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. LÓGICA DEL TEXTO SCROLLING ---
    const scrollText = document.querySelector('.scroll-text');
    if (scrollText) {
        const originalText = scrollText.textContent.trim();
        scrollText.textContent = originalText + ' • ' + originalText + ' • ';
        const textWidth = scrollText.scrollWidth;
        scrollText.style.animationDuration = `${textWidth / 20}s`;
    }

    // --- 2. LÓGICA DEL MENÚ (RESETEO DE ESTADOS) ---
    const contenedorMenu = document.querySelector('.titulo-coleccion');
    const links = document.querySelectorAll('.menu-link');

    // Aseguramos que al cargar, ninguno tenga la clase active a menos que sea necesario
    links.forEach(link => link.classList.remove('active'));

    if (contenedorMenu) {
        contenedorMenu.addEventListener('mouseenter', function() {
            links.forEach(link => link.classList.remove('active'));
        });
    }

    // --- 3. LÓGICA DE LAS ESTRELLAS ---
    const ratingContainers = document.querySelectorAll('.rating');

    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        
        // Inicializar: si no hay rating, asegurar que están grises
        const initialRating = container.getAttribute('data-rating') || 0;
        updateStars(stars, initialRating);

        stars.forEach(star => {
            star.addEventListener('mouseover', function() {
                const value = this.getAttribute('data-value');
                updateStars(stars, value);
            });

            star.addEventListener('mouseout', function() {
                const savedRating = container.getAttribute('data-rating') || 0;
                updateStars(stars, savedRating);
            });

            star.addEventListener('click', function() {
                const newValue = this.getAttribute('data-value');
                const currentValue = container.getAttribute('data-rating');

                if (currentValue === newValue) {
                    container.setAttribute('data-rating', "0");
                    updateStars(stars, 0);
                } else {
                    container.setAttribute('data-rating', newValue);
                    updateStars(stars, newValue);
                }
            });
        });
    });

    function updateStars(stars, value) {
        stars.forEach(s => {
            if (parseInt(s.getAttribute('data-value')) <= parseInt(value)) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    }
});