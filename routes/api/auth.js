const express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router();
const auth = require('../../middlewear/auth')
const User = require('../../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config/default.json')



router.get('/',auth,async (req,res,next)=> {
    
    try{
        const user = await User.findById(req.user.id).select('-password')
        return res.json(user)
}catch(err){
    console.log(err)
}
    

})

router.post('/',[
    check('email','Enter a valid Email').trim().isEmail(),
    check('password','Password is required').exists()
] ,async (req,res,next)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body

    try{
        
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({errors:[{msg:"Invalid Credentials"}]})
        }
       

       const isMatch = await bcrypt.compare(password,user.password);
       if(!isMatch){
         return res.status(400).json({errors:[{msg:"Invalid Credentials"}]})
       }
        
        // Creating Json web token for authentication
        const payload = {
            user:{
                id: user.id
            }
        }
        jwt.sign(payload,config.jwtToken,{expiresIn:3600000},(err,token)=>{
            if (err){
                throw err ;
            }
                
            return res.json({token})
        })
        
        }catch(err){
            console.log(err.message)
        }
    
         

})












module.exports = router