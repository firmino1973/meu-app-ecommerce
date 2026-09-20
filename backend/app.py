from flask import Flask
from flask_cors import CORS
import sqlite3


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


if __name__ == "__main__":
    app.run(debug=False)
    

