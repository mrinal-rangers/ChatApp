const User = require('../Models/userModel');
const bcrypt =require("bcrypt");
module.exports.login = async(req,res,next)=>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if(!user) return res.json({msg:"incorrect username or password",status:false});
        const isPassword = await bcrypt.compare(password,user.password);
        if(!isPassword)return res.json({msg:"incorrect username or password",status:false});
        delete user.password;
        return res.json({status:true,user});
        } catch (error) {
            next(error);
        }
}