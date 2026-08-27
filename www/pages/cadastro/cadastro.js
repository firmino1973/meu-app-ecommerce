const formularioCadastro =
    document.getElementById("form-cadastro");

formularioCadastro.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome =
        document.getElementById("nome").value;

    const email =
        document.getElementById("email").value;

    const telefone =
        document.getElementById("telefone").value;

    const senha =
        document.getElementById("senha").value;

    const confirmarSenha =
        document.getElementById("confirmar-senha").value;

    if (senha !== confirmarSenha) {

        alert("As senhas não são iguais.");

        return;
    }

    const cliente = {
        nome: nome,
        email: email,
        telefone: telefone,
        senha: senha
    };

    localStorage.setItem(
        "cliente",
        JSON.stringify(cliente)
    );

    alert("Cadastro realizado com sucesso!");

    window.location.href = "../login/login.html";

});