from flask import Flask, redirect, url_for, request, render_template, abort, make_response, jsonify
from flask_restful import Api, Resource
from config import DevConfig

from Twitter.client import query_users

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
    def get(self, query, page):
        if query:
            result = query_users(query, page)
            return result
        else:
            abort(404)

api.add_resource(Search, '/search/<string:query>/<int:page>', endpoint='search')


if __name__ == "__main__":
    app.run(host='0.0.0.0')
