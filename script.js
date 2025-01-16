window.onload = function () {
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const faixaCep = document.getElementById('faixa-cep');
    const localidade = document.getElementById('localidade');
    const alterarCep = document.getElementById('alterar-cep');
    const cepInput = document.getElementById('cep');
    const cidadeInput = document.getElementById('input-cidade');
    const estadoSelect = document.getElementById('estado');
    const form = document.getElementById('cep-form');
    const savedCep = localStorage.getItem('cep');

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

    // Limitar o CEP a 8 dígitos, remover caracteres não numéricos e adicionar hífen
    cepInput.addEventListener('input', function () {
        let sanitizedValue = this.value.replace(/\D/g, '');
        if (sanitizedValue.length > 8) {
            sanitizedValue = sanitizedValue.slice(0, 8);
        }
        if (sanitizedValue.length > 5) {
            this.value = sanitizedValue.slice(0, 5) + '-' + sanitizedValue.slice(5);
        } else {
            this.value = sanitizedValue;
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const cep = cepInput.value.replace(/\D/g, '');

        if (cep.length === 8) {
            buscarCidadeEstado(cep);
        } else {
            alert('Por favor, insira um CEP válido com 8 dígitos.');
        }
    });

    alterarCep.addEventListener('click', function (e) {
        e.preventDefault();
        modal.style.display = 'flex';
        const cep = localStorage.getItem('cep');
        cepInput.value = cep || '';
    });

    function buscarCidadeEstado(cep) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert('CEP não encontrado!');
                } else {
                    // Atualiza os campos no modal
                    cidadeInput.value = data.localidade || '';
                    estadoSelect.value = data.uf || '';
    
                    // Salva o CEP no localStorage
                    localStorage.setItem('cep', cep);
                    localidade.textContent = `${data.localidade}, ${data.uf}`; // Exibe cidade e estado juntos no faixaCep
    
                    faixaCep.style.display = 'flex';
                    modal.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Erro ao buscar informações do CEP:', error);
                alert('Erro ao buscar informações do CEP.');
            });
    }
    
};
// Seleciona o header, a imagem do logo e a imagem do ângulo
const header = document.querySelector('header');
const logo = document.querySelector('#logo'); // Certifique-se de que o ID está correto
const anguloImagem = document.querySelector('.icon-produto'); // Certifique-se de que o ID da imagem do ângulo está correto

// Adiciona o evento de scroll
window.addEventListener('scroll', () => {
    // Verifica se a página foi rolada
    if (window.scrollY > 50) { // Ajuste 50 conforme a altura que deseja
        header.classList.add('scrolled');
        logo.setAttribute('src', 'img/logo-preto.png'); // Altera para logo preto
        anguloImagem.setAttribute('src', 'img/angulo-direito-preto.png'); // Altera para o ângulo direito
    } else {
        header.classList.remove('scrolled');
        logo.setAttribute('src', 'img/logo-branco.png'); // Retorna para logo branco
        anguloImagem.setAttribute('src', 'img/angulo-direito.png');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach((menuItem) => {
        menuItem.addEventListener("click", (e) => {
            // Impede o comportamento padrão do link
            e.preventDefault();

            // Fecha todos os outros submenus
            menuItems.forEach((item) => {
                if (item !== menuItem) {
                    item.classList.remove("active");
                }
            });

            // Alterna a classe 'active' no submenu clicado
            menuItem.classList.toggle("active");
        });
    });

    // Fecha o submenu ao clicar fora do menu
    document.addEventListener("click", (e) => {
        menuItems.forEach((menuItem) => {
            if (!menuItem.contains(e.target)) {
                menuItem.classList.remove("active");
            }
        });
    });
});
