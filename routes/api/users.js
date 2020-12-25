const express = require('express')
const {check,validationResult} = require('express-validator')

const router = express.Router();
const User = require('../../models/users')

const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config/default.json')


router.post('/',[
    check('name','Enter name ').not().notEmpty(),
    check('email','Enter a valid Email').trim().isEmail(),
    check('password','Password length must be greater then 6 ').isLength({min:6})
] ,async (req,res,next)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        
        return res.status(400).json({errors:errors.array()});
    }

    const {name,email,password} = req.body

    try{
        console.log("in Try")
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({errors:[{msg:"User already exist"}]})
        }
        const avatar = gravatar.url(email,{
            s:'100',
            r:'pg',
            d:'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();
        
        // Creating Json web token for authentication
        const payload = {
            user:{
                id: user.id
            }
        }
        jwt.sign(payload,config.jwtToken,{expiresIn:3600000},(err,token)=>{
            
            if (err) 
            return console.log(err) ;
          
            
            return  res.json({token})
        })
        
        }catch(err){
            console.log(err.message)
        }
    
         

})



module.exports = router