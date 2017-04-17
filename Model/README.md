# UnpossiblyMachineLearning_Instagram
## Model


Was used a Multiple Linear Regression Model.

2 static Inputs and  3 dynamic Inputs, *depends on the amount of training data used*

1 Output

With the 245 data pieces, was used 84 Inputs.

### Design
#### Inputs
- Amount of Followers that the user has
    - Numerical representation
    - Some user has millions other hundreds
    - This one affect a lot the likes that a post could have
- Timestamp
    - Numerical representation, seconds
    - On Training varies
    - For predictions 24h
- Hierarchical Categories
    - This one analyze the content of the image
    - Primary
    - Secondary
    - Tertiary

##### Hierarchical Categories
Every Hierarchy has an amount of categories or [Watson Classes](https://www.ibm.com/watson/developercloud/visual-recognition/api/v3/#classify_an_image)

Each class is represented by a number from 0 to 1, that is the score that the watson api output.
> The score of a class identified in the image. Scores range from 0-1, with a higher score indicating greater correlation.

*Not all the classes are in the watson api response, if not appear is considered 0*

#### Output
Likes that the instagram post will have.

### Image of the Model
Coming soon...

### Possible Improves
- Obtain more watson classes, use all the 5000 data pieces
- Add data that qualifies the image, like if is blur, the light or the colors, Google API could give this kind of information
- Combine Watson and Google APIs
- Maybe the 4th and 5th Hierarchical Categories will help

*Please notify me if you try to improve it, I want to know how you do it* :smile: