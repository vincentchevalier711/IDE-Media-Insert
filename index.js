const NodeID3 = require('node-id3');
const mime = require('mime-types')
const fs = require('file-system');

var folder = './musics';
var image = false;
var counter = 0;



process.argv.forEach( (element,index) => {
    switch(element){
        case '-F':
            folder = process.argv[index+1];
    }
});

fs.recurseSync(folder, ['*.jpg', '*.png'], function(filepath, relative, filename) {
    data = fs.readFileSync(filepath);
    if(data){
        image = {
            mime: mime.lookup(filepath),
            type: {
                'id' : 1,
                'name' : 'Front Cover'
            },
            description : 'Front cover',
            imageBuffer: data
        }
    }
});
if(image){
    fs.recurseSync(folder, ['*.mp3'], function(filepath, relative, filename) {
        var tags = NodeID3.read(filepath);
        if(!tags.image){
            tags.image = image;
            NodeID3.update(tags, filepath, function(err, buffer) {  });
            console.log(tags.title);
        }
        
    });
} 

//console.log(folder);