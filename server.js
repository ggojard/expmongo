// console.log('May Node be with you')

const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// to make those folder accessible to the public
app.use(express.static('public'))
// app.use(express.static('css'))

// for connecting to the mongoDB
var db
console.log('INFO: ' + 'mongodb://' + process.env.MONGODB_USER + ':' + process.env.MONGODB_PASSWORD + '@ds141328.mlab.com:41328/expmongo-quotes')
MongoClient.connect('mongodb://'+process.env.MONGODB_USER+':'+process.env.MONGODB_PASSWORD+'@ds141328.mlab.com:41328/expmongo-quotes', (err, database) => {
  if (err) return console.log('ERROR: ' + err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('INFO: Listening on ' + process.env.PORT)
  })
})

// for getting all the existing quotes
app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.

  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log('ERROR: ' + err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})


// for saving a new quote
app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log('ERROR: ' + err)
    console.log('INFO:' + JSON.stringify(req.body) +' Saved to database')
    res.redirect('/')
  })
})


// for updating one quote that match the search
app.put('/quotes_replace', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote,
      timestamp: req.body.timestamp,
      status: req.body.status
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

// for updating one quote that match the search
app.put('/quotes_status', (req, res) => {
  console.log("INFO: Update quote status to delete: " + JSON.stringify(req.body));
  // .findOneAndUpdate({name: req.body.name}, {
  // .update({_id: req.body._id}, {
  db.collection('quotes')
  .findOneAndUpdate({_id: req.body._id}, {
    $set: {      
      status: 'archived' //req.body.status
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})