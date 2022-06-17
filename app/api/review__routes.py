from flask import Blueprint, request, render_template, session
from flask_login import login_required, current_user
from app.models import db, Review, Product


review_routes = Blueprint('reviews', __name__)


@review_routes.route('/products/<int:product_id>')
@login_required
def get_user_product_review(product_id):
    """
    Checks if user has left a review for a specific product
    """
    product = Product.query.get(product_id)
    for reviews in product.all_reviews:
        if reviews.user_id == current_user.id:
            return {'hasReviewed': True}
    return {'hasReviewed': False}


@review_routes.route('/', methods=['POST'])
@login_required
def add_user_review():
    """
    Adds user's review
    """
    errors = []
    new_review_data = request.json['review']
    if new_review_data['title'].strip() == '':
        errors.append('Title required.')
    if len(new_review_data['title']) > 100:
        errors.append('Title must be fewer than 100 characters.')
    if new_review_data['content'].strip() == '':
        errors.append('Content required')
    if len(new_review_data['content']) > 300:
        errors.append('Review must be less than 300 characters.')
    if 5 < new_review_data['rating'] < 1:
        errors.append('Invalid rating.')
    if len(errors) > 0:
        return {'errors': errors}, 400
    review = Review(
        title = new_review_data['title'],
        content = new_review_data['content'],
        rating = new_review_data['rating'],
        user_id = current_user.id,
        product_id = new_review_data['productId']
    )
    db.session.add(review)
    db.session.commit()
    return {'review': review.to_dict()}



@review_routes.route('/<int:review_id>', methods=['PATCH'])
@login_required
def update_user_review(review_id):
    """
    Updates a user's review
    """
    errors = []
    new_review_data = request.json['review']
    if new_review_data['title'].strip() == '':
        errors.append('Title required.')
    if len(new_review_data['title']) > 100:
        errors.append('Title must be fewer than 100 characters.')
    if new_review_data['content'].strip() == '':
        errors.append('Content required')
    if len(new_review_data['content']) > 300:
        errors.append('Review must be less than 300 characters.')
    if 5 < new_review_data['rating'] < 1:
        errors.append('Invalid rating.')
    if len(errors) > 0:
        return {'errors': errors}, 400
    review = current_user.reviews.filter(Review.id == review_id).first()
    review.title = new_review_data['title']
    review.content = new_review_data['content']
    review.rating = new_review_data['rating']
    db.session.commit()
    return {'success': True}


@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_user_review(review_id):
    """
    Deletes a user's review
    """
    review = current_user.reviews.filter(Review.id == review_id).first()
    db.session.delete(review)
    db.session.commit()
    return {'success': True}
