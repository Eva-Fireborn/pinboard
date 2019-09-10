const test = require('tape')
const API = require('./data')

test('timing test', t =>  {
  // how many tests
    t.plan(6)
    // add url so all functions will work directly
    const api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority")
    t.ok(api, 'api exists')
    const user = {
      name: "paul",
      city: "lund"
    }
    t.equal(typeof api.createUser, 'function', 'create user should be a function')

    api.createUser(user, userID => { // userId is a result from createUser function, it's a callback
      t.ok(userID, 'user id should have been returned')
      console.log('user id of inserted user:', userID)
      api.getUser(userID, paul => {
        // paul is an instruction for what to do after you did something
        t.ok(paul, 'paul returned')
        t.equal(paul.city, 'lund', 'paul is still in lund')
        t.notEqual(paul.name, 'anna', 'paul is not anna')

      })


    })

})
