from app.models import db, Product_Image, Product
import json

def seed_product_images():
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
        product_query = Product.query.filter(Product.title.ilike(product['product'])).one()

        for image in product['pictures']:
            db.session.add(Product_Image(
                url = image,
                product_id = product_query.id
            ))

    for product in coffee_tables:
        product_query = Product.query.filter(Product.title.ilike(product['product'])).one()

        for image in product['pictures']:
            db.session.add(Product_Image(
                url = image,
                product_id = product_query.id
            ))

    for product in dining_seating:
        product_query = Product.query.filter(Product.title.ilike(product['product'])).one()

        for image in product['pictures']:
            db.session.add(Product_Image(
                url = image,
                product_id = product_query.id
            ))

    for product in lounge_seating:
        product_query = Product.query.filter(Product.title.ilike(product['product'])).one()

        for image in product['pictures']:
            db.session.add(Product_Image(
                url = image,
                product_id = product_query.id
            ))

    for product in ottoman_seating:
        product_query = Product.query.filter(Product.title.ilike(product['product'])).one()

        for image in product['pictures']:
            db.session.add(Product_Image(
                url = image,
                product_id = product_query.id
            ))

    for product in sculptural_chairs:
        product_query = Product.query.filter(Product.title.ilike(product['product'])).one()

        for image in product['pictures']:
            db.session.add(Product_Image(
                url = image,
                product_id = product_query.id
            ))

    db.session.commit()

def undo_product_images():
    db.session.execute('TRUNCATE product_images RESTART IDENTITY CASCADE;')
    db.session.commit()
