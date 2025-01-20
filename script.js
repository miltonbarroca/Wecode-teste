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

                    cidadeInput.value = data.localidade || '';
                    estadoSelect.value = data.uf || '';

                    localStorage.setItem('cep', cep);
                    localidade.textContent = `${data.localidade}, ${data.uf}`;
    
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

const header = document.querySelector('header');
const logo = document.querySelector('#bebece-logo');
const anguloImagem = document.querySelector('.icon-produto');

// Adiciona o evento de scroll
window.addEventListener('scroll', () => {

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        logo.setAttribute('src', 'img/logo-preto.png');
        anguloImagem.setAttribute('src', 'img/angulo-direito-preto.png');
    } else {
        header.classList.remove('scrolled');
        logo.setAttribute('src', 'img/logo-branco.png');
        anguloImagem.setAttribute('src', 'img/angulo-direito.png');
    }
});

//carrossel
const slideContainer = document.querySelector('.banner-slide');
let index = 0;

function changeSlide() {
    index = (index + 1) % 2;
    slideContainer.style.transform = `translateX(-${index * 100}%)`;
}


setInterval(changeSlide, 5000);

//menu de itens
document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach((menuItem) => {
        menuItem.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            menuItems.forEach((item) => {
                if (item !== menuItem) {
                    item.classList.remove("active");
                }
            });

            menuItem.classList.toggle("active");
        });
    });

    document.addEventListener("click", () => {
        menuItems.forEach((menuItem) => {
            menuItem.classList.remove("active");
        });
    });
});

// menu area produtos

document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("menu-produtos");
    const linkProdutos = document.getElementById("link-produtos");
    const header = document.querySelector("header"); // Certifique-se de que o `header` existe no HTML
    const logo = document.getElementById("bebece-logo");
    const anguloImagem = document.querySelector(".icon-produto");
    const links = document.querySelectorAll(".menu-links a");
    const images = document.querySelectorAll(".product-image");

    // Função para alternar o estilo do header
    function changeHeaderToWhite() {
        header.classList.add("scrolled");
        logo.setAttribute("src", "img/logo-preto.png");
        anguloImagem.setAttribute("src", "img/angulo-direito-preto.png");
    }

    // Alterna o menu ao clicar no link Produtos
    linkProdutos.addEventListener("click", function (event) {
        event.preventDefault();
        menu.style.display = menu.style.display === "block" ? "none" : "block";
        changeHeaderToWhite(); // Chama a função para alterar o header
    });

    // Oculta o menu ao clicar fora dele
    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && event.target !== linkProdutos) {
            menu.style.display = "none";
        }
    });

    // Exibe a imagem correspondente ao item do menu
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const selectedImage = link.getAttribute("data-image");

            images.forEach(image => {
                image.style.display = "none";
            });

            const imageToShow = document.getElementById(selectedImage);
            if (imageToShow) {
                imageToShow.style.display = "block";
            }
        });
    });

    // Evento de scroll para modificar o header dinamicamente
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
            logo.setAttribute("src", "img/logo-preto.png");
            anguloImagem.setAttribute("src", "img/angulo-direito-preto.png");
        } else {
            header.classList.remove("scrolled");
            logo.setAttribute("src", "img/logo-branco.png");
            anguloImagem.setAttribute("src", "img/angulo-direito.png");
        }
    });
});

// Obter o modal e o botão de fechar
var modal = document.getElementById("modalCarrinho");
var btnCarrinho = document.querySelectorAll(".btn-carrinho");
var span = document.getElementsByClassName("close")[0];
var tamanhoEscolhido = null; // Variável para armazenar o tamanho escolhido

// Quando clicar no botão de adicionar ao carrinho, abrir o modal
btnCarrinho.forEach(function(btn) {
    btn.onclick = function(event) {
        event.preventDefault(); // Impede o link de redirecionar
        var produto = this.getAttribute("data-product");
        document.getElementById("modalCarrinho").querySelector("h2").textContent = "Escolha o tamanho do " + produto;
        modal.style.display = "block";
    };
});

// Quando clicar no botão de fechar, fechar o modal
span.onclick = function() {
    modal.style.display = "none";
}

// Fechar o modal quando clicar fora da caixa de conteúdo
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Selecionar tamanho ao clicar no botão de tamanho
var tamanhoBtns = document.querySelectorAll(".tamanho-btn");
tamanhoBtns.forEach(function(btn) {
    btn.onclick = function() {
        tamanhoEscolhido = this.getAttribute("data-size");
        console.log("Tamanho escolhido: " + tamanhoEscolhido);
        // Destacar o botão selecionado
        tamanhoBtns.forEach(function(b) { b.style.backgroundColor = "#f0f0f0"; });
        this.style.backgroundColor = "#ddd"; // Destaque do botão selecionado
    };
});

// Adicionar ao carrinho
document.getElementById("adicionarCarrinho").onclick = function() {
    if (tamanhoEscolhido) {
        console.log("Tamanho " + tamanhoEscolhido + " adicionado ao carrinho.");
        // Lógica para adicionar ao carrinho aqui
        modal.style.display = "none"; // Fechar o modal após adicionar
    } else {
        alert("Por favor, escolha um tamanho.");
    }
};