import requests, json, random

def search_songs(access_token, genre):
    url = "https://api.spotify.com/v1/search"
    headers = {
        "Authorization": f"Bearer {access_token}",
    }
    markets = ["US", "GB", "AU", "CA", "NZ"]
    aggregated_songs = []

    for market in markets:
        params = {
            "q": genre,
            "type": "track",
            "limit": 50,
            "market": market 
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
                aggregated_songs.append(song_info)

    selected_songs = random.sample(aggregated_songs, min(25, len(aggregated_songs)))
    return selected_songs


def create_playlist(user_id, access_token, playlist_name, songs, emojis):
    create_playlist_url = f"https://api.spotify.com/v1/users/{user_id}/playlists"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    payload = {
        "name": playlist_name,
        "description": f"A playlist made using EMOJIZE for the emojis - {emojis}",
        "public": True
    }

    response = requests.post(create_playlist_url, headers=headers, json=payload)
    playlist_id = response.json()['id']
    add_tracks_url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
    song_uris = [f"spotify:track:{song['song_id']}" for song in songs]

    add_tracks_response = requests.post(add_tracks_url, headers=headers, json={"uris": song_uris})

    return f"https://open.spotify.com/playlist/{playlist_id}"
