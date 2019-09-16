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

  connectToUserCollection(callback) {
    console.log('connectToUserCollection');
    // connect and fetch the collection for further usage
    if (this.userCollection) return callback(this.userCollection)

    this.client.connect(error => {
      console.log('connectToUserCollection. client connected? error: ', error);
      if( error ) throw error;
      console.log('connectToUserCollection. we connected to the collection. Error: ', error)
      this.userCollection = this.client.db("Pinboard").collection("Users")
      callback(this.userCollection)
    })
    console.log('connectToUserCollection. connecting to uri', this.uri)
  }

  createUser (user, callback) {
    // callback from the developer code, from calling these functions
    this.connectToUserCollection(collection => {
      console.log('createUser, connectToUserCollection. user: ', user)
      collection.find({email: user.email}).count().then(result => {
        console.log('createUser. connectToUserCollection, result=', result);
        if( result === 0){
          console.log('createUser. no user')
          // here you get a collection that was sent from fun connectToUserCollection
          collection.insertOne(user, (error, result) => {
            if( error ) throw error
            console.log('createUser. insertOne success');
            //this function returns the result as a callback to the other developer
            callback(result.insertedId)
            console.log(user)
          })
        } else {
          console.log('user already exist')
          callback(null)
        }
      });
    })
  }



  getUser (user, callback) {
    this.connectToUserCollection(collection => {
      collection.findOne(user, (error, result) => {
        if( error ) throw error
        callback(result)
      })
    })
  }

  updateUser (user, callback) {
    this.connectToUserCollection( collection => {
      collection.updateOne({_id: user.id}, {$set: user}, null, (error, result) => {
        if( error ) throw error
        callback(true)
      })
    })
  }

  deleteUser (id, callback) {
    this.connectToUserCollection(collection => {
      collection.deleteOne({_id: id}, null, (error, result) => {
        if( error ) throw error
        // this.client.close()
        callback(result)
      })
    })
  }

  // repeat functions for another collection

  connectToAdCollection(callback) {
    if (this.adCollection) return callback(this.adCollection)

    this.client.connect(error => {
      if( error ) throw error;
      console.log('we connected to the collection', error)
      this.adCollection = this.client.db("Pinboard").collection("Ads")
      callback(this.adCollection)
    })
    console.log('connecting to uri', this.uri)
  }
  createAd (ad, callback) {
    this.connectToAdCollection(collection => {
      collection.insertOne(ad, (error, result) => {
        if( error ) throw error
        callback(result.insertedId)
      })
    })

  }

  getAd (ad, callback) {
    this.connectToAdCollection(collection => {
      collection.findOne(ad, (error, result) => {
        if( error ) throw error
        callback(result)
      })
    })

  }

  updateAd (ad, callback) {
    this.connectToAdCollection( collection => {
      collection.updateOne({_id: ad.id}, {$set: ad}, null, (error, result) => {
        if( error ) throw error
        callback(true)
      })
    })
  }

  deleteAd (id, callback) {
    this.connectToAdCollection(collection => {
      collection.deleteOne({_id: id}, null, (error, result) => {
        if( error ) throw error
        callback(result)
      })
    })
  }

  disconnect(callback) {
    this.client.close(callback)
  }
}

module.exports = API
