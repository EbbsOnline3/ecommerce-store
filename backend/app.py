import os
from flask import Flask, jsonify, json
from flask_cors import CORS
import sqlite3

app = Flask(__name__)

CORS(app)

DATABASE = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "store.db"
)

def init_db():
  connection = sqlite3.connect(DATABASE)
  query = connection.cursor()
  query.execute(
    "CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, category text NOT NULL, badge TEXT, image TEXT not null, description TEXT NOT NULL, price REAL NOT NULL, quantity INTEGER NOT NULL DEFAULT 0)"
    )
  connection.commit()
  connection.close()


def seed_products():
  connection = sqlite3.connect(DATABASE)
  query = connection.cursor()

  products = [
    {
        "name": "Everyday Sneakers",
        "category": "Footwear",
        "badge": "Bestseller",
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
        "description": "Comfortable and stylish sneakers suitable for everyday wear.",
        "price": 790.99,
    },
    {
      'id': 2,
      'name': "Classic Wristwatch",
      'category': "Accessories",
      'price': 1190.99,
      'image':
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
      'badge': "Popular",
      'description': "A timeless wristwatch that complements any outfit.",
    },
    {
        'name': "Minimal Backpack",
        'category': "Bags",
        'price': 640.5,
        'image':
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700",
        'badge': "Old",
        'description': "A versatile and minimalist backpack for daily use.",
      },
      {
        'name': "Wireless Headphones",
        'category': "Electronics",
        'price': 890.0,
        'image':
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
        'badge': "New",
        'description': "High-quality wireless headphones with noise-cancellation features.",
      },
      {
        'name': "Nike",
        'category': "Footwear",
        'price': 909.0,
        'image':
          "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ecca17f7-b88a-4459-a8f6-c7d13a1511ea/NIKE+AIR+MAX+PLUS+OG+PRM+1.png",
        'badge': "New",
        'description': "A sleek and stylish watch from Nike's latest collection, perfect for everyday wear."
      },
      {
        'name': "Classic Series Wristwatch",
        'category': "Accessories",
        'price': 5190.99,
        'image':
        "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Apple_Watch_Series_10.jpg/500px-Apple_Watch_Series_10.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
        'badge': "Popular",
        'description': "A classic wristwatch that complements any outfit."
      },
      {
        'name': "Nike Gloss Watch",
        'category': "Accessories",
        'price': 990.0,
        'image':
          "https://i.etsystatic.com/65184992/c/1999/1999/120/519/il/3f0467/8258063700/il_340x270.8258063700_nbml.jpg",
        'badge': "New",
        'description': "A sleek and stylish watch from Nike's latest collection, perfect for everyday wear."
      },
    ]
  for product in products:
    exists = query.execute("SELECT id, name FROM products WHERE name = ? ", (product["name"],)) 
    product_existing = exists.fetchone()
    if product_existing:
      continue
    query.execute(
        "INSERT INTO products (name, category, badge, image, description, price) values (?,?,?,?,?,?)",
        (
            product["name"],
            product["category"],
            product["badge"],
            product["image"],
            product["description"],
            product["price"],
        )
    )
    print("Seed function finished.")
    print("The products successfully added.")
  update = query.execute("UPDATE products SET image = ? WHERE id = ?", ("https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ecca17f7-b88a-4459-a8f6-c7d13a1511ea/NIKE+AIR+MAX+PLUS+OG+PRM+1.png", 5))
  # print(view.fetchall())
  # print(query.fetchall())
  connection.commit()
  connection.close()
  


@app.route('/api/health')
def api_health():
  return {
    'message': "App is healthy",
    'status': 200
  }


@app.route('/api/products')
def products():
  connection = None
  try:
    connection = sqlite3.connect(DATABASE)
    cur = connection.cursor()
    rows = cur.execute("SELECT id, name, category, price, image, badge, description FROM products ORDER BY id")
    products_list = rows.fetchall()
    columns = [column[0] for column in cur.description]
    formatted_products = []

    for product in products_list:
        product_dict = dict(zip(columns, product))
        formatted_products.append(product_dict)
    return jsonify(formatted_products)
  except sqlite3.Error as e:
    print(e)
    return jsonify({"error": "Unable to load products"}), 500
  finally:
    if connection is not None:
      connection.close()
  

@app.route('/api/products/<int:product_id>')
def get_product(product_id):
    conn = None
    try:
      conn = sqlite3.connect(DATABASE)
      cur = conn.cursor()      
      row = cur.execute("SELECT id, name, category, image, badge, description, price FROM products WHERE id = ?", (product_id,))
      columns = [column[0] for column in cur.description]
      product_row = row.fetchone()
      
      if product_row is None:
        return jsonify({"error":"Product doesn't exist"}), 404
    
      product = dict(zip(columns, product_row))
      return jsonify(product)
    except sqlite3.Error as e:
      return jsonify(
      {
        "error": "Product not found"
      }), 500
    finally:
      if conn is not None:
        conn.close()


if(__name__ == '__main__'):
  init_db()
  seed_products()
  app.run(debug=True)
  
  
  