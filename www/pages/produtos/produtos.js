
/* ==============================
   PEGAR A CATEGORIA DA URL
============================== */

const parametros =
    new URLSearchParams(window.location.search);

const categoria =
    parametros.get("categoria");


/* ==============================
   ELEMENTOS DA PÁGINA
============================== */

const tituloCategoria =
    document.getElementById(
        "titulo-categoria"
    );

const listaProdutos =
    document.getElementById(
        "lista-produtos"
    );


/* ==============================
   PRODUTOS
============================== */

const produtos = {

    camisas: [

        {
            nome: "Camiseta Básica",
            preco: 79.90,
            imagem: "../../img/camiseta.jpg"
        },

        {
            nome: "Camisa Polo",
            preco: 119.90,
            imagem: "../../img/camiseta.jpg"
        }

    ],


    calcas: [

        {
            nome: "Calça Jeans",
            preco: 149.90,
            imagem: "../../img/calca.jpg"
        },

        {
            nome: "Calça Sarja",
            preco: 169.90,
            imagem: "../../img/calca.jpg"
        }

    ],


    calcados: [

        {
            nome: "Tênis Casual",
            preco: 199.90,
            imagem: "../../img/tenis.jpg"
        },

        {
            nome: "Tênis Esportivo",
            preco: 249.90,
            imagem: "../../img/tenis.jpg"
        }

    ],


    bones: [

        {
            nome: "Boné Preto",
            preco: 59.90,
            imagem: "../../img/bone.jpg"
        },

        {
            nome: "Boné Azul",
            preco: 64.90,
            imagem: "../../img/bone.jpg"
        }

    ],


    acessorios: [

        {
            nome: "Relógio Masculino",
            preco: 299.90,
            imagem: "../../img/relogio.jpg"
        },

        {
            nome: "Carteira Masculina",
            preco: 89.90,
            imagem: "../../img/carteira.jpg"
        }

    ]

};


/* ==============================
   NOME DAS CATEGORIAS
============================== */

const nomesCategorias = {

    camisas: "Camisas",

    calcas: "Calças",

    calcados: "Calçados",

    bones: "Bonés",

    acessorios: "Acessórios"

};


/* ==============================
   ATUALIZAR TÍTULO
============================== */

if (nomesCategorias[categoria]) {

    tituloCategoria.textContent =
        nomesCategorias[categoria];

} else {

    tituloCategoria.textContent =
        "Produtos";

}


/* ==============================
   MOSTRAR PRODUTOS
============================== */

const produtosCategoria =
    produtos[categoria] || [];


produtosCategoria.forEach(function(produto) {

    const card =
        document.createElement("div");

    card.className =
        "produto-card";

card.innerHTML = `

    <div
        class="produto-clicavel"
        onclick="abrirDetalhes('${produto.nome}')"
    >

        <img
            src="${produto.imagem}"
            alt="${produto.nome}"
        >

        <h3>
            ${produto.nome}
        </h3>

        <p class="preco">
            R$ ${produto.preco.toFixed(2).replace(".", ",")}
        </p>

    </div>


    <button
        class="btn-adicionar"
        data-produto="${produto.nome}"
        data-preco="${produto.preco}"
    >
        <i class="ri-shopping-cart-line"></i>
        Adicionar
    </button>

`;



    listaProdutos.appendChild(card);

});


/* ==============================
   ADICIONAR AO CARRINHO
============================== */

const botoesAdicionar =
    document.querySelectorAll(
        ".btn-adicionar"
    );


botoesAdicionar.forEach(function(botao) {

    botao.addEventListener(
        "click",
        function() {

            const nome =
                botao.dataset.produto;

            const preco =
                parseFloat(
                    botao.dataset.preco
                );


            let carrinho =
                JSON.parse(
                    localStorage.getItem(
                        "carrinho"
                    )
                ) || [];


            const produtoExistente =
                carrinho.find(
                    function(item) {

                        return item.nome === nome;

                    }
                );


            if (produtoExistente) {

                produtoExistente.quantidade++;

            } else {

                carrinho.push({

                    nome: nome,

                    preco: preco,

                    quantidade: 1

                });

            }


            localStorage.setItem(
                "carrinho",
                JSON.stringify(carrinho)
            );


            atualizarContadorCarrinho();


            alert(
                nome +
                " adicionado ao carrinho!"
            );

        }
    );

});


/* ==============================
   CONTADOR DO CARRINHO
============================== */

function atualizarContadorCarrinho() {

    const contador =
        document.getElementById(
            "contador-carrinho"
        );


    const carrinho =
        JSON.parse(
            localStorage.getItem(
                "carrinho"
            )
        ) || [];


    let quantidade = 0;


    carrinho.forEach(function(produto) {

        if (
            typeof produto === "object"
        ) {

            quantidade +=
                produto.quantidade;

        }

    });


    contador.textContent =
        quantidade;

}


atualizarContadorCarrinho();


/* ==============================
   VOLTAR PARA HOME
============================== */

function voltarParaHome() {

    window.location.href =
        "../home/home.html";

}


/* ==============================
   IR PARA O CARRINHO
============================== */

function irParaCarrinho() {

    window.location.href =
        "../carrinho/carrinho.html";

}
function abrirDetalhes(nomeProduto) {

    window.location.href =
        "../detalhes/detalhes.html?produto=" +
        encodeURIComponent(nomeProduto);

}

