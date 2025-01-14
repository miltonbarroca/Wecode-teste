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

// Seleciona os elementos
const header = document.querySelector('header');
const logo = document.getElementById('logo');
const iconProduto = document.querySelector('.icon-produto'); // Seleciona o ícone de produtos

// Adiciona o evento de rolagem
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // Quando a página é rolada mais de 50px
        header.classList.add('scrolled');
        logo.setAttribute('src', 'img/logo-preto.png'); // Altera para logo preto
        iconProduto.setAttribute('src', 'img/angulo-direito-preto.png'); // Altera para ícone preto
    } else {
        header.classList.remove('scrolled');
        logo.setAttribute('src', 'img/logo-branco.png'); // Retorna para logo branco
        iconProduto.setAttribute('src', 'img/angulo-direito.png'); // Retorna para ícone original
    }
});

