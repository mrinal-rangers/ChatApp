const express = require("express");
const {register} = require("../Controllers/userController");
const { login } = require("../Controllers/loginController");


const router = express.Router();

// api/auth/register;
router.get('/register',(req,res)=>{
    res.send('get req');
});

router.post('/register',register);
router.post('/login',login);
module.exports = router;