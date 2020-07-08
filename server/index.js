
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = 3001;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('../db/Index.js');
const moment = require('moment');


app.use(morgan());
// app.use('/:id', express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());//http-proxy-middleware instead of cors?


// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });


app.use(express.static(path.join(__dirname, '../dist')));


app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

////////////////////////////////////////////////////////////////////////
// Updates
////////////////////////////////////////////////////////////////////////

// Get Update by DB
app.get('/api/update/:id', function (req, res) {
  db.Update.findOne({where: {id: req.params.id }})
  .then(function(data){
    res.status(200).send(data);
  })
});

// Get all updates
app.get('/api/update/', function (req, res) {
  db.Update.findAll()
  .then(function(data){
    res.status(200).send(data);
  })
});

app.post('/api/update/', function(req, res) {
  db.Update.create({
    title: req.body.title,
    author: req.body.author,
    imageUrl: req.body.imageUrl,
    createdAt: Date.now(),
    body: req.body.body,
    likes: req.body.likes,
    campaignID: req.body.campaignID
  })
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((err) => {
    res.status(400).send(err);
  })
})

app.put('/api/update/:id', function(req, res) {
  const id = req.params.id;
  db.Update.update(
    { title: req.body.title},
    { where: { id: id } }
  )
    .then((result) => {
      res.status(200).send('Record successfully updated');
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

app.delete('/api/update/:id', function(req, res) {
  const id = req.params.id;
  db.Update.destroy(
    { where: { id: id } }
  )
    .then((result) => {
      res.status(200).send('Record successfully deleted');
    })
    .catch(err => {
      res.status(400).send(err)
    })
})
////////////////////////////////////////////////////////////////////////
// Comments
////////////////////////////////////////////////////////////////////////

app.get('/api/comment/:id', function (req, res) {
  db.Comment.findAll({where: {updateID: req.params.id }})
  .then(function(data){
    res.status(200).send(data);
  })
});

//Get all comments in db.
app.get('/api/comment/', function (req, res) {
  db.Comment.findAll()
  .then(function(data){
    res.status(200).send(data);
  })
});

app.post('/api/comment/', function (req, res) {
  db.Comment.create({
    updateID: req.body.updateID,
    userName: req.body.userName,
    comment:req.body.comment,
    createdAt: req.body.createdAt,
  })
  .then(function(){
    res.send('sent to server');
  })
});

app.put('/api/comment/:id', function(req, res) {
  const id = req.params.id;
  db.Update.update(
    { comment: req.body.comment },
    { where: {updateID: id} }
  )
    .then((result) => {
      res.status(200).send('Comment successfully updated');
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

app.delete('/api/comment/:id', function(req, res) {
  const id = req.params.id;
  db.Update.destroy(
    { where: {updateID: id} }
  )
    .then((result) => {
      res.status(200).send('Comment successfully deleted');
    })
    .catch(err => {
      res.status(400).send(err)
    })
})


app.listen(port, () => console.log(`listening at http://localhost:${port}`))
