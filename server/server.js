const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoogse = require('mongoose');

mongoogse.Promise = global.Promise;
mongoogse.connect("mongodb://localhost:27017/auth");

const {User} = require('./models/user');

app.use(bodyParser.json());

app.post('/api/user',(req,res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    user.save((err,doc) => {
        if (err) res.status(400).send(err);
        res.status(200).send(doc);
    })
});

app.post('/api/user/login', (req,res) => {
    
    User.findOne({email: req.body.email}, (err, user) =>{
        if(!user) res.status(401).json({message: 'Auth failed, user not found'});
        
        user.comparePassword(req.body.password,(err, isMatch) =>{
            if (err) throw err;

            if (!isMatch) return res.status(401).json({message: 'Auth failed, invalid password'});

            user.generatedToken((err, user) =>{
                if(err) return res.status(400).send(err);
                res.cookie('auth', user.token).send('ok');
            })
        })
    })
});

const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log(`Started on port : ${port}`);
})