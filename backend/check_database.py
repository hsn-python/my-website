import sqlite3

connection = sqlite3.connect("shop.db")

cursor = connection.cursor()

cursor.execute("SELECT COUNT(*) FROM products")

number_of_products = cursor.fetchone()[0]

print("Number of products:", number_of_products)

connection.close()