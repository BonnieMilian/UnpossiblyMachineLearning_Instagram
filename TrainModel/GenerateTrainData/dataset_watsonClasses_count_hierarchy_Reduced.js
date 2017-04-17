var fs = require('fs');

var data_set_full = [];

var data_set_full = fs.readFileSync('dataset_watsonClasses_ocurrencies.json').toString();
data_set_full = JSON.parse(data_set_full);

var hierarchyReduced = {
    primary: [],
    secondary: [],
    tertiary: []
};



hierarchyReduced.primary = data_set_full.primary.reduce(function(newArray, watsonClass){
    if(watsonClass.ocurrency >= 10)
        newArray.push(watsonClass);
    return newArray;
}, []);

hierarchyReduced.secondary = data_set_full.secondary.reduce(function(newArray, watsonClass){
    if(watsonClass.ocurrency >= 5)
        newArray.push(watsonClass);
    return newArray;
}, []);

hierarchyReduced.tertiary = data_set_full.tertiary.reduce(function(newArray, watsonClass){
    if(watsonClass.ocurrency >= 3)
        newArray.push(watsonClass);
    return newArray;
}, []);

console.log(hierarchyReduced);
console.log("Primary: " + hierarchyReduced.primary.length);
console.log("Secondary: " + hierarchyReduced.secondary.length);
console.log("Tertiary: " + hierarchyReduced.tertiary.length);

fs.writeFile('dataset_watsonClasses_ocurrencies_Reduced.json', JSON.stringify(hierarchyReduced), function (err) {
    if (err) return console.log(err);
    console.log('all users > dataset_watsonClasses_ocurrencies_Reduced.json');
});


var primary = [], secondary = [], tertiary = [];
hierarchyReduced.primary.forEach((watsonClass) => {
    primary.push(watsonClass.type);
});
hierarchyReduced.secondary.forEach((watsonClass) => {
    secondary.push(watsonClass.type);
});
hierarchyReduced.tertiary.forEach((watsonClass) => {
    tertiary.push(watsonClass.type);
});
//console.log(primary);

fs.writeFile('dataset_watsonClasses_Reduced_primary.json', JSON.stringify(primary), function (err) {
    if (err) return console.log(err);
    console.log('all users > dataset_watsonClasses_Reduced_primary.json');
});
fs.writeFile('dataset_watsonClasses_Reduced_secondary.json', JSON.stringify(secondary), function (err) {
    if (err) return console.log(err);
    console.log('all users > dataset_watsonClasses_Reduced_secondary.json');
});
fs.writeFile('dataset_watsonClasses_Reduced_tertiary.json', JSON.stringify(tertiary), function (err) {
    if (err) return console.log(err);
    console.log('all users > dataset_watsonClasses_Reduced_tertiary.json');
});