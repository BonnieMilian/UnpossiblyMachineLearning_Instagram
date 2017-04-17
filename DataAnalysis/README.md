# UnpossiblyMachineLearning_Instagram
## Data Analysis

1. Analyze given Data (JS)
    * Here I decide to use Watson Visual Recognition API, from IBM Watson Developer Cloud
2. Separate Data per User  (JS)
3. Add Watson Classes  (JS)
4. Generate Train Data (JS)
    * Prepare CSV for Python Implementation

### Aux Files
- Data pieces, to analyze
    - JSON file
- Try Fetch
    - NodeJS
- Try GET & POST
    - bash script

### Chop Data
*Original given Data was not uploaded, too big*

Separate Data per user, there are 5 Users on the given data. 

( @kissinfashion, @instagood, @beautifuldestinations, @etdieucrea,  @josecabaco)

The data are real posts from that users.
There are 1000 posts (with image) per user.

### Purge Data
Eliminate inneccesary data

Fields preserved:
```json
{ "updated": 0,
  "instagram": {
      "id": "", "date": 0, "display_src": "",
      "likes": {"count": 0}
      }
}
```
### Watson Classes
Was used [Watson Visual Recognition API](https://www.ibm.com/watson/developercloud/visual-recognition.html), from IBM Watson Developer Cloud.
1. Add Watson Classes
2. Unify per User Data
3. Unify All UserData
4. Categories Ocurrencies
5. Generate Train Data

##### Add Watson Classes
Api calls, was used the method Classify an image to obtain the watson Classes.

Example Response:
```json
{ "watsonClasses": [
    {"class": "four-poster bed", "score":0.851, "type_hierarchy":"/furniture/four-poster bed"},
    {"class":"bed","score":0.865},
    {"class":"furniture","score":0.916},
    {"class":"daybed","score":0.53, "type_hierarchy":"/furniture/seat/sofa/daybed"},
    {"class":"sofa","score":0.538},
    {"class":"seat","score":0.549},
    {"class":"gray color","score":0.896},
    {"class":"sage green color","score":0.811}
]}
```
The free verson for Watson Visual Recognition API  has a **250** daily limit of API calls.

*5 of the calls failed so 245 data pieces was used. For a better result use all the 5000 data pieces*

Then was added to the JSON user data.
Multiple JSON files as outputs.

##### Unify User Data & Unify All User Data
Regroup data, 1 JSON file as output

##### Categories Ocurrencies
From the "type_hierarchy" property was obtained the Category Hierarchy.

Only was considered the Primary, Secondary and Tertiary hierarchies.

Example:
```json
type_hierarchy:"/furniture/seat/sofa/daybed"
```
Where:
- furniture --> Primary
- seat --> Secondary
- sofa --> Tertiary
- daybed --> Ignored

Then all the Ocurrencies of each Category on each Hierarchy was counted. And the ones with more Ocurrencies will be used.

*The amount of Categories will depend on the size of the data*

The Thresholds used to know which Categories will be used was:
- Primary >= 10 Ocurrencies
- Secondary >= 5 Ocurrencies
- Tertiary >= 4 Ocurrencies

##### Generate Train Data
Prepare CSV file
```javascript
[Followers, timestamp, H1, H2, H3, likes]
//84 Input 1 Output

//Depending on the user, for example beautifuldestinations has 8.7m followers
var Followers = 870000000;

//Elapsed time, when was published and the date that the amount of likes was counted
var timestamp = updated - date;  //time in seconds

//   Primary     Secondary   Tertiary    hierarchies, dynamic size
var H1 = [...], H2 = [...], H3 = [...];
```