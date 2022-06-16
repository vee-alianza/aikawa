from flask import Blueprint, request, render_template, session
from flask_login import login_required, current_user
from app.models import db, Review


review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
def get_reviews():
    """
    Gets all reviews
    """
