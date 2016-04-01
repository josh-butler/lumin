import os
import tweepy
from marshmallow import Schema, fields

CONSUMER_KEY = os.getenv('CONSUMER_KEY')
CONSUMER_SECRET = os.getenv('CONSUMER_SECRET')
ACCESS_TOKEN_KEY = os.getenv('ACCESS_TOKEN_KEY')
ACCESS_TOKEN_SECRET = os.getenv('ACCESS_TOKEN_SECRET')

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET)

api = tweepy.API(auth)


class UserSchema(Schema):
    id_str = fields.Str()
    name = fields.Str()
    screen_name = fields.Str()
    url = fields.Str()
    profile_image_url = fields.Str()
    location = fields.Str()


def query_users(query, page, per_page=5):
    users = []
    schema = UserSchema()
    for user in api.search_users(query, per_page, page):
        result = schema.dump(user)
        users.append(result.data)
    return users

query_users('boots', 1)
