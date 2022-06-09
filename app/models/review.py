from .db import db


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String(300), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))


def to_dict(self):
    return{
        'id': self.id,
        'title': self.title,
        'content': self.content,
        'rating': self.rating,
        'user_id': self.user_id,
        'product_id': self.product_id
    }
