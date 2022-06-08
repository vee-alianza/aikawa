from .db import db


class Product_Order(db.Model):
    __tablename__ = 'product_orders'

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer)
    order_id = db.Column(db.Integer)


def to_dict(self):
    return{
        'id': self.id,
        'quantity': self.quantity,
        'product_id': self.product_id,
        'order_id': self.order_id
    }
