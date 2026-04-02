document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. LÓGICA DEL TEXTO SCROLLING (BARRA SUPERIOR) ---
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

    // --- 4. ANIMACIÓN DEL RECTÁNGULO AZUL Y TEXTO AL HACER SCROLL ---
    const observerOptions = {
        threshold: 0.2 // Se activa cuando se ve el 20% del elemento
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // PRIMERO: Animamos el contenedor (el rectángulo azul)
                entry.target.classList.add('aparecer');
                
                // SEGUNDO: Animamos el h2 que está adentro por si acaso tiene su propia clase
                const titulo = entry.target.querySelector('h2');
                if (titulo) {
                    titulo.classList.add('aparecer');
                }
                
                // Una vez que se anima, dejamos de observarlo para mejorar el rendimiento
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionamos el contenedor del rectángulo azul
    const contenedorTexto = document.querySelector('.texto-video');
    if (contenedorTexto) {
        observer.observe(contenedorTexto);
    }
    // --- ANIMACIÓN DE SUBTÍTULO (EFECTO SUBIDA) ---
const observerSubtitulo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Buscamos el h1 dentro del divisor
            const h1 = entry.target.querySelector('h1');
            if (h1) {
                h1.classList.add('revelar');
            }
            // Dejamos de observar para que no se repita la animación
            observerSubtitulo.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 }); // Se activa cuando se ve la mitad del elemento

// Empezamos a vigilar el contenedor del subtítulo
const divSubtitulo = document.querySelector('.divisor-subtitulo');
if (divSubtitulo) {
    observerSubtitulo.observe(divSubtitulo);
}
});