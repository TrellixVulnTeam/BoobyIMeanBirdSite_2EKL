var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

const port = 3000;//8080

require('./models/bird.js');
// require('./models/bird_metrics.js');
// require('./models/boards.js');
// require('./models/user.js');

//instantiates all models as objects
const Bird = mongoose.model('Bird');
// const Bird_Metrics = mongoose.model('Bird_Metrics');
// const Boards = mongoose.model('Boards');
// const User = mongoose.model('User');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

// const router = express.Router();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, Methods, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/bird', ((req, res) => {
    Bird.find({}, (err, bird) => {
        if (err) {
            res.status(404);
            handleError(err, res, 'Not Found');
        } else {
            res.status(200).json(bird);
        }
    });
})).post('/bird', ((req, res) => {
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();

   Bird.create({
    name: "",
    url: "",
    date_added: day+'/'+month+'/'+year,
    upvotes: 0,
    downvotes: 0,
    bio: "",
    score: 0
   }) 
}));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.render('main-page.html');

});

app.get('/ratings', function(req, res) {
    res.render('rating-page.html');

});

app.get('/law', function(req, res) {
    res.render('law-page.html');

});


mongoose.connect('mongodb://localhost:27017/birddb');

app.listen(port, function () {
    console.log(`Listening on port ${port}...`);
});