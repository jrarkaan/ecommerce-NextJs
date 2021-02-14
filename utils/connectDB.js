import mongoose from 'mongoose';
import colors from 'colors';

const mongooseOptions = { 
   useCreateIndex: true,
   useFindAndModify: false,
   useNewUrlParser: true,
   useUnifiedTopology: true
};

// database connection
mongoose.Promise = Promise;
const connectDB = async()=>{
   try{
      const conn = await mongoose.connect(process.env.MONGO_LOCAL, mongooseOptions);
      console.log(`MongoDB connected: ${conn.connection.host}:27017`.cyan.underline.bold);
   }catch(err){
      console.log(`Error: ${err.message}`.red.underline.bold);
   }
}

export default connectDB;

/* 

const connectDB = ()=>{
   if(mongoose.connections[0].readyState){
      console.log('Already connected.');
      return;
   }
   mongoose.connect(process.env.MONGODB_URL1, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
   }, err => {
      if(err) throw err;
      console.log('Connected to MongoDB.');
   });
}

*/