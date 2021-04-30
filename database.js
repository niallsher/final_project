
var http = require('http');
var fs = require('fs');
var qs = require('querystring');


const { MongoClient } = require('mongodb');

const url = "mongodb+srv://niallsheridan:ryder56nbs@cluster0.ytcqd.mongodb.net/calendars?retryWrites=true&w=majority";

const mongo = new MongoClient(url, {useUnifiedTopology: true });

function main()
{
	httpServer = http.createServer(function (req, res) {
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
	}).listen(8080);

}


async function parseNew(pdata, res)
{
		pdata = qs.parse(pdata);

		firstname = pdata['fname'];
		holidayName = pdata['holidayName'];
		datestr = pdata['year'] + "-" + pdata['month'] + "-" + pdata['day'];
		date = datestr;
		theQuery = {firstname, holidayName, date};

		console.log(pdata);
		console.log("fname: " + firstname);
		console.log("hname: " + holidayName);
		console.log("date: " + date);
		console.log("query: " + JSON.stringify(theQuery));





	
		await mongo.connect();

		var data = await mongo.db("calendars");
		var collection = await data.collection("events");


    	await collection.insertOne(theQuery);
		
		res.end();
		mongo.close();
}


// function create(req, res)
// {
// 	if(req.url == "/")
// 	{
// 		file = 'createnewHoliday.html'; //this file name might need to be changed just the one i created
// 		fs.readFile(file, function(err, txt) {
// 			res.writeHead(200, {'Content-Type': 'text/html'});
// 			res.write(txt);
// 			res.end();
// 		});
// 	}
// 	else if (req.url == "/process")
// 	{
// 		res.writeHead(200, {'Content-Type': 'text/html'});
// 		res.write("Selected data:<br>");
// 		pdata = "";
// 		req.on('data', data => {
// 			pdata += data.toString();
// 		});

// 		req.on('end', ()=> {
// 			parseNew(pdata, res);
// 		});

// 		req.on('close', function(err) {console.log("Here")});
// 	} else {
// 		res.writeHead(200, {'Content-Type': 'text/html'});
// 		res.write("Unknown page request");
// 		res.end();
// 	}
// }



main();

