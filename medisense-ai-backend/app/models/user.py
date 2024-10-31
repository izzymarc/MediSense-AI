from flask_login import UserMixin
from app.extensions import mongo

class User(UserMixin):
    def __init__(self, id, first_name, last_name, email, password):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password

    @staticmethod
    def get_by_email(email):
        return mongo.db.users.find_one({'email': email})

    @staticmethod
    def get_by_id(user_id):
        return mongo.db.users.find_one({'_id': user_id})