from .db import db

class Cart_Item(db.Model):
    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # implicit associtation
    # => user
    # => product

    def to_dict(self):
        return{
            'id': self.id,
            'quantity': self.quantity,
            'product_id': self.product_id,
            'user_id': self.user_id
        }
