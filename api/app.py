import os
import json

from flask import Flask, redirect, url_for, request, render_template, abort, make_response, jsonify
from flask_restful import Api, Resource
from config import DevConfig
from pymongo import MongoClient
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
    Insert and retrieve mongo documents by gml_id
    """

    # def get(self, gml_id):
    #     if gml_id:
    #         query_bson = json_collection.find_one({"root_gml_id": gml_id})
    #         if query_bson:
    #             # decode bson to string with bson.util
    #             dumped_data = dumps(query_bson)
    #             resp = json.loads(dumped_data)
    #             return resp
    #     else:
    #         abort(404)

    # TODO store full user json data mongo
    def post(self, id_str):
        if id_str:
            query_bson = profiles.find_one({"id_str": id_str})
            if query_bson:
                profiles.update({"id_str": id_str}, {'$inc': {'count': 1}})
            else:
                profiles.insert_one({"id_str": id_str, "count": 1})

            query_bson = profiles.find_one({"id_str": id_str})
            dumped_data = dumps(query_bson)
            resp = json.loads(dumped_data)
            return resp
        else:
            abort(404)


api.add_resource(Search, '/search/<string:query>/<int:per_page>/<int:page>', endpoint='search')
api.add_resource(ProfileCounter, '/increment/<string:id_str>', endpoint='increment_profile')


if __name__ == "__main__":
    app.run(host='0.0.0.0')
