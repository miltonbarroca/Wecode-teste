window.onload = function () {
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const faixaCep = document.getElementById('faixa-cep');
    const localidade = document.getElementById('localidade');
    const alterarCep = document.getElementById('alterar-cep');
    const cepInput = document.getElementById('cep');
    const form = document.getElementById('cep-form');
    const savedCep = localStorage.getItem('cep');
  
    // Se um CEP já estiver salvo, exibe na faixa
    if (savedCep) {
        faixaCep.style.display = 'flex';
        localidade.textContent = savedCep;
    } else {
        modal.style.display = 'flex';
    }
  
    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });
  
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
  
    form.addEventListener('submit', function (e) {
        e.preventDefault();
  
        const cep = cepInput.value;
  
        if (cep) {
            // Salva o CEP e exibe na faixa
            localStorage.setItem('cep', cep);
            localidade.textContent = cep;
            faixaCep.style.display = 'flex';
  
            modal.style.display = 'none';
        }
    });

    alterarCep.addEventListener('click', function (e) {
        e.preventDefault();
        modal.style.display = 'flex';

        // Preenche o campo de CEP no modal
        const cep = localStorage.getItem('cep');
        cepInput.value = cep || '';
    });
};

// efeito header

let currentIndex = 0;
const images = document.querySelectorAll('.banner-img');
const totalImages = images.length;

function changeSlide() {
    currentIndex = (currentIndex + 1) % totalImages;
    const newTransformValue = -100 * currentIndex + '%';
    document.querySelector('.banner-slide').style.transform = `translateX(${newTransformValue})`;
}

setInterval(changeSlide, 4000); // segundos

const header = document.querySelector('header');
const logo = document.getElementById('logo');
const iconProduto = document.querySelector('.icon-produto');

// Adiciona o evento de rolagem
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { 
        header.classList.add('scrolled');
        logo.setAttribute('src', 'img/logo-preto.png');
        iconProduto.setAttribute('src', 'img/angulo-direito-preto.png');
        } else {
        header.classList.remove('scrolled');
        logo.setAttribute('src', 'img/logo-branco.png');
        iconProduto.setAttribute('src', 'img/angulo-direito.png');
    }
});

