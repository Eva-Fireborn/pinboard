// connect to mongodb cloud
const MongoClient = require('mongodb').MongoClient
//const uri = "mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority"
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
class API {
  //the same as mongo client, its a class
  constructor(uri) {
    // save uri to itself on this instance for later
    this.uri = uri
    // to connect once for all the further functions
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  }

  makeUserCollection(callback) {
    // connect and fetch the collection for further usage
    this.client.connect(error => {
      if( error ) throw error;
      console.log('we connected to the collection', error)
      const collection = this.client.db("Pinboard").collection("Users")
      callback(collection)
    })
    console.log('connecting to uri', this.uri)
  }
  //callback hell
  createUser (user, callback) {
    // callback from the developer code, from calling these functions
    this.makeUserCollection(collection => {
      // here you get a coll that was sent from fun makeUserCollection
        collection.insertOne(user, (error, result) => {
        if( error ) throw error
        //this function returns the result as a callback to the other developer
        callback(result.insertedId)
        this.client.close()
      })
    })

  }
}

module.exports = API

// client.connect(err => {
//   const collection = client.db("Pinboard").collection("Users")
//   // perform actions on the co llection object
//
//   function get(sendBack) {
//   	// connect to the database
//   	MongoClient.connect(uri, (error, client) => {
//   		if( error ) {
//   			throw error;
//   		}
//   		// run a query
//   		let collection = client.db('Pinboard').collection('Users');
//
//   		collection.find({}).toArray((error, result) => {
//   			if(error) throw error;
//
//   			// send the result back
//   			sendBack(result);
//   			client.close();
//   		});
//
//   	})
//   }
//
//   function post(user, sendBack) {
//
//   	MongoClient.connect(uri, (error, client) => {
//   		if( error ) {
//   			throw error;
//   		}
//
//   		let collection = client.db('Pinboard').collection('Users');
//
//   		collection.insertOne(user, (error, result) => {
//   			if( error ) throw error;
//   			sendBack(result);
//   			client.close();
//   		})
//   	})
//   }
//
//   function remove (user, sendBack) {
//
//   	MongoClient.connect(uri, (error, client) => {
//   		if( error ) {
//   			throw error;
//   		}
//
//   		let collection = client.db('Pinboard').collection('Users');
//
//   		collection.deleteOne(user, (error, result) => {
//   			if( error ) throw error;
//   			sendBack(result);
//   			client.close();
//   		})
//   	})
//   }



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
