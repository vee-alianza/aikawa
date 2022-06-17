from flask import Blueprint, request, session
from app.models import db, Order, Product_Order
from flask_login import current_user, login_required, user_logged_in
# from app.forms.order_form import OrderForm

order_routes = Blueprint('orders', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@order_routes.route('/')
@login_required
def all_orders():
    """
    testing
    """
    test = Order.query.order_by(Order.id.desc()).first().id
    print()
    print()
    print(test)
    print()
    print()
    return {'test': test}


@order_routes.route('/<int:order_id>')
@login_required
def get_order_details(order_id):
    """
    Get single order details
    """
    order = Order.query.get(order_id)
    return {'order': order.to_dict(), 'shippingDetails': current_user.shipping_details()}


@order_routes.route('/<int:order_item_id>', methods=['PATCH'])
@login_required
def update_order_item_qty(order_item_id):
    """
    Updates the quantity for an order item
    """
    quantity = int(request.json['quantity'])
    order_items = current_user.pending.ordered_items.all()
    new_total = 0
    for item in order_items:
        if item.id == order_item_id:
            item.quantity = quantity
        new_total += item.quantity * item.to_dict()['basePrice']
    current_user.pending.total_cost = new_total
    db.session.commit()
    return {'success': True}


@order_routes.route('/<int:order_item_id>', methods=['DELETE'])
@login_required
def remove_order_item(order_item_id):
    """
    Removes an order item
    """
    order_item = current_user.pending.ordered_items.filter(Product_Order.id == order_item_id).first()
    db.session.delete(order_item)
    db.session.commit()

    if len(current_user.pending.ordered_items.all()) == 0:
        db.session.delete(current_user.pending)
        db.session.commit()
    return {'success': True}
