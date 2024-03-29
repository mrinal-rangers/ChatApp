const express = require("express");
const {register,login, setAvatar,getAllUsers} = require("../Controllers/userController");


const router = express.Router();

// api/auth/register;
router.get('/register',(req,res)=>{
    res.send('get req');
});

router.post('/register',register);
router.post('/login',login);
router.post('/setAvatar/:id',setAvatar);
router.get('/allUsers/:id',getAllUsers);
module.exports = router;