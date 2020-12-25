const mongoose = require('mongoose')

const config = require('./default.json')

const db = config.mongoUri

const connectDB = async () => {
    try{
        await mongoose.connect(db,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex:true
        })
        
        
        console.log('mongoose db connected ')
    }catch(err){
        console.log(err.message)
        //Exit process with failure 
        process.exit(1)
    }
}



module.exports = connectDB;