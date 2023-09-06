import requests
import random
import bcrypt


API = "https://api.dicebear.com/7.x/"


STYLES = [
    "adventurer",
    "avataaars",
    "bottts",
    "icons",
    "identicon",
    "pixel-art",
    "shapes",
    "thumbs",
]


def get_avatar():
    style = random.choice(STYLES)
    url = API + style + "/svg"
    a = requests.get(url)
    return a.text
    

def get_user_data(new_user): 
    return {
        "email" :new_user.email,
        "first_name" : new_user.first_name,
        "last_name" : new_user.last_name,
        "image" : new_user.user_profile_image.url
    }
    