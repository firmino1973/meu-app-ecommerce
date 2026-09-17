function voltarParaHome() {
    window.location.href = "../home/home.html";
}

const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const listaCarrinho = document.getElementById("lista-carrinho");

if (carrinho.length === 0) {

    listaCarrinho.innerHTML = `
        <div class="carrinho-vazio">

            <div class="icone-carrinho">🛒</div>

            <h2>Seu carrinho está vazio</h2>

            <p>Adicione produtos para continuar comprando.</p>

        </div>
    `;

}

carrinho.forEach(function(produto) {

    if (typeof produto !== "object") {
        return;
    }

    const item = document.createElement("div");

    item.classList.add("item-carrinho");

   
item.innerHTML = `
    <img src="../../img/${produto.imagem}" alt="${produto.nome}">

    <div class="info-produto">
        <h3>${produto.nome}</h3>

        <p>Preço: R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
    </div>

    <p class="tamanho">
        Tamanho: ${produto.tamanho || "Não informado"}
    </p>

    <div class="quantidade">

        <button class="btn-diminuir">-</button>

        <span>${produto.quantidade}</span>

        <button class="btn-aumentar">+</button>

    </div>

    <button class="btn-remover">Remover</button>
`;
  const btnRemover = item.querySelector(".btn-remover");

btnRemover.addEventListener("click", function() {

    const confirmar = confirm(
        "Deseja remover " + produto.nome + " do carrinho?"
    );

    if (confirmar) {

        const indice = carrinho.indexOf(produto);

        carrinho.splice(indice, 1);

        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        window.location.reload();

    }

});

listaCarrinho.appendChild(item);

const btnAumentar = item.querySelector(".btn-aumentar");

btnAumentar.addEventListener("click", function() {

    produto.quantidade++;

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    window.location.reload();

});

const btnDiminuir = item.querySelector(".btn-diminuir");

btnDiminuir.addEventListener("click", function() {

    if (produto.quantidade > 1) {

        produto.quantidade--;

        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        window.location.reload();

    }

});

 });


const totalCarrinho = document.getElementById("total-carrinho");

let total = 0;

carrinho.forEach(function(produto) {

    if (typeof produto !== "object") {
        return;
    }

    total += produto.preco * produto.quantidade;

});

if (carrinho.length > 0) {

    totalCarrinho.innerHTML = `
        <h3>Total: R$ ${total.toFixed(2).replace(".", ",")}</h3>
    `;

} else {

    totalCarrinho.innerHTML = "";

}

function irParaCheckout() {
    window.location.href = "../checkout/checkout.html";
}
