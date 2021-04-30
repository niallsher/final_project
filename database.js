
var http = require('http'); //require needed modules
var fs = require('fs');
var qs = require('querystring');
const mongo = require('mongodb').MongoClient;

const url = 
"mongodb+srv://niallsheridan:ryder56nbs@cluster0.ytcqd.mongodb.net/calendars?retryWrites=true&w=majority";

user="test";
fName = "test";
holidayName="test";
day = 0;
month = 0;
year = 0000;
type = "none";

mongo.connect(url, { useUnifiedTopology: true }, function(err, db) { //access mongo
    if(err) { return console.log(err); } //check error
    var dbo = db.db("calendars"); //specify what data will be accessed
    var coll = dbo.collection('events');
     var newData = {"user":user, "fName":fName, "holidayName":holidayName, "day":day, "month":month, "type": type};
    collection.insertOne(newData);
})

main();
