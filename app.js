const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const qrcode = require('qrcode');
const ejs = require('ejs');
const path = require('path');

const app = express();

//configuration of PORT
dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 8080;

//logging requests made to the server
app.use(morgan('tiny'));

//parsing data coming from req.body in JSON format...
app.use(express.json());

//set view engine
app.set('view engine','ejs');

//parsing data coming from [forms generally] through HTTP requests using querystring library
app.use(express.urlencoded(
    {extended: false}
));

//loading assets
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))




app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/scan',(req,res)=>{
    const input_text = req.body.text;
    console.log(input_text);
    qrcode.toDataURL(input_text, (err,src) =>{
        res.render('scan',{
            qr_code:src
        })
    })
})




//Connecting with Server through PORT
app.listen(PORT,()=>{
    console.log(`Server is listening at port number ${PORT}`);
});


