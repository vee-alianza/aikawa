from app.models import db, Product
import json

def seed_products():
    with open('./app/seeds/products/bench-seating.json') as file:
        bench_seating = json.load(file)
    with open('./app/seeds/products/coffee-tables.json') as file:
        coffee_tables = json.load(file)
    with open('./app/seeds/products/dining-seating.json') as file:
        dining_seating = json.load(file)
    with open('./app/seeds/products/lounge-seating.json') as file:
        lounge_seating = json.load(file)
    with open('./app/seeds/products/ottoman-seating.json') as file:
        ottoman_seating = json.load(file)
    with open('./app/seeds/products/sculptural-chairs.json') as file:
        sculptural_chairs = json.load(file)

    for product in bench_seating:
        db.session.add(Product(
            title = product['product'],
            price = 123.45,
            description = 'product description',
            image = product['pictures'][0],
            quantity = 5,
        ))
    for product in coffee_tables:
        db.session.add(Product(
            title = product['product'],
            price = 678.90,
            description = 'product description',
            image = product['pictures'][0],
            quantity = 5,
        ))
    for product in dining_seating:
        db.session.add(Product(
            title = product['product'],
            price = 123.45,
            description = 'product description',
            image = product['pictures'][0],
            quantity = 5,
        ))
    for product in lounge_seating:
        db.session.add(Product(
            title = product['product'],
            price = 123.45,
            description = 'product description',
            image = product['pictures'][0],
            quantity = 5,
        ))
    for product in ottoman_seating:
        db.session.add(Product(
            title = product['product'],
            price = 123.45,
            description = 'product description',
            image = product['pictures'][0],
            quantity = 5,
        ))
    for product in sculptural_chairs:
        db.session.add(Product(
            title = product['product'],
            price = 123.45,
            description = 'product description',
            image = product['pictures'][0],
            quantity = 5,
        ))



    db.session.commit()

def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
