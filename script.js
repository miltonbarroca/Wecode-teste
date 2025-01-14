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


// Seleciona o header e a imagem do logo
const header = document.querySelector('header');
const logo = document.querySelector('#logo'); // Certifique-se de que o ID está correto

// Adiciona o evento de scroll
window.addEventListener('scroll', () => {
    // Verifica se a página foi rolada
    if (window.scrollY > 50) { // Ajuste 50 conforme a altura que deseja
        header.classList.add('scrolled');
        logo.setAttribute('src', 'img/logo-preto.png'); // Altera para logo preto
    } else {
        header.classList.remove('scrolled');
        logo.setAttribute('src', 'img/logo-branco.png'); // Retorna para logo branco
    }
});
