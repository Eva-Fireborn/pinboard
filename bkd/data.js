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
    if (this.userCollection) return callback(this.userCollection)

    this.client.connect(error => {
      if( error ) throw error;
      console.log('we connected to the collection', error)
      this.userCollection = this.client.db("Pinboard").collection("Users")
      callback(this.userCollection)
    })
    console.log('connecting to uri', this.uri)
  }
  //callback hell
  createUser (user, callback) {
    // callback from the developer code, from calling these functions
    this.makeUserCollection(collection => {
      // here you get a collection that was sent from fun makeUserCollection
        collection.insertOne(user, (error, result) => {
        if( error ) throw error
        //this function returns the result as a callback to the other developer
        callback(result.insertedId)
      })
    })

  }

  getUser (user, callback) {
    this.makeUserCollection(collection => {
      collection.findOne(user, (error, result) => {
        if( error ) throw error
        callback(result)
      })
    })

  }

  updateUser (user, callback) {
    this.makeUserCollection( collection => {
      collection.updateOne({_id: user.id}, {$set: user}, null, (error, result) => {
        if( error ) throw error
        callback(true)
      })
    })
  }

  deleteUser (id, callback) {
    this.makeUserCollection(collection => {
      collection.deleteOne({_id: id}, null, (error, result) => {
        if( error ) throw error
        // this.client.close()
        callback(result)
      })
    })
  }

  disconnect(callback) {
    this.client.close(callback)
  }
}

module.exports = API
