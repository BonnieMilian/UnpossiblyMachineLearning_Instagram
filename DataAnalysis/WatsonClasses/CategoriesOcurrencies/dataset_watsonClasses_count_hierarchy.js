var fs = require('fs');

var data_set_full = [];

var data_set_full = fs.readFileSync('dataset_allUsers_watsonClasses_partial.json').toString();
data_set_full = JSON.parse(data_set_full);

//console.log(data_set_full[0]);

var hierarchy = {
    primary: [],
    secondary: [],
    tertiary: []
};

let watsonClass = {type: "", ocurrency: 0};


for (let post of data_set_full) {
  //console.log(post);
  for (let watsonClass of post.watsonClasses) {
      if(watsonClass.type_hierarchy != undefined){
            let hierarchies = watsonClass.type_hierarchy.split("/");
            
            if(hierarchies[1] != undefined) {
                for(let ocurrencies = 0 ; ocurrencies < hierarchy.primary.length ; ocurrencies++) {
                    if(hierarchy.primary[ocurrencies].type === hierarchies[1]) {
                        hierarchy.primary[ocurrencies].ocurrency++;
                        break;
                    } else {
                        if(ocurrencies == hierarchy.primary.length - 1)
                            hierarchy.primary.push({type: hierarchies[1], ocurrency: 1});
                    }
                }
                if(hierarchy.primary.length == 0)
                  hierarchy.primary.push({type: hierarchies[1], ocurrency: 1});
            }
            if(hierarchies[2] != undefined) {
                for(let ocurrencies = 0 ; ocurrencies < hierarchy.secondary.length ; ocurrencies++) {
                    if(hierarchy.secondary[ocurrencies].type === hierarchies[2]) {
                        hierarchy.secondary[ocurrencies].ocurrency++;
                        break;
                    } else {
                        if(ocurrencies == hierarchy.secondary.length - 1)
                            hierarchy.secondary.push({type: hierarchies[2], ocurrency: 1});
                    }
                }
                if(hierarchy.secondary.length == 0)
                  hierarchy.secondary.push({type: hierarchies[2], ocurrency: 1});
            }
            if(hierarchies[3] != undefined) {
                for(let ocurrencies = 0 ; ocurrencies < hierarchy.tertiary.length ; ocurrencies++) {
                    if(hierarchy.tertiary[ocurrencies].type === hierarchies[3]) {
                        hierarchy.tertiary[ocurrencies].ocurrency++;
                        break;
                    } else {
                        if(ocurrencies == hierarchy.tertiary.length - 1)
                            hierarchy.tertiary.push({type: hierarchies[3], ocurrency: 1});
                    }
                }
                if(hierarchy.tertiary.length == 0)
                  hierarchy.tertiary.push({type: hierarchies[3], ocurrency: 1});
            }
        }
    }
}

console.log(hierarchy);
console.log("Primary: " + hierarchy.primary.length);
console.log("Secondary: " + hierarchy.secondary.length);
console.log("Tertiary: " + hierarchy.tertiary.length);


fs.writeFile('dataset_watsonClasses_ocurrencies.json', JSON.stringify(hierarchy), function (err) {
    if (err) return console.log(err);
    console.log('all user > dataset_watsonClasses_ocurrencies.json');
});