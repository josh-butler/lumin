import os
import json

from flask import Flask, redirect, url_for, request, render_template, abort, make_response, jsonify
from flask_restful import Api, Resource
from config import DevConfig
from pymongo import MongoClient, DESCENDING
from bson.json_util import dumps

from Twitter.client import query_users


client = MongoClient(
    os.environ['SUMIT_MONGO_1_PORT_27017_TCP_ADDR'],
    27017)
db = client.twitter
profiles = db.profiles

app = Flask(__name__)
# default dev config settings
app.config.from_object(DevConfig)
# points to env file with production settings
# that will override the dev config above
app.config.from_envvar('WEB_SETTINGS')

api = Api(app)

# Allow CORS
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

#--- WEB ---#
#############

@app.route('/')
def default():
    return 'API index view'

#--- API ---#
#############


class ProfileList(Resource):
    """
    Get a list of all recorded profiles sorted by click count
    """
    def get(self):
        cursor = profiles.find({}, {'_id': 0}).sort([("count", DESCENDING)])
        id_list = [json.loads(dumps(item)) for item in cursor]
        return id_list


class Search(Resource):
    """
    Default API resource
    """
    def get(self, query, per_page, page):
        if query:
            result = query_users(query, page, per_page)
            return result
        else:
            abort(404)


class ProfileCounter(Resource):
    """
    Insert and retrieve mongo documents by id_str
    """

    def get(self, id_str):
        if id_str:
            query_bson = profiles.find_one({"id_str": id_str}, {'_id': 0})
            if query_bson:
                dumped_data = dumps(query_bson)
                resp = json.loads(dumped_data)
                return resp
        else:
            abort(404)

    def post(self, id_str):
        if id_str:
            query_bson = profiles.find_one({"id_str": id_str})
            if query_bson:
                profiles.update({"id_str": id_str}, {'$inc': {'count': 1}})
            else:
                profiles.insert_one({"id_str": id_str, "count": 1, "data": request.json.get('data')})

            query_bson = profiles.find_one({"id_str": id_str})
            dumped_data = dumps(query_bson)
            resp = json.loads(dumped_data)
            return resp
        else:
            abort(404)


api.add_resource(Search, '/search/<string:query>/<int:per_page>/<int:page>', endpoint='search')
api.add_resource(ProfileCounter, '/increment/<string:id_str>', endpoint='increment_profile')
api.add_resource(ProfileList, '/profile-list', endpoint='profile_list')


if __name__ == "__main__":
    app.run(host='0.0.0.0')
