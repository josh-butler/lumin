import os
import json
import uuid
from operator import itemgetter

from flask import Flask, redirect, url_for, request, render_template, abort, make_response, jsonify
from flask_restful import Api, Resource
from config import DevConfig
from pymongo import MongoClient, DESCENDING
from bson.json_util import dumps


client = MongoClient(
    os.environ['LUMIN_MONGO_1_PORT_27017_TCP_ADDR'],
    27017)
db = client.features
queue = db.queue
priorities = db.priorities

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


def add_priority(new_request, requests):
    """
    Adds a new request to the given priority list and shuffles the priority values accordingly
    :param new_request: {'request_id': 'fish', 'priority': 2}
    :param requests: {'dog': 1, 'cat': 2, 'bird': 3, 'snake': 4, 'pig': 5}
    :return: {'dog': 1, 'cat': 3, 'bird': 4, 'snake': 5, 'pig': 6, 'fish': 2}
    """
    priority_index = max(new_request['priority']-1, 0)
    request_index_pairs = sorted(requests.items(), key=lambda item: item[1])
    request_ids = [request_id[0] for request_id in request_index_pairs]
    request_ids.insert(priority_index, new_request['request_id'])
    updated_requests = {req[1]: req[0]+1 for req in enumerate(request_ids)}
    return updated_requests


def update_client_priorities(client_id, uid, priority):
    updated_priorities = {}
    priority = int(priority)

    cursor = priorities.find({"client_id": client_id}, {'_id': 0, "client_id": 0})
    if not cursor.count():
        priorities.insert_one({"client_id": client_id, "uid": uid, 'priority': 1})
    else:
        client_requests = {json.loads(dumps(item))['uid']: int(json.loads(dumps(item))['priority']) for item in cursor}
        new_request = {'request_id': uid, 'priority': priority}

        updated_priorities = add_priority(new_request, client_requests)
        for n_uid in updated_priorities:
            new_priority = updated_priorities[n_uid]
            if n_uid != uid:
                priorities.update_one({"uid": n_uid}, {'$set': {"priority": new_priority}})
            else:
                priorities.insert_one({"client_id": client_id, "uid": uid, 'priority': new_priority})

    return updated_priorities


class RequestQueue(Resource):
    """
    Retrieve all requests for a given client sorted by priority
    """
    def get(self, client_id):
        if client_id:
            cursor = queue.aggregate([
                {'$match': {'client': client_id}},
                {'$lookup': {
                    'from': 'priorities',
                    'localField': 'uid',
                    'foreignField': 'uid',
                    'as': "priority_docs"}}])

            items = [json.loads(dumps(item)) for item in cursor]

            requests = [{
                            'uid': item['uid'],
                            'description': item['description'],
                            'client': item['client'],
                            'date': item['date'],
                            'product': item['product'],
                            'title': item['title'],
                            'ticketUrl': item['ticketUrl'],
                            'priority': item['priority_docs'][0]['priority']
                         } for item in items]

            sorted_requests = sorted(requests, key=itemgetter('priority'))

            return sorted_requests
        else:
            abort(404)


class FeatureRequest(Resource):
    """
    Insert mongo documents representing feature requests
    """
    def post(self):
        if request.json:
            data = request.json['data']
            client_id = data['client']
            priority = data['priority']
            uid = str(uuid.uuid1())

            request_doc = {
                'title': data['title'],
                'description': data['description'],
                'client': client_id,
                'product': data['product'],
                'date': data['date'],
                'ticketUrl': data['ticketUrl'],
                'uid': uid
            }
            record_created = queue.insert_one(request_doc)
            client_priorities = update_client_priorities(client_id, uid, priority)
            if record_created:
                return {'priorities': client_priorities}
            else:
                return {'priorities': 0}
        else:
            abort(404)


api.add_resource(FeatureRequest, '/feature-request', endpoint='feature_request')
api.add_resource(RequestQueue, '/request-q/<string:client_id>', endpoint='request_q')

if __name__ == "__main__":
    app.run(host='0.0.0.0')
