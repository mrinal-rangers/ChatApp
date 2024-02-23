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

module.exports.setAvatar = async(req,res,next)=>{
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const user = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage,
        });
        return res.json({isSet:user.isAvatarImageSet ,image:user.avatarImage})
        } catch (error) {
            next(error);
        }
}