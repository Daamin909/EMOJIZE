import os, requests
from pymongo import MongoClient

def refresh_access_token():
    clientDB = MongoClient(os.getenv("MONGO_URL"))
    db = clientDB["emojize"]
    emojize_collection = db["tokens"]
    token_data = emojize_collection.find_one()  

    refresh_token = token_data["refresh_token"]

    CLIENT_ID = os.getenv('CLIENT_ID')
    CLIENT_SECRET = os.getenv('CLIENT_SECRET')
    TOKEN_URL = 'https://accounts.spotify.com/api/token'

    data = {
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
    }
    auth = (CLIENT_ID, CLIENT_SECRET)
    response = requests.post(TOKEN_URL, data=data, auth=auth)

    tokens = response.json()
    new_access_token = tokens['access_token']
    expires_in = tokens['expires_in']  
    emojize_collection.update_one(
        {}, 
        {"$set": {"access_token": new_access_token, "expires_in_seconds": expires_in}}
    )

