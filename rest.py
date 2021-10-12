import os
from flask import Flask, render_template, request, jsonify, session
#import productos
from productos import getProductosList
from utils import crypto

userSuperAdmin = 1
userAdmin = 2
userCliente = 3

app = Flask(__name__)
app.secret_key = os.urandom(24)

@app.route('/', methods=['GET','POST'])
def index():    
    return render_template('index.html')

@app.route('/productos', methods=['GET','POST'])
@app.route('/productos/', methods=['GET','POST'])
def getProductos():
    return jsonify(getProductosList())


@app.route('/connect', methods=['GET','POST'])
@app.route('/connect/', methods=['GET','POST'])
def getConnect():
    session["tipoUser"] = userSuperAdmin
    session["userID"] = "1"
    data = {"tipoUser":userSuperAdmin, "ref": crypto(session["userID"])}
    return jsonify(data)




@app.route('/setUsuario/', methods=['GET','POST'])
def setUsuario():
    session["user"] = "jaime"
    session["pass"] = "asdfasdfasdfasd"
    return ""

@app.route('/getUsuario/', methods=['GET','POST'])
def getUsuario():
    return f'{session["user"]} --> {crypto(session["user"])} y password {session["pass"]} SuperAdmin: {session["sadmin"]}'

if(__name__ == '__main__'):
    app.run(debug=True, port=8080)
