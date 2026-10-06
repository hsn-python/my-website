from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def get_database_connection():

    connection = sqlite3.connect("shop.db")

    connection.row_factory = sqlite3.Row

    return connection


# =========================
# HOME
# =========================

@app.route("/")
def home():

    return "Shopping website backend is working!"


# =========================
# GET ALL PRODUCTS
# =========================

@app.route("/products")
def get_products():

    connection = get_database_connection()

    products = connection.execute(
        "SELECT * FROM products"
    ).fetchall()

    connection.close()

    return jsonify([
        dict(product)
        for product in products
    ])


# =========================
# GET ONE PRODUCT
# =========================

@app.route("/products/<int:product_id>")
def get_product(product_id):

    connection = get_database_connection()

    product = connection.execute(
        "SELECT * FROM products WHERE id = ?",
        (product_id,)
    ).fetchone()

    connection.close()


    if product is None:

        return jsonify({
            "error": "Product not found"
        }), 404


    return jsonify(dict(product))


# =========================
# START SERVER
# =========================

if __name__ == "__main__":

    app.run(debug=True)