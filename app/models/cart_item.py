from .db import db

class Cart_Item(db.Model):
    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('prdoucts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # user_cart = db.relationship('User', back_populates='cart_orders')

    def to_dict(self):
        return{
            'id': self.id,
            'quantity': self.quantity,
            'product_id': self.product_id,
            'user_id': self.user_id
        }
