var fs = require('fs');

var data_set_full = [];

var contentsToFix = fs.readFileSync('dataset_user5_watsonClasses_0-10.json').toString();
contentsToFix = JSON.parse(contentsToFix);
data_set_full = data_set_full.concat(contentsToFix);

contentsToFix = fs.readFileSync('dataset_user5_watsonClasses_100-110.json').toString();
contentsToFix = JSON.parse(contentsToFix);
data_set_full = data_set_full.concat(contentsToFix);

contentsToFix = fs.readFileSync('dataset_user5_watsonClasses_200-210.json').toString();
contentsToFix = JSON.parse(contentsToFix);
data_set_full = data_set_full.concat(contentsToFix);

contentsToFix = fs.readFileSync('dataset_user5_watsonClasses_300-310.json').toString();
contentsToFix = JSON.parse(contentsToFix);
data_set_full = data_set_full.concat(contentsToFix);

contentsToFix = fs.readFileSync('dataset_user5_watsonClasses_400-410.json').toString();
contentsToFix = JSON.parse(contentsToFix);
data_set_full = data_set_full.concat(contentsToFix);




fs.writeFile('dataset_user5_watsonClasses_partial.json', JSON.stringify(data_set_full), function (err) {
    if (err) return console.log(err);
    console.log('user5 > dataset_user5_watsonClasses_partial.json');
});