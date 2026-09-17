
/* ==============================
   IR PARA O CARRINHO
============================== */

function irParaCarrinho() {

    window.location.href =
        "../carrinho/carrinho.html";

}


/* ==============================
   CONTADOR DO CARRINHO
============================== */

function atualizarContadorCarrinho() {

    const contadorCarrinho =
        document.getElementById(
            "contador-carrinho"
        );

    const carrinho =
        JSON.parse(
            localStorage.getItem("carrinho")
        ) || [];


    let quantidadeItens = 0;


    carrinho.forEach(function(produto) {

        if (
            typeof produto === "object"
        ) {

            quantidadeItens +=
                produto.quantidade;

        }

    });


    contadorCarrinho.textContent =
        quantidadeItens;

}


atualizarContadorCarrinho();


/* ==============================
   ABRIR DETALHES DO PRODUTO
============================== */

function abrirDetalhes(nomeProduto) {

    window.location.href =
        "../detalhes/detalhes.html?produto=" +
        encodeURIComponent(nomeProduto);

}


/* ==============================
   PRODUTOS EM DESTAQUE
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


            abrirDetalhes(nome);

        }
    );

});


/* ==============================
   MENU LATERAL
============================== */

const botaoMenu =
    document.getElementById(
        "btn-menu"
    );

const botaoFecharMenu =
    document.getElementById(
        "btn-fechar-menu"
    );

const menuLateral =
    document.getElementById(
        "menu-lateral"
    );

const fundoMenu =
    document.getElementById(
        "fundo-menu"
    );


/* ABRIR MENU */

botaoMenu.addEventListener(
    "click",
    function() {

        menuLateral.classList.add(
            "aberto"
        );

        fundoMenu.classList.add(
            "aberto"
        );

    }
);


/* FECHAR PELO X */

botaoFecharMenu.addEventListener(
    "click",
    function() {

        fecharMenu();

    }
);


/* FECHAR CLICANDO NO FUNDO */

fundoMenu.addEventListener(
    "click",
    function() {

        fecharMenu();

    }
);


/* ==============================
   FECHAR MENU
============================== */

function fecharMenu() {

    menuLateral.classList.remove(
        "aberto"
    );

    fundoMenu.classList.remove(
        "aberto"
    );

}


/* ==============================
   ABRIR CATEGORIA
============================== */

function abrirCategoria(categoria) {

    window.location.href =
        "../produtos/produtos.html?categoria=" +
        categoria;

}

/* ==============================
   PESQUISA DE PRODUTOS
============================== */

const campoPesquisa =
    document.querySelector(".pesquisa input");

const cardsProdutos =
    document.querySelectorAll(".produto-card");


campoPesquisa.addEventListener(
    "input",
    function() {

        const textoPesquisa =
            campoPesquisa.value
                .toLowerCase()
                .trim();


        cardsProdutos.forEach(
            function(card) {

                const nomeProduto =
                    card
                        .querySelector("h3")
                        .textContent
                        .toLowerCase();


                if (
                    nomeProduto.includes(
                        textoPesquisa
                    )
                ) {

                    card.style.display =
                        "";

                } else {

                    card.style.display =
                        "none";

                }

            }
        );

    }
);

    const listaProdutos = document.getElementById("lista-produtos");

    console.log(listaProdutos);

fetch("http://127.0.0.1:5000/produtos")
    .then(function(response) {
        return response.json();
    })
    .then(function(dados) {
        dados.produtos.forEach(function(produto) {
           console.log(produto.nome);

           const card = document.createElement("div");
           card.className = "produto-card";

           const imagem = produto.imagem ? `
            <div class="produto-imagem">
              <img src="../../img/${produto.imagem}">
        </div>
` : "";
           
           card.innerHTML = `
             ${imagem}
       <h3>${produto.nome}</h3>
       <p>R$ ${produto.preco}</p>
       <button class="btn-adicionar" data-produto="${produto.nome}">
    Adicionar
</button>
`;

const botao = card.querySelector(".btn-adicionar");

botao.addEventListener("click", function() {
    const nome = botao.dataset.produto;

    abrirDetalhes(nome);
});

 listaProdutos.appendChild(card);
     });
    
 });

    