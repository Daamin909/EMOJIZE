import requests
from groq import Groq
import os

def getPlaylistName(songs):
    song_names = [song['name'] for song in songs]
    client = Groq(api_key=os.getenv("API_KEY"))
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a Spotify Playlist Namer Bot. The user provides a list of songs. Based on these things you give a name to their playlist. The name has to be 1-5 words maximum. The information will be given in this format (\"Songs: {song_names})\". DO NOT TAKE THE LIBERTY TO GIVE EXTRA INFORMATION. YOU ARE A CRITICAL BOT. FAILURE TO OBEY INSTRUCTIONS MIGHT CAUSE APPLICATION FAILURE. THE RESPONSE HAS TO JUST BE (playlist_name). NOTHING MORE, NOTHING LESS. DO AS SAID. DO NOT DISOBEY INSTRUCTIONS."},
            {"role": "user", "content": f"Songs: {song_names}"}
        ],
        temperature=1,
        max_tokens=15,
        top_p=1,
        stream=False,
        stop=None,
    )
    return response.choices[0].message.content

def search_songs(access_token, queries):
    url = "https://api.spotify.com/v1/search"
    headers = {
        "Authorization": f"Bearer {access_token}",
    }
    songs = []
    for query in queries:
        params = {
            "q": query,
            "type": "track",
            "limit": 1,
            "market": "US" 
        }
        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 200:
            data = response.json()
            for track in data["tracks"]["items"]:
                song_info = {
                    "song_id": track["id"],
                    "name": track["name"],
                    "artists": ", ".join([artist["name"] for artist in track["artists"]]),
                    "image_url": track["album"]["images"][0]["url"] if track["album"]["images"] else None,
                    "duration": f"{track['duration_ms'] // 60000}:{(track['duration_ms'] // 1000) % 60:02}"
                }
                songs.append(song_info)

    return songs

def create_playlist(user_id, access_token, playlist_name, songs, emojis):
    create_playlist_url = f"https://api.spotify.com/v1/users/{user_id}/playlists"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    payload = {
        "name": playlist_name,
        "description": f"A playlist made using E M O J I Z E for the emojis - {emojis}",
        "public": True
    }

    response = requests.post(create_playlist_url, headers=headers, json=payload)
    print(response.json())
    playlist_id = response.json()['id']
    add_tracks_url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
    song_uris = [f"spotify:track:{song['song_id']}" for song in songs]

    requests.post(add_tracks_url, headers=headers, json={"uris": song_uris})


    imageurl = f"https://api.spotify.com/v1/playlists/{playlist_id}"
    imageresp = requests.get(imageurl, headers=headers)
    data = imageresp.json()
    images = data.get("images", [])
    return [playlist_id , images[0]["url"]  ]
