const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const resumoProdutos = document.getElementById("resumo-produtos");

const resumoTotal = document.getElementById("resumo-total");

let total = 0;

carrinho.forEach(function(produto) {

    if (typeof produto !== "object") {
        return;
    }

    const item = document.createElement("div");

    item.innerHTML = `
        <p>
            ${produto.nome} -
            ${produto.quantidade} x
            R$ ${produto.preco.toFixed(2).replace(".", ",")}
        </p>
    `;

    resumoProdutos.appendChild(item);

    total += produto.preco * produto.quantidade;

});

resumoTotal.innerHTML = `
    <h3>Total: R$ ${total.toFixed(2).replace(".", ",")}</h3>
`;

const formulario = document.getElementById("form-checkout");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;

    const cep = document.getElementById("cep").value;
    const endereco = document.getElementById("endereco").value;
    const numero = document.getElementById("numero").value;
    const complemento = document.getElementById("complemento").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;

    const pagamento = document.getElementById("pagamento").value;

    const pedido = {
        cliente: {
            nome: nome,
            email: email,
            telefone: telefone
        },

        endereco: {
            cep: cep,
            endereco: endereco,
            numero: numero,
            complemento: complemento,
            cidade: cidade,
            estado: estado
        },

        pagamento: pagamento,

        produtos: carrinho,

        data: new Date().toISOString()
    };

    localStorage.setItem(
        "pedido",
        JSON.stringify(pedido)
    );

    localStorage.removeItem("carrinho");

    window.location.href = "../confirmacao/confirmacao.html";

});