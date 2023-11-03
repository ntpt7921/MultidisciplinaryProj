const mqtt = require("mqtt")
const db_connect = require('./DBconnection');
const fs = require('fs');

var room_list = {};

db_connect.connect(function(err){
    if (!err)
    {
            var query = "select house_id from house where 1";
            db_connect.query(query, function(err, res){
                res.forEach(element => {
                    var current_house_rooms = []
                    query = `select room_id from room where house_id=${element['house_id']}`;
                    //console.log(query);
                    db_connect.query(query, function(err, result){
                        result.forEach(ele => {
                            current_house_rooms.push(ele['room_id']);
                        })
                   })
                   room_list[element['house_id']] = current_house_rooms;
                });
                db_connect.end();
            });
    }
});

const timer = ms => new Promise( res => setTimeout(res, ms));
timer(1000).then(_=>{
    var topics = [];
    var dir = '../image/';
    for(house_id in room_list)
    {
        var house_dir = dir + `house_${house_id}/`;
        if (!fs.existsSync(house_dir)){
            fs.mkdirSync(house_dir);
        }
        for (i = 0; i < room_list[house_id].length; i++)
        {
            var room_dir = house_dir + `room_${room_list[house_id][i]}`;
            if (!fs.existsSync(room_dir)){
                fs.mkdirSync(room_dir);
            }
            topics.push(`house_${house_id}_room_${room_list[house_id][i]}`)
        }
    }

    const client = mqtt.connect('mqtt://13.54.202.88');
    client.on('connect', function () {
        for(i = 0 ; i < topics.length ; i++)
        {
            client.subscribe('image_'+topics[i]);
        }
    })

    // Receive messages
    client.on('message', (topic, image)=> {
        house_room_id = topic.split('_');
        house = house_room_id[2];
        room = house_room_id[4];
        //process image
        binary = convert(image);
        fs.writeFile(`/var/www/image/house_${house}/room_${room}/result.png`, binary, 'binary', error => {
            if(error){
                console.log(error);
            }
        });
    });

    function convert( buffer ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return binary;
    }
    
    function getImage()
    {
        for(i = 0 ; i < topics.length ; i++)
        {
            client.publish(topics[i], 'get');
        }
    }

    setInterval(getImage, 1000);
});




