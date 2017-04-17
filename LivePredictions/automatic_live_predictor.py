import json
from json import JSONEncoder
import requests
import pprint
import numpy as np
import pandas as pd
from sklearn import model_selection
from sklearn.linear_model import LinearRegression
import pickle
import time
import sys

# load the model from disk
filename = 'finalized_model.sav'
loaded_model = pickle.load(open(filename, 'rb'))

api_key = "API-KEY"
api_key2 = "API-KEY2"
your_classifier = "default"
threshold = "0.0"
urlClassify_p1 = "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=" + api_key + "&url="
urlClassify_p2 = "&classifier_ids=" + your_classifier + "&threshold=" + threshold + "&version=2016-05-20"


countAPIcalls = 0
alreadysendposts = []


hierarchy_primary = []
hierarchy_secondary = []
hierarchy_tertiary = []
with open('dataset_watsonClasses_Reduced_primary.json') as data_file:    
    hierarchy_primary = json.load(data_file)
with open('dataset_watsonClasses_Reduced_secondary.json') as data_file:    
    hierarchy_secondary = json.load(data_file)
with open('dataset_watsonClasses_Reduced_tertiary.json') as data_file:    
    hierarchy_tertiary = json.load(data_file)

beautifuldestinations_followers = 8700000
etdieucrea_followers = 100000
instagood_followers = 867000
josecabaco_followers = 48800
kissinfashion_followers = 2400000

recentPosts = []

def searchAlreadysendposts(postCode):
    for post in alreadysendposts:
        if postCode == post: 
            return True
    return False

def searchWatsontype(watsonClasses, category):
    for watsontype in watsonClasses:
        if watsontype["class"] == category:
            return watsontype["score"]
    return 0.0

def generateUserData(followers, watsonClasses):
    Input = []
    primary = []
    for category in hierarchy_primary:
        primary.append(searchWatsontype(watsonClasses, category))
    secondary = []
    for category in hierarchy_secondary:
        secondary.append(searchWatsontype(watsonClasses, category))
    tertiary = []
    for category in hierarchy_tertiary:
        tertiary.append(searchWatsontype(watsonClasses, category))
    Input.append(followers)
    #Time 24H to predict
    Input.append( 86400 ) 
    Input.extend(primary)
    Input.extend(secondary)
    Input.extend(tertiary)
    return Input

def amountFollowers(username):
    if username == "beautifuldestinations":
        return beautifuldestinations_followers
    if username == "etdieucrea":
        return etdieucrea_followers
    if username == "instagood":
        return instagood_followers
    if username == "josecabaco":
        return josecabaco_followers
    if username == "kissinfashion":
        return kissinfashion_followers
    return 0

def uploadPrediction(prediction, code):
    payload = {'post': ""+code, 'likes': int(prediction + 0) }
    pprint.pprint(payload)
    r = requests.post('http://user:password@challenges.instagram.unpossib.ly/api/submissions', data=json.dumps(payload))
    pprint.pprint(r)

def readUserPosts():
    for user in recentPosts["accounts"]:
        for post in user["posts"]:
            if (searchAlreadysendposts(post["instagram"]["code"])):
                pprint.pprint(post["instagram"]["display_src"])
            else:    
                watsonResponse = requests.get(urlClassify_p1 + post["instagram"]["display_src"] + urlClassify_p2)
                watsonResponse = watsonResponse.json()
                global countAPIcalls
                countAPIcalls += 1
                print("")
                if(countAPIcalls > 220):
                    api_key = api_key2
                watsonClasses = watsonResponse["images"][0]["classifiers"][0]["classes"]
                sample_post = generateUserData(amountFollowers(user["username"]), watsonClasses)
                prediction = loaded_model.predict([sample_post])
                print(prediction[0])
                print(post["instagram"]["code"])
                uploadPrediction(prediction, post["instagram"]["id"])
                pprint.pprint(post["instagram"]["display_src"])
                alreadysendposts.append(post["instagram"]["code"])

#with open('data.json') as data_file:    
#    data = json.load(data_file)

while True:
    try:
        # Wait for 60 seconds
        print("Search")
        recentPosts = requests.get('http://challenges.instagram.unpossib.ly/api/live', auth=('user', 'password'))
        recentPosts = recentPosts.json()
        if (recentPosts["success"]):
            #pprint.pprint(recentPosts)
            readUserPosts()
        else:
            pprint.pprint("Error on Request to recent live posts")
        time.sleep(60)
    except:
        print("error, but I handle it ;)")

XY = 0
