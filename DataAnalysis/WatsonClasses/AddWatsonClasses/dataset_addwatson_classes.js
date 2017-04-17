var fs = require('fs');
var fetch = require('node-fetch');

var api_key = "API-KEY";
//var api_key = "API-KEY2";
var your_classifier = "default";
var threshold = "0.0";
var urlClassify_p1 = "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=" + api_key + "&url=";
var urlClassify_p2 = "&classifier_ids=" + your_classifier + "&threshold=" + threshold + "&version=2016-05-20";


var data_set_full;
var dataPurged = [];
var watsonAnswers = [];

fs.readFile('dataset_user5_purged.json', function readFileCallback(err, data) {
    if (err) {
        console.log(err);
    } else {
        data_set_full = JSON.parse(data);
        data_set_full = data_set_full.slice(0, 10);
        

        var promises = data_set_full.map(
            postpeace => fetch(urlClassify_p1 + postpeace.instagram.display_src + urlClassify_p2)
            .then(y => y.json()) );
            
        Promise.all(promises).then(watsonAnswer => {
            console.log(watsonAnswer);

            fs.writeFile('dataset_user5_watsonClasses_0-10_bk.json', JSON.stringify(watsonAnswer), function (err) {
                if (err) return console.log(err);
                console.log('user5 > dataset_user5_watsonClasses.json');
            });

            for(let posts = 0; posts < data_set_full.length; posts++){
                data_set_full[posts].watsonClasses = watsonAnswer[posts].images[0].classifiers[0].classes;
            }

            fs.writeFile('dataset_user5_watsonClasses_0-10.json', JSON.stringify(data_set_full), function (err) {
                if (err) return console.log(err);
                console.log('user5 > dataset_user5_watsonClasses.json');
            });
        //postpeace.watson = data.images[0].classifiers[0].classes;
        }).catch(e => { console.log("Fail communication with Watson\n"+ e); });
        
    }
});

