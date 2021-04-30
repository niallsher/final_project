

const { MongoClient } = require('mongodb');

const url = "mongodb+srv://niallsheridan:ryder56nbs@cluster0.ytcqd.mongodb.net/calendars?retryWrites=true&w=majority";

const mongo = new MongoClient(url, {useUnifiedTopology: true });


async function main()
{

	await mongo.connect();

	var data = await mongo.db("calendars");
	var collection = await data.collection("events");

	var theQuery2 = {fname: /^/ };
	await collection.deleteMany(theQuery2);
	// await collection.insertOne(theQuery);

	mongo.close();

}


main();

