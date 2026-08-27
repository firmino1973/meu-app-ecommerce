
/* ==============================
   PEGAR O PRODUTO DA URL
============================== */

const parametros =
    new URLSearchParams(window.location.search);

const produtoSelecionado =
    parametros.get("produto");


/* ==============================
   BANCO DE PRODUTOS
============================== */

const produtos = {

    "Camiseta Básica": {

        nome: "Camiseta Básica",

        preco: 79.90,

        imagem: "../../img/camiseta.jpg",

        descricao:
            "Camiseta masculina básica, confortável e versátil para o dia a dia."

    },


    "Camisa Polo": {

        nome: "Camisa Polo",

        preco: 119.90,

        imagem: "../../img/camiseta.jpg",

        descricao:
            "Camisa polo masculina com estilo casual e confortável."

    },


    "Calça Jeans": {

        nome: "Calça Jeans",

        preco: 149.90,

        imagem: "../../img/calca.jpg",

        descricao:
            "Calça jeans masculina confortável e versátil para diversas ocasiões."

    },


    "Calça Sarja": {

        nome: "Calça Sarja",

        preco: 169.90,

        imagem: "../../img/calca.jpg",

        descricao:
            "Calça de sarja masculina com visual moderno e confortável."

    },


    "Tênis Casual": {

        nome: "Tênis Casual",

        preco: 199.90,

        imagem: "../../img/tenis.jpg",

        descricao:
            "Tênis casual masculino confortável para o dia a dia."

    },


    "Tênis Esportivo": {

        nome: "Tênis Esportivo",

        preco: 249.90,

        imagem: "../../img/tenis.jpg",

        descricao:
            "Tênis esportivo masculino desenvolvido para conforto e praticidade."

    },


    "Boné Preto": {

        nome: "Boné Preto",

        preco: 59.90,

        imagem: "../../img/bone.jpg",

        descricao:
            "Boné masculino preto com estilo moderno."

    },


    "Boné Azul": {

        nome: "Boné Azul",

        preco: 64.90,

        imagem: "../../img/bone.jpg",

        descricao:
            "Boné masculino azul para complementar o visual."

    },


    "Relógio Masculino": {

        nome: "Relógio Masculino",

        preco: 299.90,

        imagem: "../../img/relogio.jpg",

        descricao:
            "Relógio masculino com visual elegante e moderno."

    },


    "Carteira Masculina": {

        nome: "Carteira Masculina",

        preco: 89.90,

        imagem: "../../img/carteira.jpg",

        descricao:
            "Carteira masculina prática e elegante para o dia a dia."

    }

};


/* ==============================
   ENCONTRAR PRODUTO
============================== */

const produto =
    produtos[produtoSelecionado];


/* ==============================
   ELEMENTOS DA PÁGINA
============================== */

const nomeProduto =
    document.getElementById(
        "nome-produto"
    );

const precoProduto =
    document.getElementById(
        "preco-produto"
    );

const imagemProduto =
    document.getElementById(
        "imagem-produto"
    );

const descricaoProduto =
    document.getElementById(
        "descricao-produto"
    );


/* ==============================
   MOSTRAR PRODUTO
============================== */

if (produto) {

    nomeProduto.textContent =
        produto.nome;


    precoProduto.textContent =
        "R$ " +
        produto.preco
            .toFixed(2)
            .replace(".", ",");


    imagemProduto.src =
        produto.imagem;


    imagemProduto.alt =
        produto.nome;


    descricaoProduto.textContent =
        produto.descricao;

}


/* ==============================
   TAMANHO SELECIONADO
============================== */

let tamanhoSelecionado = "";


const botoesTamanho =
    document.querySelectorAll(
        ".lista-tamanhos button"
    );


botoesTamanho.forEach(function(botao) {

    botao.addEventListener(
        "click",
        function() {

            botoesTamanho.forEach(
                function(outroBotao) {

                    outroBotao.classList.remove(
                        "selecionado"
                    );

                }
            );


            botao.classList.add(
                "selecionado"
            );


            tamanhoSelecionado =
                botao.textContent;

        }
    );

});


/* ==============================
   QUANTIDADE
============================== */

let quantidade = 1;


function aumentarQuantidade() {

    quantidade++;

    document.getElementById(
        "quantidade"
    ).textContent = quantidade;

}


function diminuirQuantidade() {

    if (quantidade > 1) {

        quantidade--;

    }


    document.getElementById(
        "quantidade"
    ).textContent = quantidade;

}


/* ==============================
   ADICIONAR AO CARRINHO
============================== */

const botaoAdicionar =
    document.getElementById(
        "btn-adicionar"
    );


botaoAdicionar.addEventListener(
    "click",
    function() {

        if (!produto) {

            alert(
                "Produto não encontrado."
            );

            return;

        }


        if (!tamanhoSelecionado) {

            alert(
                "Selecione um tamanho."
            );

            return;

        }


        let carrinho =
            JSON.parse(
                localStorage.getItem(
                    "carrinho"
                )
            ) || [];


        const produtoExistente =
            carrinho.find(
                function(item) {

                    return (
                        item.nome === produto.nome &&
                        item.tamanho === tamanhoSelecionado
                    );

                }
            );


        if (produtoExistente) {

            produtoExistente.quantidade +=
                quantidade;

        } else {

            carrinho.push({

                nome: produto.nome,

                preco: produto.preco,

                tamanho: tamanhoSelecionado,

                quantidade: quantidade

            });

        }


        localStorage.setItem(
            "carrinho",
            JSON.stringify(carrinho)
        );


        atualizarContadorCarrinho();


        alert(
            produto.nome +
            " adicionado ao carrinho!"
        );

    }
);


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


    let quantidadeTotal = 0;


    carrinho.forEach(function(item) {

        if (
            typeof item === "object"
        ) {

            quantidadeTotal +=
                item.quantidade;

        }

    });


    contador.textContent =
        quantidadeTotal;

}


atualizarContadorCarrinho();


/* ==============================
   VOLTAR PARA PRODUTOS
============================== */

function voltarParaProdutos() {

    const urlAnterior =
        document.referrer;


    if (urlAnterior) {

        window.location.href =
            urlAnterior;

    } else {

        window.location.href =
            "../home/home.html";

    }

}


/* ==============================
   IR PARA O CARRINHO
============================== */

function irParaCarrinho() {

    window.location.href =
        "../carrinho/carrinho.html";

}
