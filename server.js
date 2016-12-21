// console.log('May Node be with you')

const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

// to make those folder accessible to the public
app.use(express.static('public'))
app.use(express.static('css'))


var db

console.log('INFO: ' + 'mongodb://' + process.env.MONGODB_USER + ':' + process.env.MONGODB_PASSWORD + '@ds141328.mlab.com:41328/expmongo-quotes')
MongoClient.connect('mongodb://'+process.env.MONGODB_USER+':'+process.env.MONGODB_PASSWORD+'@ds141328.mlab.com:41328/expmongo-quotes', (err, database) => {
  if (err) return console.log('ERROR: '+err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('INFO: Listening on ' + process.env.PORT)
  })
})


app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/index.html')

  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.

  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})


app.post('/quotes', (req, res) => {
  // console.log('INFO:'+req.body)

  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('INFO: Saved to database')
    res.redirect('/')
  })
})

