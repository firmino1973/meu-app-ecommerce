const formularioLogin = document.querySelector("form");

formularioLogin.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;

    const senha = document.getElementById("senha").value;

    const cliente = JSON.parse(
        localStorage.getItem("cliente")
    );

    if (!cliente) {

        alert("Nenhuma conta cadastrada.");

        return;
    }

    if (
        email === cliente.email &&
        senha === cliente.senha
    ) {

        alert("Login realizado com sucesso!");

        window.location.href = "../home/home.html";

    } else {

        alert("E-mail ou senha incorretos.");

    }

});