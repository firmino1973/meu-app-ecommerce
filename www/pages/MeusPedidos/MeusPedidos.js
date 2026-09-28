const token = localStorage.getItem("token");

if (!token) {
    alert("Faça login para acessar seus pedidos.");
    window.location.href = "../Login/Login.html";
}

const listaPedidos = document.getElementById("lista-pedidos");

fetch("http://127.0.0.1:5000/pedidos", {
    method: "GET",
    headers: {
        "Authorization": "Bearer " + token
    }
})
.then(function(resposta) {
    return resposta.json();
})
.then(function(dados) {

    listaPedidos.innerHTML = "";

    if (dados.pedidos.length === 0) {

        listaPedidos.innerHTML = `
            <p>Você ainda não possui pedidos.</p>
        `;

        return;
    }

    dados.pedidos.forEach(function(pedido) {

        const card = document.createElement("div");

        card.className = "pedido-card";

        card.innerHTML = `
            <h3>Pedido #${pedido.id}</h3>

            <p><strong>Data:</strong> ${pedido.data}</p>

            <p><strong>Total:</strong> R$ ${pedido.total.toFixed(2).replace(".", ",")}</p>

            <span class="status">${pedido.status}</span>
        `;

        listaPedidos.appendChild(card);

    });

})
.catch(function(erro) {

    console.log(erro);

    alert("Erro ao carregar pedidos.");

});