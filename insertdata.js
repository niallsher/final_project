var fs = require('fs');

const { MongoClient } = require('mongodb');
const url = 
"mongodb+srv://niallsheridan:ryder56nbs@cluster0.ytcqd.mongodb.net/calendars?retryWrites=true&w=majority";

const client = new MongoClient(url, { useUnifiedTopology: true });

async function read(err, data)
{
	if (err) throw err;
	
	// var arr = data.split("\r\n");
	var the_data = [];
	
	// for (var i = 1; i < arr.length - 1; i++) {
		var doc_arr = arr[i].split(",");
		var newData = {"name":doc_arr[0], "date":doc_arr[1], "type":doc_arr[2]};
		console.log(newData);
		the_data.push(newData);
	// }

	try {
		await client.connect();
		  
		var dbo = client.db("calendars");
		var collection = dbo.collection('events');

		console.log("Insert...");

		await collection.insertOne(the_data);
	} finally {
		await client.close();
	}
	console.log("Success");
}
function run()
{
	fs.readFile(fileName, "utf-8", function(err, data) {
		
		read(err, data);
	});
}

run();



