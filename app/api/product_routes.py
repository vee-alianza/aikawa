from flask import Blueprint, request, render_template
from flask_login import login_required
from app.models import db, Product

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
@login_required
def get_products():
    """
    Gets all products
    """
    lastProductId = int(request.args.get('lastProductId'));
    if lastProductId <= 0:
        products = Product.query.filter(Product.id.between(1, 16)).order_by(Product.id.asc()).limit(16).all()
        return {'products':[product.to_dict() for product in products]}
    else:
        lastProductId += 1
        products = Product.query.filter(Product.id.between(lastProductId, lastProductId + 16)).order_by(Product.id.asc()).limit(16).all()
        return {'products':[product.to_dict() for product in products]}



# @product_routes.route('/<int:id>')
