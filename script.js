window.onload = function () {
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const faixaCep = document.getElementById('faixa-cep');
    const localidade = document.getElementById('localidade');
    const alterarCep = document.getElementById('alterar-cep');
    const cepInput = document.getElementById('cep');
    const form = document.getElementById('cep-form');
    const savedCep = localStorage.getItem('cep');
    const savedLocalidade = localStorage.getItem('localidade');
  
    if (savedCep && savedLocalidade) {
      faixaCep.style.display = 'flex';
      localidade.textContent = `${savedLocalidade} (${savedCep})`;
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
      const cidade = document.getElementById('cidade').value;
      const estado = document.getElementById('estado').value;
  
      if (cep && cidade && estado) {
        localStorage.setItem('cep', cep);
        localStorage.setItem('localidade', `${cidade}, ${estado}`);
  
        localidade.textContent = `${cidade}, ${estado} (${cep})`;
        faixaCep.style.display = 'flex';

        modal.style.display = 'none';
      }
    });

    alterarCep.addEventListener('click', function (e) {
      e.preventDefault();
      modal.style.display = 'flex';

      const cep = localStorage.getItem('cep');
      const [cidade, estado] = (localStorage.getItem('localidade') || '').split(', ');
  
      if (cep) cepInput.value = cep;
      if (cidade) document.getElementById('cidade').value = cidade;
      if (estado) document.getElementById('estado').value = estado;
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

