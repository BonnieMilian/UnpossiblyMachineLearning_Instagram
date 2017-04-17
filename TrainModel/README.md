# UnpossiblyMachineLearning_Instagram
## Train Model

Training Multiple Linear Regression Model

Implemented on Python.

Was used the [scikit-learn](http://scikit-learn.org/stable/) librarie.

Machine learning module for Python
> sklearn is a Python module integrating classical machine learning algorithms in the tightly-knit world of scientific Python packages (numpy, scipy, matplotlib).


And was used the linear_model from the LinearRegression Module.

```python
#read data
instagramDataFrame = pd.read_csv('dataset_users_watsonClass_train.csv')
data = instagramDataFrame.values
X = data[:,0:85] #Inputs: Followers, timestamp, H1, H2, H3
Y = data[:,85] #Output: likes
#train Model
model = LinearRegression(False,False,False,-1)
model.fit(X,Y)
#save model to sav file
filename = 'finalized_model.sav'
pickle.dump(model, open(filename, 'wb'))
#short test
sample_post = [[8700000,1747891,0,0,0,0,0,0.536,0,0,0,0.756,0,0,0.647,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.755,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]

prediction = model.predict(sample_post)

print(prediction)
print(188762)

result = model.score(X, Y)
print(result)
```


*To create a better model all the 5000 data pieces must be used, 4500 Train, 500 Test*