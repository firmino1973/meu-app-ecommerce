from flask import Flask, request
from flask_cors import CORS
import sqlite3
import jwt
import os
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")


def conectar_banco():
    conexao = sqlite3.connect("ecommerce.db")
    conexao.execute("PRAGMA foreign_keys = ON")
    return conexao


def verificar_token():
    token = request.headers.get("Authorization")

    if not token:
        return None

    token = token.replace("Bearer ", "")

    try:
        dados = jwt.decode(
            token,
            JWT_SECRET_KEY,
            algorithms=["HS256"]
        )
        return dados

    except jwt.InvalidTokenError:
        return None


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

    lista = []

    for registro in registros:
        lista.append({
            "id": registro[0],
            "nome": registro[1],
            "preco": registro[2],
            "imagem": registro[3],
            "descricao": registro[4],
            "categoria": registro[5]
        })

    return {"produtos": lista}


@app.route("/clientes", methods=["POST"])
def cadastrar_cliente():

    dados = request.get_json()

    nome = dados.get("nome")
    email = dados.get("email")
    telefone = dados.get("telefone")
    senha = dados.get("senha")

    if not nome or not email or not senha:
        return {"erro": "Nome, email e senha são obrigatórios"}, 400

    senha_hash = generate_password_hash(senha)

    conexao = conectar_banco()
    cursor = conexao.cursor()

    try:

        cursor.execute("""
            INSERT INTO clientes
            (nome, email, telefone, senha_hash)
            VALUES (?, ?, ?, ?)
        """, (nome, email, telefone, senha_hash))

        conexao.commit()

    except sqlite3.IntegrityError:

        conexao.close()
        return {"erro": "Este e-mail já está cadastrado"}, 409

    cliente_id = cursor.lastrowid
    conexao.close()

    return {
        "mensagem": "Cliente cadastrado com sucesso",
        "cliente_id": cliente_id
    }, 201


@app.route("/login", methods=["POST"])
def login():

    dados = request.get_json()

    email = dados.get("email")
    senha = dados.get("senha")

    if not email or not senha:
        return {"erro": "Email e senha são obrigatórios"}, 400

    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute(
        "SELECT id, nome, senha_hash FROM clientes WHERE email = ?",
        (email,)
    )

    cliente = cursor.fetchone()

    conexao.close()

    if not cliente:
        return {"erro": "Email ou senha inválidos"}, 401

    if not check_password_hash(cliente[2], senha):
        return {"erro": "Email ou senha inválidos"}, 401

    token = jwt.encode(
        {"cliente_id": cliente[0]},
        JWT_SECRET_KEY,
        algorithm="HS256"
    )

    return {
        "mensagem": "Login realizado com sucesso",
        "cliente_id": cliente[0],
        "nome": cliente[1],
        "token": token
    }, 200


@app.route("/perfil")
def perfil():

    dados = verificar_token()

    if not dados:
        return {"erro": "Token inválido ou não informado"}, 401

    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute(
        "SELECT id, nome, email, telefone FROM clientes WHERE id = ?",
        (dados["cliente_id"],)
    )

    cliente = cursor.fetchone()
    conexao.close()

    if not cliente:
        return {"erro": "Cliente não encontrado"}, 404

    return {
        "id": cliente[0],
        "nome": cliente[1],
        "email": cliente[2],
        "telefone": cliente[3]
    }, 200


@app.route("/pedidos", methods=["POST"])
def criar_pedido():

    dados = verificar_token()

    if not dados:
        return {"erro": "Token inválido ou não informado"}, 401

    corpo = request.get_json()

    itens = corpo.get("itens")

    if not itens:
        return {"erro": "Itens obrigatórios"}, 400

    conexao = conectar_banco()
    cursor = conexao.cursor()

    try:

        cursor.execute("""
            INSERT INTO pedidos
            (cliente_id, data, total, status)
            VALUES (?, datetime('now'), 0, 'recebido')
        """, (dados["cliente_id"],))

        pedido_id = cursor.lastrowid

        total = 0

        for item in itens:

            produto_id = item["produto_id"]
            quantidade = item["quantidade"]
            tamanho = item["tamanho"]

            cursor.execute(
                "SELECT preco FROM produtos WHERE id = ?",
                (produto_id,)
            )

            produto = cursor.fetchone()

            if not produto:
                raise sqlite3.Error("Produto não encontrado")

            preco = produto[0]

            total += preco * quantidade

            cursor.execute("""
                INSERT INTO itens_pedido
                (pedido_id, produto_id, quantidade, preco_unitario, tamanho)
                VALUES (?, ?, ?, ?, ?)
            """, (
                pedido_id,
                produto_id,
                quantidade,
                preco,
                tamanho
            ))

        cursor.execute(
            "UPDATE pedidos SET total = ? WHERE id = ?",
            (total, pedido_id)
        )

        conexao.commit()

    except sqlite3.Error as erro:

        conexao.rollback()
        conexao.close()

        return {
            "erro": "Erro ao criar pedido",
            "detalhes": str(erro)
        }, 500

    conexao.close()

    return {
        "mensagem": "Pedido criado com sucesso",
        "pedido_id": pedido_id,
        "total": total
    }, 201


if __name__ == "__main__":
    app.run(debug=False)