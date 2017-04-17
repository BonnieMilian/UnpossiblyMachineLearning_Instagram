var fs = require('fs');

var data_set_full;
var dataPurged = [];

fs.readFile('dataset_user5.json', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
        data_set_full = JSON.parse(data);
        var justposts = data_set_full.posts;
        var postpeace = {
            updated: 0 , instagram: {
                id: "",
                code: "",
                date: 0,
                display_src: "",
                likes: { count: 0 }
            }};
            console.log(justposts[0].instagram.code);
            console.log(justposts[1].instagram.code);
        var posts = 0;
        for(posts = 0; posts < 1000 ; posts++) {
            postpeace.updated = (justposts[posts]).updated;
            postpeace.instagram.id = (justposts[posts]).instagram.id;
            postpeace.instagram.code = (justposts[posts]).instagram.code;
            postpeace.instagram.date = (justposts[posts]).instagram.date;
            postpeace.instagram.display_src = (justposts[posts]).instagram.display_src;
            postpeace.instagram.likes.count = (justposts[posts]).instagram.likes.count;
            dataPurged.push(postpeace);
            postpeace = {
                updated: 0 , instagram: {
                    id: "",
                    code: "",
                    date: 0,
                    display_src: "",
                    likes: { count: 0 }
                }};
        }
        
        fs.writeFile('dataset_user5_purged.json', JSON.stringify(dataPurged), function (err) {
            if (err) return console.log(err);
            console.log('user5 > dataset_user5_purged.json'); 
        });
    }
});

        