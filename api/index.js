const express = require('express');
const cors = require("cors");
const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync(10);
const jwt = require("jsonwebtoken");
const app = express();
const User = require('./models/User')
const mongoose = require('mongoose');
require('dotenv').config();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log('Connected to MongoDB Atlas');
});
app.get('/',(req,res)=>{
    res.send("HEY");
})
app.post('/register', async (req,res) => {
    console.log(req.body);
    try{
        const userDoc = await User.create(
            {
                username: req.body.username,
                fullName : req.body.fullname,
                gender: req.body.gender,
                email: req.body.email,
                password : bcryptjs.hashSync(req.body.password,salt),
                Role: req.body.role
            }
        );
        res.send(userDoc);
    }catch(e){
        console.log('Failed Submission');
        console.error(e);
        res.status(400).json(e);
    }
})
app.post('/login',async(req,res)=>{
    const {username, password} = req.body;
    console.log(req.body);
    try{
        const userDoc = await User.findOne({username});
        if(!userDoc){
            return res.status(400).json({error : 'User not found'});
        }
        const passOk = await bcryptjs.compare(password, userDoc.password);
        if(passOk){
            console.log("User logged in");
            const token = jwt.sign({username, id: userDoc._id},process.env.SECRET_KEY,{expiresIn:'1h'});
            res.cookie('token', token, {httpOnly : true}).json({message:'Login Successful'});
            console.log("User is logged in");
        }
        else{
            console.log("Wrong Password");
            res.status(404).json({error:"Wrong Credentials"});
        }
    }catch(e){
        console.error("Error during login", err);
        res.status(500).json({error:'INTERNAL SERVER ERROR'});
    }
});

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
    }
);