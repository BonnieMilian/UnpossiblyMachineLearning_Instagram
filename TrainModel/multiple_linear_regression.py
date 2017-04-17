import json
import requests
import pprint
import numpy as np
import pandas as pd
from sklearn import model_selection
from sklearn.linear_model import LinearRegression
import pickle
#from sklearn.datasets import load_boston

#read data
instagramDataFrame = pd.read_csv('dataset_users_watsonClass_train.csv')
data = instagramDataFrame.values

X = data[:,0:85]
Y = data[:,85]

#Model
model = LinearRegression(False,False,False,-1)
model.fit(X,Y)
# save the model to disk
filename = 'finalized_model.sav'
pickle.dump(model, open(filename, 'wb'))

# Mak a prediction using the model
sample_post = [[8700000,1747891,0,0,0,0,0,0.536,0,0,0,0.756,0,0,0.647,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.755,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]

prediction = model.predict(sample_post)

print(prediction)
print(188762)

result = model.score(X, Y)
print(result)