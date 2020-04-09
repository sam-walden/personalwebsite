const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
mongoose.connect(keys.MongoURI)
.then(()=>{
    console.log('Remote MongoDB is connected...');
});
const app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.use(express.static('public'));

//setup body parser to encode url
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//create collection with mongoose
const Schema = mongoose.Schema;
const Message = mongoose.model('message',new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    }
}))

const port = process.env.PORT || 3000;

app.get('/', (req,res) =>{
    res.render('home');
});

app.get('/about', (req,res) =>{
    res.render('about');
});

app.get('/contact', (req,res) => {
    res.render('contact');
});
app.post('/getMessage',(req,res) =>{
    const newMessage= {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    }
    new Message(newMessage).save()
    .then(()=>{
        res.render('inbox');
    });
});
// this is porfolio route handler
app.get('/portfolio', (req,res) => {
    res.render('portfolio');
});

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});