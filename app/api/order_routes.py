from flask import Blueprint, request, session
from app.models import db, Product, product_order
from flask_login import current_user, login_required

shopping_cart_routes = Blueprint('orders', __name__)

@shopping_cart_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_shopping_cart(id):
    """
    Updates the shopping cart
    """
