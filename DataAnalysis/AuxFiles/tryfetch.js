var fs = require('fs');
var fetch = require('node-fetch');

var api_key = "API-KEY";
var your_classifier = "default";
var threshold="0.2";
var urlClassify_p1 = "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key="+api_key+"&url=";
var urlClassify_p2 = "&classifier_ids="+your_classifier+"&threshold="+threshold+"&version=2016-05-20";

var image_1 = "https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/17439220_433739233638447_307425121868447744_n.jpg";


fetch(urlClassify_p1+image_1+urlClassify_p2).then(function(response) {
    return response.json();
}).then(function(returnedValue) {
        
        fs.writeFile('response_try_fetch.json', JSON.stringify(returnedValue.images[0].classifiers[0].classes), function (err) {
            if (err) return console.log(err);
            console.log('response_try_fetch.json'); 
        });

}).catch(function(err) {
	console.log(err);// Error :(
});
