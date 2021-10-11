import os
from flask import Flask, render_template, request, jsonify
#import productos
from productos import getProductosList



app = Flask(__name__)
app.secret_key = os.urandom(24)

@app.route('/', methods=['GET','POST'])
def index():
    return render_template('index.html')

@app.route('/productos', methods=['GET','POST'])
@app.route('/productos/', methods=['GET','POST'])
def getProductos():
    return jsonify(getProductosList());

if(__name__ == '__main__'):
    app.run(debug=True, port=8080)
