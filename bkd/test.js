const test = require('tape')
const API = require('./data')

test('test user functions', t =>  {
  // how many tests
    t.plan(8)
    // add url so all functions will work directly
    const api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority")
    t.ok(api, 'api exists')
    const user = {
      name: "paul",
      city: "lund",
      email: "paul@school.com"
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
        paul.city = 'stockholm'
        api.updateUser(paul, success => {
          t.ok(success, 'paul moved to stockholm' )
          // to avoid conflict in the order of events, delete is after update
          api.deleteUser(paul, success => {
            t.ok(success, 'paul got removed')
            // send reference of function and when it's closed it'll call t.end to finish the test
            api.disconnect(t.end)
          })
        })
      })
    })
})

test('test ads functions', t =>  {
  // how many tests
    t.plan(8)
    const api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority")
    t.ok(api, 'api exists')
    const ad = {
      title: "watch my cat",
      city: "goteborg"
    }
    t.equal(typeof api.createAd, 'function', 'createAd should be a function')

    api.createAd(ad, adID => {
      t.ok(adID, 'ads id should have been returned')
      console.log('ad id of inserted ad:', adID)
      api.getAd(adID, catAd => {
        t.ok(catAd, 'watch my cat ad had been returned')
        t.equal(catAd.city, 'goteborg', 'cat is in goteborg')
        t.notEqual(catAd.title, 'walk my dog', 'cats dont really walk outside')
        catAd.title = 'watch 2 cats'
        api.updateAd(catAd, success => {
          t.ok(success, 'cats multiply!' )
          api.deleteAd(ad, success => {
            t.ok(success, 'ad got removed')
            api.disconnect(t.end)
          })
        })
      })
    })
})

test('test message functions', t =>  {
  // how many tests
  t.plan(8)
  const api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority")
  t.ok(api, 'api exists')
  // create user author of the message
  api.createUser({name: 'Maria', city: 'malmo', email: 'maria@work.com'}, mariaId => {
    t.ok(mariaId, 'maria has been created')
    api.createUser({name: 'Bob', city: 'cph', email: 'bob@school.com'}, bobId => {

      t.ok(bobId, 'bob has been created')
      const msg = {
        authorId: mariaId,
        text: "Hey i'm Maria",
        to: bobId,
        timestamp: new Date()
      }

      t.equal(typeof api.createMsg, 'function', 'createMessage should be a function')

      api.createMsg(msg, msgID => {
        t.ok(msgID, 'the message id should have been returned')
        console.log('id of inserted msg:', msgID)
        api.getMsg(msgID, msg => {
          t.ok(msg, 'hey im maria had been returned')
          t.equal(msg.to.toString(), bobId.toString(), 'maria sent a message to bob')
          t.notEqual(msg.text, 'hey im lena', 'maria is not lena')
          api.disconnect(() => {
            console.log('closed successfully')
            t.end()
          })
        })
      })
    })
  })
})

test.only('test review functions', t =>  {
  // how many tests
  t.plan(9)
  const api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority")
  t.ok(api, 'api exists')
  // create user author of the review
  api.createUser({name: 'Luise', city: 'stockholm', email: 'luise@work.com'}, luiseId => {
    t.ok(luiseId, 'Luise has been created')
    api.createUser({name: 'Greg', city: 'cph', email: 'greg@school.com'}, gregId => {
      t.ok(gregId, 'greg has been created')

      const review = {
        authorId: luiseId,
        reviewText: "Greg is an awesome worker",
        to: gregId,
        rating: '5',
        timestamp: new Date()
      }

      t.equal(typeof api.createReview, 'function', 'createReview should be a function')

      api.createReview(review, reviewID => {
        t.ok(reviewID, 'the review id should have been returned')
        console.log('id of inserted review:', reviewID)
        api.getReview(reviewID, review => {
          t.ok(review, 'greg is awesome worker had been returned')
          t.equal(review.to.toString(), gregId.toString(), 'luise left review about greg')
          t.notEqual(review.reviewText, 'greg is horrible', 'greg has to be awesome')
          t.equal (review.rating, '5', 'greg has rating 5')
          api.disconnect(() => {
            console.log('closed successfully')
            t.end()
          })
        })
      })
    })
  })
})
