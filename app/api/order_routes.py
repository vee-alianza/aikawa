from flask import Blueprint, request, session
from app.models import db, Order
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

    """
    pass



@order_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_shopping_cart(id):
    """

    """
    pass
