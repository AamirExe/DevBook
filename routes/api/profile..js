const express = require('express')
const auth  = require('../../middlewear/auth')
const Profile = require('../../models/profile')
const User = require('../../models/users')
const router = express.Router();
const {check,validationResult} = require('express-validator');
const profile = require('../../models/profile');
const request = require('request')
const config = require('../../config/default.json')

// TO get a profile 
router.get('/me',auth,async (req,res,next)=> {
    try{
        console.log(req.user)
        const profile =  (await Profile.findOne({user:req.user.id})).populate('user',['name','avatar'])
        
        if(!profile){
            return res.json({msg:"No  Profile found for this User "})
        }
        res.json(profile)

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }

})

router.post('/',[auth,
    [
        check('status','Status is required')
            .not().isEmpty(),
        check('skills','Skills is Required')
            .not().isEmpty()
    ]],
    async (req,res,next)=>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors)
            return res.status(400).json({errors:errors.array()})
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company 
        if(website) profileFields.website = website 
        if(location) profileFields.location = location
        if(bio) profileFields.bio = bio
        if(status) profileFields.status = status 
        if(githubusername) profileFields.githubusername = githubusername 
        if(skills) {

            profileFields.skills = skills.toString().split(',').map(skill => skill.trim())  
            
        }

        profileFields.social = {}
        if(youtube) profileFields.social.youtube =youtube 
        if(facebook) profileFields.social.facebook = facebook
        if(twitter) profileFields.social.twitter = twitter
        if(instagram) profileFields.social.instagram = instagram
        if(linkedin) profileFields.social.linkedin = linkedin


        try{
            let profile = await Profile.findOne({user:req.user.id})
            
            // IF profile exists then update
            if(profile){
                console.log('profile exists')
                profile = await Profile.findOneAndUpdate({user:req.user.id},{$set: profileFields},{new:true,useFindAndModify:false})
                return res.json(profile)
            }else{
                // If profile doesnt exists then create new Profile
            profile = new Profile(profileFields);
            await profile.save();
            return res.json(profile);
            
            }

            

        }catch(err){
            console.log(err)
        }

        
        
    });


    // Get all profile 


    router.get('/',async (req,res,next)=>{
        try {
            const profiles = await profile.find().populate('user',['name','avatar'])
            return res.json(profiles)
        } catch (error) {
            console.log(error)
            res.status(500).send("Server Error")
        }
    })


    // Get profile by user id 

    
    router.get('/user/:userId',async (req,res,next)=>{
        try {
            console.log('HII')
            console.log(req.params.userId)
            const profile = await Profile.findOne({ user : req.params.userId}).populate('user',['name','avatar'])
            if(!profile){
                return  res.status(400).json({msg: "There is no profile for this user"})
            }
            
            
            res.json(profile)
        } catch (error) {
            console.log(error)
            res.status(500).send("Server Error")
        }
    })

    // Remove User(we have to delete the users ID and his profile with post ) 
    router.delete('/',auth,async (req,res)=>{    
        try {
        //   Deleteing Profile
            await Profile.findOneAndRemove({user:req.user.id});
        // Deleting User
            await User.findOneAndRemove({_id : req.user.id})
       
            return res.json({msg:"User Removed"})
        } catch (error) {
           console.log(error)
            res.status(400).send("Server Error")
        } 

    })

    // Add experience 

    router.put('/experience',[auth,
        check('title',"Title is required")
        .not()
        .isEmpty(),
        check('company','Company is required')
        .not()
        .isEmpty(),
        check('from','From date is required')
        .not()
        .isEmpty()
    ],async (req,res)=>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return  res.status(400).json({errors:errors.array()})
        }

        const {
            title,company ,location,from,to,current,description
        } = req.body;

        const newExp = {title,company,location,from ,to, current,description}

        try {
            const profile = await Profile.findOne({user:req.user.id});
            profile.experience.unshift(newExp)
            await profile.save();
            return res.json(profile)

        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }

    })

    router.delete('/experience/:exp_id',auth,async(req,res)=>{
        try{
            const profile = await Profile.findOne({user:req.user.id});
            const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
            profile.experience.splice(removeIndex,1)
            await profile.save();
            return res.json(profile)
        }catch(err){
            console.error(error)
            res.status(500).send('Server Error')
        }
    })

  // Add Education 

  router.put('/education',[auth,
    check('school',"Title is required")
    .not()
    .isEmpty(),
    check('degree','Company is required')
    .not()
    .isEmpty(),
    check('fieldofstudy','fieldofstudy is required')
    .not()
    .isEmpty(),
    check('from','From date is required')
    .not()
    .isEmpty()
],async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return  res.status(400).json({errors:errors.array()})
    }

    const {
        school,degree,fieldofstudy,from,to,current,description
    } = req.body;

    const newExp = {school,degree,fieldofstudy,from ,to, current,description}

    try {
        const profile = await Profile.findOne({user:req.user.id});
        profile.education.unshift(newExp)
        await profile.save();
        return res.json(profile)

    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
    }

})

// Delete education field 

router.delete('/education/:edu_id',auth,async(req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id});
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex,1)
        await profile.save();
        return res.json(profile)
    }catch(err){
        console.error(error)
        res.status(500).send('Server Error')
    }
})


// Get user repo from github 

router.get('/github/:username',(req,res)=>{

    try{
        const option = {
            uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.gitHubClientId}
            &client_secret=${config.gitHubSecret}`,
            method:"GET",
            headers:{'user-agent': 'node.js'}
        }

        request(option,(error,response,body)=>{
            if(error) console.error(error);

            if(response.statusCode != 200){
               return res.status(400).json({msg:"No github profile found"})
            }
            return res.json(JSON.parse(body))
        })

    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }



})


module.exports = router