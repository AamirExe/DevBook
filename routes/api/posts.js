const express = require('express')

const router = express.Router();
const Posts = require('../../models/Posts')
const User = require('../../models/users')
const Profile = require('../../models/profile')

const auth = require('../../middlewear/auth')
const {check,validationResult} = require('express-validator')




// Create Post

router.post('/',[
    auth,
    check('text','Text is required').not().isEmpty()
],async (req,res,next)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        
        const user = await User.findById(req.user.id).select('-password');
        

        const newPost = new Posts({
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id
        })
    
        const post = await newPost.save();
        res.json(post)       
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
    

})

// Get all posts 

router.get('/',async (req,res,next)=>{
    try {
        const posts = await Posts.find().sort({date:-1})
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

// Get post By id 

router.get('/:id',async (req,res,next)=>{
    try {
        const post = await Posts.findById(req.params.id);
        if(!post){
            return res.json({msg:'There is no post '})
        }
        res.json(post)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

// Delete post

router.delete('/:id',[auth],async (req,res,next)=>{
    try {
        const post = await Posts.findById(req.params.id);
        if(!post){
            return res.json({msg:'There is no post '})
        }
        
        if(post.user.toString() !== req.user.id){
            return res.json({msg:'You are not allowed to delete this post '})
        }

        await post.remove();
        res.json({msg:'Post removed'})

    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})


// Like Post 

router.put('/likes/:id',auth,async (req,res)=>{

    try {
        const post = await Posts.findById(req.params.id);

        if(post.likes.filter(like=> like.user.toString() === req.user.id).length>0){
            throw new error();
        }
        post.likes.unshift({user:req.user.id});
    
        await post.save();
        res.json(post.likes)    
    
    
    } catch (error) {
        console.log(error);
        res.status(500).send("SErver error ")
    }
    


})


// Unlike POst
router.put('/unlikes/:id',auth,async (req,res)=>{

    try {
        const post = await Posts.findById(req.params.id);

        if(post.likes.filter(like=> like.user.toString() === req.user.id).length==0){
            throw new error();
        }
        const removeIndex = post.likes.map(like => like.user.toString() ).indexOf(req.user.id)

        post.likes.splice(removeIndex,1)
        
        
        await post.save();
        res.json(post.likes)    
    
    
    } catch (error) {
        console.log(error);
        res.status(500).send("SErver error ")
    }
    


})

// Add new Comment

router.post('/comments/:id',[
    auth,
    check('text','Text is required').not().isEmpty()
],async (req,res,next)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        
        const user = await User.findById(req.user.id).select('-password');
        const post = await Posts.findById(req.params.id)

        const newComment = {
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id
        }
        post.comments.unshift(newComment)
        post.save();
        res.json(post)       
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
    

})

// Delete Comment 

router.delete('/comments/:id/:cmntId',[auth],async (req,res)=>{
    try {
        
        const post = await Posts.findById(req.params.id)
        

        const comment = await post.comments.find(comment => comment.id==req.params.cmntId);
        if(!comment) 
        return res.status(404).json({msg:"Comment not found or doesnt exist "})

        if(comment.user.toString() !== req.user.id)
        return res.status(401).json({msg: "User not authorised"});

        const removeIndex = post.comments.map(comment => comment.user.toString() ).indexOf(req.user.id)

        post.comments.splice(removeIndex,1)
        
        
        await post.save();
        res.send(post)

 
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})


module.exports = router