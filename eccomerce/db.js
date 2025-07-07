const mongoose = require('mongoose');


const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/ecommerce', { // Connects to a local MongoDB database named ecommerce
            useNewUrlParser: true, //uses new url parsers to avoid warning
            useUnifiedTopology: true // tells mongoose to use new engine
        });
        console.log(("MongoDB connected"));
    }catch(error){
        console.log('MongoDB connection error:', error.message);
        process.exit(1); // forces app to stop running ( 0 means normal exit and 1 means stopped with an error)
    }
};

module.exports = connectDB;