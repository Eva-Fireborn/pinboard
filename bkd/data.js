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
  // this is a condition for the connection to db, if it's conneted, return existing one and don't make a second connection
  makeConnection(){
    if(!this.connection) {
      this.connection = this.client.connect()
    }
    this.connection.catch(error => {
      console.log('failed to connect', error)
    })
    return this.connection
  }

  connectToUserCollection(callback) {
    console.log('connectToUserCollection');
    // connect and fetch the collection for further usage
    if (this.userCollection) return callback(this.userCollection)
    this.makeConnection().then(() => {
      console.log('we connected to the collection')
      this.userCollection = this.client.db("Pinboard").collection("Users")
      callback(this.userCollection)
    })
    .catch(error => {
      //separate then and catch error handler
      console.log('failed to connect to user collection', error)
    })
    console.log('connecting to uri', this.uri)
  }

  createUser (user, callback) {
    // callback from the developer code, from calling these functions
    this.connectToUserCollection(collection => {
      console.log('createUser, connectToUserCollection. user: ', user)
      collection.findOne({email: user.email}).then(result => {
        console.log('createUser. connectToUserCollection, result=', result)
        if( result === null){
          // here you get a collection that was sent from fun connectToUserCollection
          collection.insertOne(user, (error, result) => {
            if( error ) throw error
              //this function returns the result as a callback to the other developer
            callback(result.insertedId)
            console.log(user)
          })
        } else {
          console.log('user already exist')
          callback(result._id)
        }
      })
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

    this.makeConnection().then(() => {
      console.log('we connected to the ad collection')
      this.adCollection = this.client.db("Pinboard").collection("Ads")
      callback(this.adCollection)
    })
    .catch(error => {
      console.log('failed to connect to ads collection', error)
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

  // repeat functions for another collection

  connectToMessagesCollection(callback) {
    if (this.msgCollection) return callback(this.msgCollection)

    this.makeConnection().then(() => {
      console.log('we connected to the msg collection')
      this.msgCollection = this.client.db("Pinboard").collection("Messages")
      callback(this.msgCollection)
    })
    .catch(error => {
      console.log('failed to connect to msg collection', error)
    })
    console.log('connecting to uri', this.uri)
  }

  createMsg (msg, callback) {
    this.connectToMessagesCollection(collection => {
      collection.insertOne(msg, (error, result) => {
        if( error ) throw error
        callback(result.insertedId)
      })
    })
  }

  getMsg (msg, callback) {
    this.connectToMessagesCollection(collection => {
      collection.findOne(msg, (error, result) => {
        if( error ) throw error
        callback(result)
      })
    })
  }

// functions for review collection

  connectToReviewCollection(callback) {
    if (this.reviewCollection) return callback(this.reviewCollection)

    this.makeConnection().then(() => {
      console.log('we connected to the review collection')
      this.reviewCollection = this.client.db("Pinboard").collection("Reviews")
      callback(this.reviewCollection)
    })
    .catch(error => {
      console.log('failed to connect to reviews collection', error)
    })
    console.log('connecting to uri', this.uri)
  }

  createReview(review, callback) {
    this.connectToReviewCollection(collection => {
      collection.insertOne(review, (error, result) => {
        if( error ) throw error
        callback(result.insertedId)
      })
    })
  }

  getReview (review, callback) {
    this.connectToReviewCollection(collection => {
      collection.findOne(review, (error, result) => {
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
