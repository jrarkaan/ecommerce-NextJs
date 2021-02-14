import bcrypt from 'bcrypt';
import connectDB from '../../../utils/connectDB.js';
import Users from '../../../models/userModels.js';
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken.js';

connectDB();

export default async(req, res)=>{
   switch (req.method) {
      case "POST":
         await login(req, res);
         break;
      default:
         break;
   }
}


const login = async(req, res)=> {
   try{
      const { email, password } = req.body;


      const userExists = await Users.findOne({ email });

      if(!userExists){
         return res.status(400).json({
            err: 'This user doesnt exist!'
         });
      }else{

         const isMatch = await bcrypt.compare(password, userExists.password);
         if(!isMatch) return res.status(400).json({ err: 'Inccorect password!' });
         
         const access_token = createAccessToken({ id: userExists._id });
         const refresh_token = createRefreshToken({ id: userExists._id });

         res.json({
            msg: 'Login Success!',
            refresh_token,
            access_token,
            user: {
               name: userExists.name,
               email: userExists.email,
               role: userExists.role,
               avatar: userExists.avatar,
               root: userExists.root
            }
         });
         
      }

   }catch(err){
      return res.status(500).json({
         err: err.message
      });
   }
}