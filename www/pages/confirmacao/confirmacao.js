function voltarParaHome() {
    window.location.href = "../home/home.html";
}

const pedido = JSON.parse(localStorage.getItem("pedido"));

const produtosPedido = document.getElementById("produtos-pedido");

const totalPedido = document.getElementById("total-pedido");

if (pedido) {

    document.getElementById("nome-cliente").textContent =
        "Nome: " + pedido.cliente.nome;

    document.getElementById("email-cliente").textContent =
        "E-mail: " + pedido.cliente.email;

    document.getElementById("telefone-cliente").textContent =
        "Telefone: " + pedido.cliente.telefone;

    let total = 0;

    pedido.produtos.forEach(function(produto) {

        if (typeof produto !== "object") {
            return;
        }

        const item = document.createElement("p");

        item.textContent =
            produto.nome +
            " - " +
            produto.quantidade +
            " x R$ " +
            produto.preco.toFixed(2).replace(".", ",");

        produtosPedido.appendChild(item);

        total += produto.preco * produto.quantidade;

    });

    totalPedido.innerHTML = `
        <h3>Total: R$ ${total.toFixed(2).replace(".", ",")}</h3>
    `;

}