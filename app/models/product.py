from .db import db

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False, unique=True)
    price = db.Column(db.Float(precision=2, asdecimal=False), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    image = db.Column(db.Text)
    quantity = db.Column(db.Integer, nullable=False)

    product_orders = db.relationship('Product_Order', backref='product', cascade='all, delete')
    product = db.relationship('Review', back_populates='product_review')
    # cart_product = db.relationship('Cart_Item', back_populates ='cart')


    def to_dict(self):
        return{
            'id': self.id,
            'title': self.title,
            'price': self.price,
            'description': self.description,
            'image': self.image,
            'quantity': self.quantity
        }
