# UnpossiblyMachineLearning_Instagram
## Live Predictions

The unpossib.ly API uptade every 60 seconds.

Every 60 seconds ask if there are new post to predict the amount of likes that the post will have 24h later.

Simplified version of the code:
```python
# load the model from disk

filename = 'finalized_model.sav'
loaded_model = pickle.load(open(filename, 'rb'))


#Ask for updates every 60 seconds
while True:
    recentPosts = requests.get('http://challenges.instagram.unpossib.ly/api/live', auth=('user', 'password'))
    recentPosts = recentPosts.json()
    if (recentPosts["success"]):
        #pprint.pprint(recentPosts)
        readUserPosts()
    time.sleep(60)



api_key = "API-KEY"
api_key2 = "API-KEY2"
your_classifier = "default"
threshold = "0.0"
urlClassify_p1 = "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=" + api_key + "&url="
urlClassify_p2 = "&classifier_ids=" + your_classifier + "&threshold=" + threshold + "&version=2016-05-20"

#The live api call return posts per user.
def readUserPosts():
    for user in recentPosts["accounts"]:
        for post in user["posts"]:
            #Verified if this post was already analized
            if (...):
                ...
            else:
                #Watson API call
                watsonResponse = requests.get(urlClassify_p1 + post["instagram"]["display_src"] + urlClassify_p2)
                watsonResponse = watsonResponse.json()
                watsonClasses = watsonResponse["images"][0]["classifiers"][0]["classes"]
                sample_post = generateUserData(amountFollowers(user["username"]), watsonClasses)
                
                #Predict with a Multiple Linear Regression
                prediction = loaded_model.predict([sample_post])
                
                print(prediction[0])
                print(post["instagram"]["code"])
                
                uploadPrediction(prediction, post["instagram"]["id"])
                pprint.pprint(post["instagram"]["display_src"])
                # Add to analized posts list

#Analize Image on the post, prepare input data
def generateUserData(followers, watsonClasses):
    Input = []
    primary = []
    for category in hierarchy_primary:
        primary.append(searchWatsontype(watsonClasses, category))
    #secondary ...
    #tertiary ...

    Input.append(followers)
    #Time 24H to predict
    Input.append( 86400 ) 
    Input.extend(primary)
    Input.extend(secondary)
    Input.extend(tertiary)
    return Input

#Upload Prediction
def uploadPrediction(prediction, code):
    payload = {'post': ""+code, 'likes': int(prediction + 0) }
    pprint.pprint(payload)
    r = requests.post('http://user:password@challenges.instagram.unpossib.ly/api/submissions', data=json.dumps(payload))
    pprint.pprint(r)
```