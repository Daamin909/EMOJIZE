from groq import Groq
import os
from spotify import search_songs, create_playlist
from pymongo import MongoClient



def make_playlist(emojis):
    clientDB = MongoClient(os.getenv("MONGO_URL"))
    db = clientDB["emojize"]
    emojize_collection = db["tokens"]
    token_data = emojize_collection.find_one()
    user_id = os.getenv("USER_ID")
    access_token = token_data['access_token']
    genre = getGenre(emojis)
    songs = search_songs(genre=genre, access_token=access_token)
    playlist_name = getPlaylistName(songs, genre)
    playlist = create_playlist(user_id=user_id, access_token=access_token, playlist_name=playlist_name, songs=songs, emojis=emojis)

    playlist_data = {
        "songs": songs,
        "playlist_name" :playlist_name,
        "playlist_url": playlist
    }
    return playlist_data

def getGenre(emojis):

    client = Groq(api_key=os.getenv("API_KEY"))
    response = client.chat.completions.create(
        model="llama-3.1-70b-versatile",
        messages=[
            {"role": "system", "content": "You are an emoji identifier Bot. When the user sends emojis, reply with an emotion that suits those emojis. For example, angry emojis corresponds to angriness. A high number of angry emojis should increase the intensity (e.g., \"angry2\"). You can map  emotions like romance, anger, happiness, sadness, fear, surprise, disgust, love, gratitude, confusion, excitement, nostalgia, loneliness, guilt, shame, pride, hope, relief, frustration, boredom, jealousy, empathy, contentment, anticipation, envy, euphoria, melancholy, trust, regret, sympathy, awe and others. If there are repeated emojis, increase the intensity level. Reply with the format: \"(emotion_name)(level_of_intensity_as_an_integer\" Example: \"sad3\" signifies an intensity of sadness at level 3. The maximum level is 5. ONLY AND ONLY REPLY IN THIS FORMAT. DO NOT TAKE LIBERTY OF GIVING EXTRA INFORMATION. DO AS SAID. "},
            {"role": "user", "content": emojis}
        ],
        temperature=1,
        max_tokens=15,
        top_p=1,
        stream=False,
        stop=None,
    )
    response = client.chat.completions.create(
        model="llama-3.1-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a genre identifier bot. The user will send a human emotion to you along with its intensity in the format \"(emotion)(emotion_intensity)\" Reply with a musical genre for example rock, metal or ANY MUSIC GENRE AT ALL. DO NOT TAKE LIBERTY TO GIVE EXTRA INFO. DO AS SAID. Reply with \"(musical_genre_name)\". DO NOT DISOBEY MY INSTRUCTIONS."},
            {"role": "user", "content": response.choices[0].message.content}
        ],
        temperature=1,
        max_tokens=20,
        top_p=1,
        stream=False,
        stop=None,
    )
    return response.choices[0].message.content

def getPlaylistName(songs, genre):
    song_names = [song['name'] for song in songs]
    client = Groq(api_key=os.getenv("API_KEY"))
    response = client.chat.completions.create(
        model="llama-3.1-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a Spotify Playlist Namer Bot. The user provides a list of songs and a genre. Based on these things you give a name to their playlist. The name has to be 1-5 words maximum. The information will be given in this format (\"Songs: {song_names} \n Genre: {genre})\". DO NOT TAKE THE LIBERTY TO GIVE EXTRA INFORMATION. YOU ARE A CRITICAL BOT. FAILURE TO OBEY INSTRUCTIONS MIGHT CAUSE APPLICATION FAILURE. THE RESPONSE HAS TO JUST BE (playlist_name). NOTHING MORE, NOTHING LESS. DO AS SAID. DO NOT DISOBEY INSTRUCTIONS."},
            {"role": "user", "content": f"Songs: {song_names} \n Genre: {genre}"}
        ],
        temperature=1,
        max_tokens=15,
        top_p=1,
        stream=False,
        stop=None,
    )
    return response.choices[0].message.content