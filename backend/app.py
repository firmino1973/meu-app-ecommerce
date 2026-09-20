from flask import Flask, request
from flask_cors import CORS
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)


def conectar_banco():
    conexao = sqlite3.connect("ecommerce.db")
    conexao.execute("PRAGMA foreign_keys = ON")
    return conexao


CORS(app)



@app.route("/")
def inicio():
    return "Backend Meu App Ecommerce funcionando!"

@app.route("/produtos")
def produtos():
    conexao = conectar_banco()

    cursor = conexao.cursor()

    cursor.execute("SELECT * FROM produtos")

    registros = cursor.fetchall()

    conexao.close()

    lista_produtos = []

    for registro in registros:
        lista_produtos.append({
            "id": registro[0],
            "nome": registro[1],
            "preco": registro[2],
            "imagem": registro[3],
            "descricao": registro[4],
            "categoria": registro[5]
        })

    return {
        "produtos": lista_produtos
    }

@app.route("/clientes", methods=["POST"])
def cadastrar_cliente():
    dados = request.get_json()

    nome = dados.get("nome")
    email = dados.get("email")
    telefone = dados.get("telefone")
    senha = dados.get("senha")

    if not nome or not email or not senha:
        return {
            "erro": "Nome, email e senha são obrigatórios"
        }, 400

    senha_hash = generate_password_hash(senha)

    conexao = conectar_banco()
    cursor = conexao.cursor()

    try:
        cursor.execute("""
            INSERT INTO clientes (nome, email, telefone, senha_hash)
            VALUES (?, ?, ?, ?)
        """, (nome, email, telefone, senha_hash))

        conexao.commit()

    except sqlite3.IntegrityError:
        conexao.close()

        return {
            "erro": "Este e-mail já está cadastrado"
        }, 409

    conexao.close()

    return {
        "mensagem": "Cliente cadastrado com sucesso",
        "cliente_id": cursor.lastrowid
    }, 201


if __name__ == "__main__":
      app.run(debug=False)
    