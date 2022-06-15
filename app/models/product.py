from .db import db

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False, unique=True)
    price = db.Column(db.Float(precision=2, asdecimal=False), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    ordered_items = db.relationship('Product_Order', backref='product', cascade='all, delete')
    reviews = db.relationship('Review', backref='product', cascade='all, delete')
    cart_items = db.relationship('Cart_Item', backref='product', cascade='all, delete')
    images = db.relationship('Product_Image', backref='product', cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'price': self.price,
            'description': self.description,
            'quantity': self.quantity,
            'images': [image.to_dict() for image in self.images]
        }

    def to_cart_item(self):
        return {
            'productId': self.id,
            'title': self.title,
            'price': self.price,
            'description': self.description,
            'image': self.images[0].to_dict()['url'],
            'quantity': 1
        }
