let currentIndex = 0;
const images = document.querySelectorAll('.banner-img');
const totalImages = images.length;

function changeSlide() {
    currentIndex = (currentIndex + 1) % totalImages; // Avança para a próxima imagem
    const newTransformValue = -100 * currentIndex + '%'; // Move o slide
    document.querySelector('.banner-slide').style.transform = `translateX(${newTransformValue})`;
}

// Muda a imagem a cada 3 segundos
setInterval(changeSlide, 3000);

// Seleciona o header
const header = document.querySelector('header');

// Adiciona um evento de scroll
window.addEventListener('scroll', () => {
    // Verifica se a página foi scrolada
    if (window.scrollY > 50) { // Altere 50 para o valor de deslocamento desejado
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

