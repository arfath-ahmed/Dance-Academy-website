const express = require("express");
const path = require("path");
var mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
const bodyparser = require('body-parser');
const app = express();
const port = 8000;

//define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    desc: String
})

var contact = mongoose.model('contact', contactSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res)=>{
    res.status(200).render('home.pug');
});

app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
});

app.get('/services', (req, res)=>{
    res.status(200).render('services.pug');
});

app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("We got you! Our team will get back to you soon!")
    }).catch(()=>{
        res.send("Some problem occured! Please try again later!")
    });
    //res.status(200).render('contact.pug');
});

app.listen(port, ()=>{
    console.log(`The application is running successfully on port ${port}`);
});