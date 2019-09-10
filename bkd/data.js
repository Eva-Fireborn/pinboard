// connect to mongodb cloud
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
client.connect(err => {
  const collection = client.db("Pinboard").collection("Users")
  // perform actions on the collection object

  function get(sendBack) {
  	// connect to the database
  	MongoClient.connect(uri, (error, client) => {
  		if( error ) {
  			throw error;
  		}
  		// run a query
  		let collection = client.db('Pinboard').collection('Users');

  		collection.find({}).toArray((error, result) => {
  			if(error) throw error;

  			// send the result back
  			sendBack(result);
  			client.close();
  		});

  	})
  }

  function post(user, sendBack) {

  	MongoClient.connect(uri, (error, client) => {
  		if( error ) {
  			throw error;
  		}

  		let collection = client.db('Pinboard').collection('Users');

  		collection.insertOne(user, (error, result) => {
  			if( error ) throw error;
  			sendBack(result);
  			client.close();
  		})
  	})
  }

  function delete(user, sendBack) {

  	MongoClient.connect(uri, (error, client) => {
  		if( error ) {
  			throw error;
  		}

  		let collection = client.db('Pinboard').collection('Users');

  		collection.deleteOne(user, (error, result) => {
  			if( error ) throw error;
  			sendBack(result);
  			client.close();
  		})
  	})
  }

  module.exports = { get, post, delete }

//   let newDoc = {
//     user: "user2",
//     city: "Malmo"
//   }
//
//   collection.insertOne(newDoc, (error, result) => {
//     if (error) {
//       console.error("something went wrong", error)
//       throw error
//     }
//   console.log("got some docs")
//   })
//   client.close()
// })
