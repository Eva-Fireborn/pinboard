// connect to mongodb cloud
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
client.connect(err => {
  const collection = client.db("Pinboard").collection("Users")
  // perform actions on the collection object

  let newDoc = {
    user: "user2",
    city: "Malmo"
  }

  collection.insertOne(newDoc, (error, result) => {
    if (error) {
      console.error("something went wrong", error)
      throw error
    }
  console.log("got some docs")
  })
  client.close();
});
