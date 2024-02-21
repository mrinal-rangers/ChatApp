const User = require('../Models/userModel');
const bcrypt =require("bcrypt");
const salt = 10;

module.exports.register = async(req,res,next)=>{
    try {
    const {username,email,password} = req.body;
    const usernameCheck = await User.findOne({username});
    if(usernameCheck) return res.json({msg:"username already used",status:false});
    const emailCheck = await User.findOne({email});
    if(emailCheck) return res.json({msg:"email already used",status:false});
    const hashedPassword = await bcrypt.hash(password,salt);
    const user = await User.create({
        email,username,password:hashedPassword
    });
    delete user.password;
    return res.json({stauts:true,user});

    } catch (error) {
        next(error);
    }
}