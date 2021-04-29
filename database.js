
var http = require('http');
var fs = require('fs');
var qs = require('querystring');


const { MongoClient } = require('mongodb');

const url = "mongodb+srv://niallsheridan:ryder56nbs@cluster0.ytcqd.mongodb.net/calendars?retryWrites=true&w=majority";

const mongo = new MongoClient(url, {useUnifiedTopology: true });

function main()
{
	httpServer = http.createServer(function (req, res) {
		create(req, res);
	}).listen(8080);

}


async function parseNew(pdata, res)
{
		pdata = qs.parse(pdata);

		theQuery = {holidayname:pdata['holidayName']};
		theQuery2 = {date:pdata['date']};
		theQuery3 = {type:pdata['type']}
	
		await mongo.connect();

		var data = await mongo.db("calendars");
		var collection = await data.collection("events");


		result = await collection.find(theQuery);
	
		result.toArray(function(err, items) {

			if (err) {
				console.log("Error: " + err);
			} else {

				for(i = 0; i < items.length; i++) {
					console.log(i + ": " + items[i].date);
					res.write(items[i].holidayname + ", " + items[i].date + ", " + items[i].type "<br/>");
				}
			}
		});

		result2 = await collection.find(theQuery2);
		result2.toArray(function(err, items) {

			if (err) {
				console.log("Error: " + err);
			} else {

				for(i = 0; i < items.length; i++) {
					console.log(i + ": " + items[i].holidayname);
					res.write(items[i].holidayname + ", " + items[i].date + ", " + items[i].type "<br/>");
				}
			}
		});

		result3 = await collection.find(theQuery3);
		result3.toArray(function(err, items) {

			if (err) {
				console.log("Error: " + err);
			} else {

				for(i = 0; i < items.length; i++) {
					console.log(i + ": " + items[i].type);
					res.write(items[i].holidayname + ", " + items[i].date + ", " + items[i].type "<br/>");
				}
			}
			 res.end();
		});
}


function create(req, res)
{
	if(req.url == "/")
	{
		file = 'createnewHoliday.html'; //this file name might need to be changed just the one i created
		fs.readFile(file, function(err, txt) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(txt);
			res.end();
		});
	}
	else if (req.url == "/process")
	{
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write("Selected data:<br>");
		pdata = "";
		req.on('data', data => {
			pdata += data.toString();
		});

		req.on('end', ()=> {
			parseNew(pdata, res);
		});

		req.on('close', function(err) {console.log("Here")});
	} else {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write("Unknown page request");
		res.end();
	}
}



main();

