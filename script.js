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

//evento de scroll
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
    const header = document.querySelector("header");
    const logo = document.getElementById("bebece-logo");
    const anguloImagem = document.querySelector(".icon-produto");
    const links = document.querySelectorAll(".menu-links a");
    const images = document.querySelectorAll(".product-image");

    function changeHeaderToWhite() {
        header.classList.add("scrolled");
        logo.setAttribute("src", "img/logo-preto.png");
        anguloImagem.setAttribute("src", "img/angulo-direito-preto.png");
    }

    linkProdutos.addEventListener("click", function (event) {
        event.preventDefault();
        menu.style.display = menu.style.display === "block" ? "none" : "block";
        changeHeaderToWhite();
    });

    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && event.target !== linkProdutos) {
            menu.style.display = "none";
        }
    });

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

// Obter o modal
var modal = document.getElementById("modalCarrinho");
var btnCarrinho = document.querySelectorAll(".btn-carrinho");
var span = document.getElementsByClassName("close-carrinho")[0];
var tamanhoEscolhido = null;
var tamanhoBtns = document.querySelectorAll(".tamanho-btn");

modal.style.display = "none";

function abrirModalProduto(produtoNome, produtoImagem) {
    document.getElementById("modalProdutoNome").textContent = produtoNome;
    document.getElementById("modalProdutoImagem").src = produtoImagem;
    modal.style.display = "block";
}

function fecharModal() {
    modal.style.display = "none";
}

function selecionarTamanho(btn) {
    tamanhoEscolhido = btn.getAttribute("data-size");
    console.log("Tamanho escolhido: " + tamanhoEscolhido);
    tamanhoBtns.forEach(function(b) { b.style.backgroundColor = "#f0f0f0"; });
    btn.style.backgroundColor = "#ddd";
}

btnCarrinho.forEach(function(btn) {
    btn.onclick = function(event) {
        event.preventDefault();

        var produtoNome = this.getAttribute("data-product-name");
        var produtoImagem = this.getAttribute("data-product-image");

        abrirModalProduto(produtoNome, produtoImagem);
    };
});

span.onclick = fecharModal;

window.onclick = function(event) {
    if (event.target == modal) {
        fecharModal();
    }
};

tamanhoBtns.forEach(function(btn) {
    btn.onclick = function() {
        selecionarTamanho(this);
    };
});

document.getElementById("adicionarCarrinho").onclick = function() {
    if (tamanhoEscolhido) {
        console.log("Tamanho " + tamanhoEscolhido + " adicionado ao carrinho.");

        fecharModal();
    } else {
        alert("Por favor, escolha um tamanho.");
    }
};

// Newsletter
const input = document.getElementById("newsletter-input");
const button = document.getElementById("newsletter-btn");
const title = document.getElementById("newsletter-title");
const cupom = document.querySelector(".cupom");
const copiarButton = document.querySelector(".copiar");

// botão de envio
button.addEventListener("click", function () {
    const email = input.value.trim(); 
    if (!email || !validateEmail(email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    title.innerHTML = "Obrigado por se cadastrar! Aqui está seu cupom:";
    input.style.display = "none";
    button.style.display = "none"; 
    cupom.style.display = "block";
    copiarButton.style.display = "block"; 
});

//evento para copiar o cupom
copiarButton.addEventListener("click", function () {
    navigator.clipboard.writeText("BEMVINDA").then(() => {

        copiarButton.textContent = "Copiado";

        copiarButton.disabled = true;
        copiarButton.style.cursor = "not-allowed";
    });
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Minicart
const minicart = document.querySelector(".minicart-main-container");
const closeBtn = document.querySelector(".close-btn");
const cartIcon = document.querySelector(".icone-carrinho");

cartIcon.addEventListener("click", () => {
    minicart.style.display = "block"; 
});

closeBtn.addEventListener("click", () => {
    minicart.style.display = "none"; 
});

// Carrinho
const tamanhoBotoes = document.querySelectorAll(".tamanho-btn");
const adicionarCarrinhoBtn = document.getElementById("adicionarCarrinho");
const minicartContainer = document.querySelector(".adicionar-remover-produto");
const subtotalElement = document.querySelector(".total p strong");
const contadorCarrinho = document.getElementById("contadorCarrinho");

let subtotal = 0;
let contador = 0;
let tamanhoSelecionado = null;

tamanhoBotoes.forEach((botao) => {
    botao.addEventListener("click", () => {
        tamanhoBotoes.forEach((btn) => btn.classList.remove("selected"));
        botao.classList.add("selected");
        tamanhoSelecionado = botao.getAttribute("data-size");
    });
});

adicionarCarrinhoBtn.addEventListener("click", () => {
    if (!tamanhoSelecionado) {
        alert("Por favor, selecione um tamanho antes de adicionar ao carrinho.");
        return;
    }

    const produto = {
        nome: document.getElementById("modalProdutoNome").textContent,
        tamanho: tamanhoSelecionado,
        preco: 150.0,
        imagem: document.getElementById("modalProdutoImagem").src,
    };

    subtotal += produto.preco;

    const produtoElement = document.createElement("div");
    produtoElement.classList.add("produto-item");
    produtoElement.innerHTML = `
    <div class="produto-info">
        <img src="${produto.imagem}" alt="Imagem do Produto" class="produto-imagem">
        <div class="produto-detalhes">
            <p class="produto-nome">${produto.nome}</p>
            <p class="produto-tamanho">Tamanho: ${produto.tamanho}</p>
            <p class="produto-preco">R$ ${produto.preco.toFixed(2)}</p>
        </div>
    </div>
    <div class="produto-acoes">
        <button class="quantidade-btn">-</button>
        <span class="quantidade">1</span>
        <button class="quantidade-btn">+</button>
        <button class="remover-produto">Remover</button>
    </div>
    `;

    minicartContainer.appendChild(produtoElement);

    subtotalElement.textContent = `Subtotal: R$ ${subtotal.toFixed(2)}`;

    produtoElement.querySelector(".remover-produto").addEventListener("click", () => {
        minicartContainer.removeChild(produtoElement);

        atualizarSubtotal();
    
        contador -= 1;
        contadorCarrinho.textContent = contador >= 0 ? contador : 0;
    });
    
    document.getElementById("modalCarrinho").style.display = "none";

    tamanhoSelecionado = null;
    tamanhoBotoes.forEach((btn) => btn.classList.remove("selected"));

    contador += 1;
    contadorCarrinho.textContent = contador;
});

// Evento para manipular a quantidade de produtos
document.querySelector("#minicartModal").addEventListener("click", function (event) {
    if (event.target.classList.contains("quantidade-btn")) {
        const quantidadeSpan = event.target.parentNode.querySelector(".quantidade");
        let quantidade = parseInt(quantidadeSpan.textContent);

        if (event.target.textContent === "+") {
            quantidade += 1;
        } else if (event.target.textContent === "-" && quantidade > 1) {
            quantidade -= 1;
        }

        quantidadeSpan.textContent = quantidade;
        atualizarSubtotal();
    }
});

function atualizarSubtotal() {
    const produtos = document.querySelectorAll(".produto-item");
    let novoSubtotal = 0;

    produtos.forEach((produto) => {
        const preco = parseFloat(produto.querySelector(".produto-preco").textContent.replace("R$", "").trim());
        const quantidade = parseInt(produto.querySelector(".quantidade").textContent);
        novoSubtotal += preco * quantidade;
    });

    subtotal = novoSubtotal;
    subtotalElement.textContent = `Subtotal: R$ ${subtotal.toFixed(2)}`;
}