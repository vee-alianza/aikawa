from .db import db


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(50))
    total_cost = db.Column(
        db.Float(precision=4, asdecimal=False), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def to_dict(self):
        return{
            'id': self.id,
            'status': self.status,
            'total_cost': self.total_cost,
            'user_id': self.user_id
        }
