document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. LÓGICA DEL TEXTO SCROLLING ---
    const scrollText = document.querySelector('.scroll-text');
    
    if (scrollText) {
        // Duplicar el texto para el efecto infinito
        const originalText = scrollText.textContent.trim();
        scrollText.textContent = originalText + ' • ' + originalText + ' • ';
        
        // Ajustar velocidad según el ancho real del texto
        const textWidth = scrollText.scrollWidth;
        scrollText.style.animationDuration = `${textWidth / 20}s`;
        
        console.log('Animación iniciada. Duración:', scrollText.style.animationDuration);
    } else {
        console.error('No se encontró el elemento .scroll-text');
    }

    // --- 2. LÓGICA DEL MENÚ (QUITAR AZUL AL ENTRAR) ---
    const contenedorMenu = document.querySelector('.titulo-coleccion');
    const links = document.querySelectorAll('.menu-link');

    if (contenedorMenu) {
        contenedorMenu.addEventListener('mouseenter', function() {
            // Cuando el mouse entra al menú, quitamos el azul fijo (clase active)
            links.forEach(link => {
                link.classList.remove('active');
            });
        });
    }
}); // <--- Este cierra el DOMContentLoaded inicial