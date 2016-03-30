from flask import Flask, redirect, url_for, request, render_template, abort, make_response, jsonify
from flask_restful import Api, Resource
from config import DevConfig

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
    return 'WEB index view'

#--- API ---#
#############

class Info(Resource):
    """
    Default API resource
    """
    def get(self, param_str):
        if param_str:
            return {'param_str': param_str}
        else:
            abort(404)

api.add_resource(Info, '/info/<string:param_str>', endpoint='info')


if __name__ == "__main__":
    app.run(host='0.0.0.0')
