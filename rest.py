import os
from flask import Flask, render_template, request, jsonify, session
#import productos
from productos import getProductosList, getProductosDeseadosList
from utils import crypto

userSuperAdmin = 1
userAdmin = 2
userCliente = 3

app = Flask(__name__)
app.secret_key = os.urandom(24)

@app.route('/', methods=['GET','POST'])
def index():    
    return render_template('index.html')

@app.route('/lista-deseos/', methods=['GET','POST'])
def htmlDeseos():    
    return render_template('deseos.html')

@app.route('/productos', methods=['GET','POST'])
@app.route('/productos/', methods=['GET','POST'])
def getProductos():
    return jsonify(getProductosList())


@app.route('/listadeseos/', methods=['GET','POST'])
def getProductosDeseados():
    
    #if( request.json["UserRef"] == crypto( str(session["userID"]) )):
        #return request.json["UserRef"]
        return jsonify(getProductosDeseadosList())    
    #else:
    #   return ""

@app.route('/pruebaa/', methods=['GET','POST'])
def getPrueba():
    #if( request.json["UserRef"] == crypto(session["userID"])  ):
        return request.json["UserRef"]#jsonify(getProductosDeseadosList())    
    #else:
    #    return ""

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
