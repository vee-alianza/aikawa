from flask import Blueprint, request, render_template
from flask_login import login_required, current_user
from app.models import db, Product, Cart_Item, Order, Product_Order

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def get_products():
    """
    Gets all products
    """
    last_product_id = int(request.args.get('lastProductId'))
    if last_product_id <= 0:
        products = Product.query.filter(Product.id.between(1, 16)).order_by(Product.id.asc()).limit(16).all()
        return {'products':[product.to_dict() for product in products]}
    else:
        last_product_id += 1
        products = Product.query.filter(Product.id.between(last_product_id, last_product_id + 16)).order_by(Product.id.asc()).limit(16).all()
        return {'products':[product.to_dict() for product in products]}


@product_routes.route('/<int:product_id>')
def get_product_details(product_id):
    """
    Gets a product's details
    """
    product = Product.query.get(product_id)
    return {'product': product.to_dict()}


@product_routes.route('/cart')
@login_required
def get_user_cart():
    """
    Gets a user's cart (an array of cart items)
    """
    cart_items_query = [item.to_dict() for item in current_user.cart]
    cart_item_dict = {}
    cart_items = []

    for item in cart_items_query:
        if item['title'] not in cart_item_dict:
            cart_item_dict[item['title']] = item
        else:
            cart_item_dict[item['title']]['quantity'] += item['quantity']
            cart_item_dict[item['title']]['price'] += item['price']
            cart_item_dict[item['title']]['basePrice'] = item['price']

    for key in cart_item_dict:
        cart_items.append(cart_item_dict[key])

    return {'cartItems': cart_items}


@product_routes.route('/cart', methods=['PUT'])
@login_required
def place_user_order():
    """
    Creates order from user's submitted cart
    """
    cart_items = request.json['orderedItems']
    order_total = 0

    for item in cart_items:
        product = Product.query.get(item['productId'])
        order_total += product.price * float(item['quantity'])

    new_order = Order(
        status = 'Ordered',
        total_cost = order_total,
        user_id = current_user.id
    )
    db.session.add(new_order)
    db.session.commit()

    for item in cart_items:
        db.session.add(Product_Order(
            quantity = item['quantity'],
            product_id = item['productId'],
            order_id = new_order.id
        ))
        cart_items = Cart_Item.query.filter(
                Cart_Item.product_id == item['productId'],
                Cart_Item.user_id == current_user.id
            ).all()
        for item in cart_items:
            db.session.delete(item)
    db.session.commit()

    return {'success': True}


@product_routes.route('/cart/<int:product_id>', methods=['DELETE'])
@login_required
def remove_item_from_cart(product_id):
    """
    Removes an item from a user's cart
    """
    cart_items = Cart_Item.query.filter(
            Cart_Item.product_id == product_id,
            Cart_Item.user_id == current_user.id
        ).all()
    for item in cart_items:
        db.session.delete(item)
    db.session.commit()
    return {'success': True}


@product_routes.route('/<int:product_id>', methods=['POST'])
@login_required
def add_to_cart(product_id):
    """
    Adds a product to a user's cart
    """
    db.session.add(Cart_Item(
        quantity = 1,
        product_id = product_id,
        user_id = current_user.id if current_user.id is not None else None
    ))
    db.session.commit()
    return {'success': True}
