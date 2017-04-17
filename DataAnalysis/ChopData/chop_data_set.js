var fs = require('fs');fs = require("fs");

var data_set_full;

fs.readFile('dataset.json', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
        data_set_full = JSON.parse(data);
        
        fs.writeFile('dataset_user1.json', JSON.stringify(data_set_full[0]), function (err) {
            if (err) return console.log(err);
            console.log('User 1 > dataset_user1.json'); 
        });
        fs.writeFile('dataset_user2.json', JSON.stringify(data_set_full[1]), function (err) {
            if (err) return console.log(err);
            console.log('User 2 > dataset_user2.json');
        });
        fs.writeFile('dataset_user3.json', JSON.stringify(data_set_full[2]), function (err) {
            if (err) return console.log(err);
            console.log('User 3 > dataset_user3.json');
        });
        fs.writeFile('dataset_user4.json', JSON.stringify(data_set_full[3]), function (err) {
            if (err) return console.log(err);
            console.log('User 4 > dataset_user4.json');
        });
        fs.writeFile('dataset_user5.json', JSON.stringify(data_set_full[4]), function (err) {
            if (err) return console.log(err);
            console.log('User 5 > dataset_user5.json');
        });
    }
});

        