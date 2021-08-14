const express = require("express");
const path = require("path");
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:Mahaveer', {useNewUrlParser: true, useUnifiedTopology: true});
const app = express();
const port = 3000;


// define mongoose schema 
var contactSchema = new mongoose.Schema({
  user_name: String,
  email: String,
  phone: Number,
  message: String
});

var contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())



// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory


// ENDPOINTS
app.get('/', (req, res)=>{
   
    res.status(200).render('index.pug');
    
})

app.post('/index', (req,res)=>{
   var myData = new contact(req.body);
   myData.save().then(() =>{
     res.send("this item has been saved to the database")
   }).catch(() =>{
     res.status(400).send("Item was not saved to the database")
   });

})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
