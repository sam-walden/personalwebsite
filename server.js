const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.use(express.static('public'));

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
// this is porfolio route handler
app.get('/portfolio', (req,res) => {
    res.render('portfolio');
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});