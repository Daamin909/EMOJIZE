from dotenv import load_dotenv
load_dotenv()

from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask, request, jsonify
from flask_cors import CORS
import playlist as p
from pymongo import MongoClient
from tokens import refresh_access_token
import requests
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/get-playlist', methods=['POST'])
def getPlaylist():
    emojis = request.get_json()['emojis']
    playlist_data = p.make_playlist(emojis)
    return jsonify(playlist_data)
    
@app.route('/verifytheaccountonetimeprocessonlypleasedonotvisitthisurletcetctect', methods=['GET'])
def callback():
    clientDB = MongoClient(os.getenv("MONGO_URL"))
    db = clientDB["emojize"]
    emojize_collection = db["tokens"]
    code = request.args.get('code')
    CLIENT_ID = os.getenv('CLIENT_ID')
    CLIENT_SECRET = os.getenv('CLIENT_SECRET')

    auth_data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': 'http://localhost:5000/verifytheaccountonetimeprocessonlypleasedonotvisitthisurletcetctect',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }
    
    response = requests.post('https://accounts.spotify.com/api/token', data=auth_data)
    

    tokens = response.json()
    access_token = tokens['access_token']
    refresh_token = tokens['refresh_token']
    expires_in = tokens['expires_in']

    token_data = {"access_token": access_token, "refresh_token": refresh_token, "expires_in_seconds": expires_in}
    emojize_collection.insert_one(token_data)
    scheduler = BackgroundScheduler()
    scheduler.add_job(
        func=refresh_access_token,  
        trigger="interval",  
        seconds=expires_in*94/100,  
        id="refresh_token_job",  
        name="Refresh access tokens", 
        replace_existing=True  
    )
    scheduler.start()
    return jsonify({"access_token": access_token, "refresh_token": refresh_token})
    


if __name__ == '__main__':
    app.run(debug=True)