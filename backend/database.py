import sqlite3

connection = sqlite3.connect("shop.db")

cursor = connection.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    weight TEXT,
    price REAL NOT NULL,
    description TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    total REAL NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
)
""")
products = [
        ("Item U", "500 g", 17, "This is the description for Item U."),
    ("Item V", "750 g", 22, "This is the description for Item V."),
    ("Item W", "1 kg", 27, "This is the description for Item W."),
    ("Item X", "500 g", 18, "This is the description for Item X."),
    ("Item Y", "750 g", 23, "This is the description for Item Y."),
    ("Item Z", "1 kg", 28, "This is the description for Item Z."),
    ("Item AA", "500 g", 19, "This is the description for Item AA."),
    ("Item AB", "750 g", 24, "This is the description for Item AB."),
    ("Item AC", "1 kg", 29, "This is the description for Item AC."),
    ("Item AD", "500 g", 20, "This is the description for Item AD."),
    ("Item AE", "750 g", 25, "This is the description for Item AE."),
    ("Item AF", "1 kg", 30, "This is the description for Item AF."),
    ("Item AG", "500 g", 21, "This is the description for Item AG."),
    ("Item AH", "750 g", 26, "This is the description for Item AH."),
    ("Item AI", "1 kg", 31, "This is the description for Item AI."),
    ("Item AJ", "500 g", 22, "This is the description for Item AJ."),
    ("Item AK", "750 g", 27, "This is the description for Item AK."),
    ("Item AL", "1 kg", 32, "This is the description for Item AL."),
    ("Item AM", "500 g", 23, "This is the description for Item AM."),
    ("Item AN", "750 g", 28, "This is the description for Item AN."),
    ("Item AO", "1 kg", 33, "This is the description for Item AO."),
    ("Item AP", "500 g", 24, "This is the description for Item AP."),
    ("Item AQ", "750 g", 29, "This is the description for Item AQ."),
    ("Item AR", "1 kg", 34, "This is the description for Item AR."),
    ("Item AS", "500 g", 25, "This is the description for Item AS."),
    ("Item AT", "750 g", 30, "This is the description for Item AT."),
    ("Item AU", "1 kg", 35, "This is the description for Item AU."),
    ("Item AV", "500 g", 26, "This is the description for Item AV."),
    ("Item AW", "750 g", 31, "This is the description for Item AW."),
    ("Item AX", "1 kg", 36, "This is the description for Item AX."),
    ("Item AY", "500 g", 27, "This is the description for Item AY."),
    ("Item AZ", "750 g", 32, "This is the description for Item AZ."),
    ("Item BA", "1 kg", 37, "This is the description for Item BA."),
    ("Item BB", "500 g", 28, "This is the description for Item BB."),
    ("Item BC", "750 g", 33, "This is the description for Item BC."),
    ("Item BD", "1 kg", 38, "This is the description for Item BD."),
    ("Item BE", "500 g", 29, "This is the description for Item BE."),
    ("Item BF", "750 g", 34, "This is the description for Item BF."),
    ("Item BG", "1 kg", 39, "This is the description for Item BG."),
    ("Item BH", "500 g", 30, "This is the description for Item BH.")
]

for product in products:

    cursor.execute("""
    INSERT INTO products
    (name, weight, price, description)
    SELECT ?, ?, ?, ?
    WHERE NOT EXISTS (
        SELECT 1
        FROM products
        WHERE name = ?
    )
    """, (
        product[0],
        product[1],
        product[2],
        product[3],
        product[0]
    ))
connection.commit()

connection.close()

print("Database created successfully!")