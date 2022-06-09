from .db import db

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(50))
    total_cost = db.Column(
        db.Float(precision=2, asdecimal=False), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    # implicit associations
    # => user

    user = db.relationship('User', back_populates='orders')



    def to_dict(self):
        return{
            'id': self.id,
            'status': self.status,
            'total_cost': self.total_cost,
            'user_id': self.user_id,
            'user': self.user.to_dict(),
            'ordered_items': self.ordered_items.to_dict()
        }
