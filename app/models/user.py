from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    # first_name = db.Column(db.String(50), nullable=False)
    # last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    # address = db.Column(db.String(150), nullable=False)
    # city = db.Column(db.String(150), nullable=False)
    # state = db.Column(db.String(150), nullable=False)
    # zip_code = db.Column(db.Integer, nullable=False)
    # country = db.Column(db.String(150), nullable=False)


    orders = db.relationship('Order', back_populates='user')
    written_review = db.relationship('Review', back_populates='user_review')
    # cart_orders = db.relationship('Cart_Item', back_populates='user_cart')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
