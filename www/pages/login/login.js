console.log("LOGIN.JS FOI CARREGADO");
const formularioLogin = document.querySelector("form");

formularioLogin.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;

    const senha = document.getElementById("senha").value;

   const resposta = await fetch("http://127.0.0.1:5000/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: email,
        senha: senha
    })
});

const dados = await resposta.json();

console.log(dados);

if (!resposta.ok) {

    alert("E-mail ou senha incorretos.");

    return;
}

localStorage.setItem("token", dados.token);

alert("Login realizado com sucesso!");

window.location.href = "../home/home.html";
     
  });         