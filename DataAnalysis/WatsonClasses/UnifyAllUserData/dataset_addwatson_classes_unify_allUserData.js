var fs = require('fs');

var data_set_full = [];

var contentsToFix = fs.readFileSync('dataset_user1_watsonClasses_partial.json').toString();
contentsToFix = JSON.parse(contentsToFix);
data_set_full = data_set_full.concat(contentsToFix);

contentsToFix = fs.readFileSync('dataset_user2_watsonClasses_partial.json').toString();
contentsToFix = JSON.parse(contentsToFix);
data_set_full = data_set_full.concat(contentsToFix);

contentsToFix = fs.readFileSync('dataset_user3_watsonClasses_partial.json').toString();
contentsToFix = JSON.parse(contentsToFix);
data_set_full = data_set_full.concat(contentsToFix);

contentsToFix = fs.readFileSync('dataset_user4_watsonClasses_partial.json').toString();
contentsToFix = JSON.parse(contentsToFix);
data_set_full = data_set_full.concat(contentsToFix);

contentsToFix = fs.readFileSync('dataset_user5_watsonClasses_partial.json').toString();
contentsToFix = JSON.parse(contentsToFix);
data_set_full = data_set_full.concat(contentsToFix);




fs.writeFile('dataset_allUsers_watsonClasses_partial.json', JSON.stringify(data_set_full), function (err) {
    if (err) return console.log(err);
    console.log('all user > dataset_allUsers_watsonClasses_partial.json');
});