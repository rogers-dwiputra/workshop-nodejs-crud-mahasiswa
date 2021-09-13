const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

connectionString = 'mongodb+srv://workshop:workshop12345678@cluster0.xbtzm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
MongoClient.connect(connectionString).then(client => {
    console.log('DB Connection Success')
    const db = client.db('mahasiswa')
    const mahasiswacollection = db.collection('mahasiswacollection')

    const app = express()

    // Middleware
    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())
    app.set('view engine', 'ejs')
    app.use(express.static('public'))

    app.listen(3000, function(){
        console.log('Web Server Listening on Port 3000')
    })

    app.get('/', function(req, res){
        // res.send('Hello World')
        const cursor = db.collection('mahasiswacollection').find().toArray().then(results => {
            // console.log(results)
            res.render('index.ejs', {mahasiswa: results})
        })
        // res.sendFile(__dirname + '/index.html')
    })

    app.post('/mahasiswa', function(req, res){
        //Insert Ke Database
        mahasiswacollection.insertOne(req.body).then(result => {
            // console.log(result)
            res.redirect('/')
        })
        .catch(error => console.error(error))
        console.log(req.body)
    })

    app.put('/mahasiswa', (req, res) => {
        console.log(req.body.id)
        mahasiswacollection.findOneAndUpdate(
            { _id: ObjectId(req.body.id) },
            {
              $set: {
                nim: req.body.nim,
                nama: req.body.nama
              }
            },
            {
              upsert: true
            }
          )
            .then(result => {
                res.json('Success')
            })
            .catch(error => console.error(error))
    })

    app.delete('/mahasiswa', (req, res) => {
        mahasiswacollection.deleteOne(
            { _id: ObjectId(req.body.id) }
        ).then(result => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
    })

}).catch(console.error)