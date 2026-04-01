document.addEventListener('DOMContentLoaded', function() {
  const scrollText = document.querySelector('.scroll-text');
  
  if (scrollText) {
    // 1. Duplicar el texto para el efecto infinito
    const originalText = scrollText.textContent.trim();
    scrollText.textContent = originalText + ' • ' + originalText + ' • ';
    
    // 2. Ajustar velocidad según el ancho real del texto
    const textWidth = scrollText.scrollWidth;
    scrollText.style.animationDuration = `${textWidth / 20}s`;
    
    console.log('Animación iniciada. Duración:', scrollText.style.animationDuration);
  } else {
    console.error('No se encontró el elemento .scroll-text');
  }
});