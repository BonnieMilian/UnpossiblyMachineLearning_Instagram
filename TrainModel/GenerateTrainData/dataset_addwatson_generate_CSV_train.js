var fs = require('fs');

//var data_set_full = ["1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42"];
var data_set_full = [];

const hierarchy_primary = JSON.parse(fs.readFileSync('dataset_watsonClasses_Reduced_primary.json').toString());
const hierarchy_secondary = JSON.parse(fs.readFileSync('dataset_watsonClasses_Reduced_secondary.json').toString());
const hierarchy_tertiary = JSON.parse(fs.readFileSync('dataset_watsonClasses_Reduced_tertiary.json').toString());

var searchWatsontype = function(watsonClasses, category){
    for (let watsontype of watsonClasses) {
        if(watsontype["class"] === category) {
            return watsontype.score;
        }
    }
    return 0;
}

var generateUserData = function(instagramUser, followers){
    for (let post of instagramUser) {
        let primary = "";
        for(let category of hierarchy_primary){
            primary = primary + "" + searchWatsontype(post.watsonClasses, category) + ",";
        }
        let secondary = "";
        for(let category of hierarchy_secondary){
            secondary = secondary + "" + searchWatsontype(post.watsonClasses, category) + ",";
        }
        let tertiary = "";
        for(let category of hierarchy_tertiary){
            tertiary = tertiary + "" + searchWatsontype(post.watsonClasses, category) + ",";
        }

        data_set_full.push( followers + "," +
            (post.updated - post.instagram.date) + "," +
            primary + secondary + tertiary + 
            post.instagram.likes.count
        );
    }
}

var beautifuldestinations = fs.readFileSync('dataset_user_watsonClasses_beautifuldestinations.json').toString();
beautifuldestinations = JSON.parse(beautifuldestinations);
const beautifuldestinations_followers = 8700000;

generateUserData(beautifuldestinations, beautifuldestinations_followers);
beautifuldestinations = undefined;



var etdieucrea = fs.readFileSync('dataset_user_watsonClasses_etdieucrea.json').toString();
etdieucrea = JSON.parse(etdieucrea);
const etdieucrea_followers = 100000;

generateUserData(etdieucrea, etdieucrea_followers);
etdieucrea = undefined;


var instagood = fs.readFileSync('dataset_user_watsonClasses_instagood.json').toString();
instagood = JSON.parse(instagood);
const instagood_followers = 867000;

generateUserData(instagood, instagood_followers);
instagood = undefined;


var josecabaco = fs.readFileSync('dataset_user_watsonClasses_josecabaco.json').toString();
josecabaco = JSON.parse(josecabaco);
const josecabaco_followers = 48800;

generateUserData(josecabaco, josecabaco_followers);
josecabaco = undefined;


var kissinfashion = fs.readFileSync('dataset_user_watsonClasses_kissinfashion.json').toString();
kissinfashion = JSON.parse(kissinfashion);
const kissinfashion_followers = 2400000;

generateUserData(kissinfashion, kissinfashion_followers);
kissinfashion = undefined;

console.log(data_set_full);

var csvContent = data_set_full.join("\n");

fs.writeFile('dataset_users_watsonClass_train.csv', csvContent, function (err) {
    if (err) return console.log(err);
    console.log('all users > dataset_users_watsonClass_train.json');
});