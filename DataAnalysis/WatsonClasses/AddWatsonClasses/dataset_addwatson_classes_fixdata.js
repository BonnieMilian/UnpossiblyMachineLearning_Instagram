var fs = require('fs');

var data_set_full = [];

var contentsToFix = fs.readFileSync('dataset_user2_watsonClasses_0-10_bk.json').toString();
//console.log(JSON.parse(contentsToFix));
contentsToFix = JSON.parse(contentsToFix);

var dataSet = fs.readFileSync('dataset_user2_purged.json').toString();
dataSet = JSON.parse(dataSet);

for(let posts = 0; posts < dataSet.length; posts++){
    try {
        dataSet[posts].watsonClasses = contentsToFix[posts].images[0].classifiers[0].classes;
        data_set_full.push(dataSet[posts]);
    } catch(e) { ; }
}

console.log(data_set_full);
fs.writeFile('dataset_user2_watsonClasses_0-10.json', JSON.stringify(data_set_full), function (err) {
    if (err) return console.log(err);
    console.log('user2 > dataset_user2_watsonClasses.json');
});