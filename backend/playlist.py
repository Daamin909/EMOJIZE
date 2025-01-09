from groq import Groq
import os
from spotify import search_songs, create_playlist, getPlaylistName
from pymongo import MongoClient
import ast



def compileQueries(emojis, customization, popular_events, topics):
    numQ = customization['numberOfSongs']
    moreOf = customization['moreGenre']
    lessOf = customization['lessGenre']
    includeExplicit = customization['includeExplicit']
    client = Groq(api_key=os.getenv("API_KEY"), http_client=None)
    if (popular_events == "0"):
        popular_events = None
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
            "role": "system",
            "content": "You are a bot that generates Spotify search queries based on the user's preferences. The user will provide a set of emojis, popular events they like (or none), the number of songs, their likes (optional), dislikes (optional), and whether to include explicit content (true or false). Based on these inputs, generate a list of Spotify search queries. The number of queries should match the number of songs requested. Exclude any queries containing the user's dislikes. Divide the queries evenly between popular events and topics, ensuring only 1-2 queries include the user's likes. Do not repeat the user's likes multiple times. Avoid overly specific queries that might not return results. Do not include keywords like 'playlist', 'new', 'explicit', or 'songs'. Ensure the format is exactly like this: [query_1, query_2, ..., last_query]. Failure to follow these rules may cause application failure. Follow the instructions precisely. DO NOT TAKE THE LIBERTY TO GIVE EXTRA INFORMATION, ONLY REPLY WITH THE FORMAT. DO AS SAID. KEEP THE QUERY IN A SQUARE BRACKET LIKE SAID. AND EACH QUERY IN DOUBLE QUOTES AS SAID."
            },
            {"role": "user", "content": f"The emojis are: {emojis}. The popular events are: {popular_events}. Topics: {topics}. Number of songs: {numQ}. Likes: {moreOf}. Dislikes: {lessOf}. Include Explicit Content: {includeExplicit}"}
        ],
        temperature=1,
        max_tokens=2000,
        top_p=1,
        stream=False,
        stop=None,
    )
    return response.choices[0].message.content

def searchFor(emojis):
    client = Groq(api_key=os.getenv("API_KEY"))
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
            "role": "system",
            "content": "You are an Emoji Identifier Bot. When the user enters some emojis, you reply with a list of topics based on the emojis, separated by commas. The format is strictly \"topic_1, topic_2, topic_3, last_topic\". DO NOT ADD EXTRA INFORMATION OR CONTEXT. Only respond with relevant topics derived from the emojis. Failure to obey these rules might cause application failure. Respond with 3-10 topics only."
            },
            {"role": "user", "content": emojis}
        ],
        temperature=1,
        max_tokens=80,
        top_p=1,
        stream=False,
        stop=None,
    )
    return response.choices[0].message.content

def identifyEvent(emojis):
    client = Groq(api_key=os.getenv("API_KEY"))
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
            "role": "system",
            "content": "You are a bot who identifies if a series of emojis relates to a SIGNIFICANT POPULAR INCIDENT, EVENT, or INTERNET TREND that has massive cultural impact, either historically or recently. These incidents should have wide recognition (more than 25% of the population knows it) or be notable in Gen-Z internet culture. If the emojis represent such an event or trend, respond with 1-3 words ONLY. If the emojis do not relate to any such event or trend, respond with 0. If the emojis do not form a meaningful series or recognizable event, respond with 0 as well. Do not provide any additional information or context. Strictly follow these instructions. For example, respond with 'Skibidi Toilet' for the Skibidi Toilet trend or 'Morbius Sweep' for the Morbius meme. If the emojis are not relevant, simply reply '0'."
            },
            {"role": "user", "content": emojis}
        ],
        temperature=1,
        max_tokens=40,
        top_p=1,
        stream=False,
        stop=None,
    )
    return response.choices[0].message.content

def getSearchQuery(emojis, customization):
    popular_events = identifyEvent(emojis)
    topics = searchFor(emojis)
    compiled_queries = compileQueries(emojis, customization, popular_events, topics)
    string_list = ast.literal_eval(compiled_queries)
    return string_list

def make_playlist(emojis, customization):
    clientDB = MongoClient(os.getenv("MONGO_URL"))
    db = clientDB["emojize"]
    emojize_collection = db["tokens"]
    token_data = emojize_collection.find_one()
    user_id = os.getenv("USER_ID")
    access_token = token_data['access_token']
    searchQueries = getSearchQuery(emojis, customization)
    songs = search_songs(queries=searchQueries, access_token=access_token)
    playlist_name = getPlaylistName(songs)
    playlistInfo = create_playlist(user_id=user_id, access_token=access_token, playlist_name=playlist_name, songs=songs, emojis=emojis)

    playlist_data = {
        "playlist_name" :playlist_name,
        "playlist_id": playlistInfo[0],
        "playlist_image": playlistInfo[1]

    }
    return playlist_data
