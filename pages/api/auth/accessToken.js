import connectDB from '../../../utils/connectDB.js';
import Users from '../../../models/userModels.js';
import jwt from 'jsonwebtoken';
import { createAccessToken } from '../../../utils/generateToken.js';

connectDB();

export default async(req, res)=>{
   try{
      const rf_token = req.cookies.refreshtoken;

      if(!rf_token) return res.status(400).json({ err: 'Please Login Now!' });

      const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);

      if(!result) return res.status(400).json({ err:'your token is incorrect or has expired!' });

      const user = await Users.findById(result.id);
      if(!user) return res.status(400).json({ err: 'user doesnt exist!' });

      const access_token = createAccessToken({ id: user._id });

      res.status(200).json({
         access_token,
         user: {
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            root: user.root
         }
      });
   }catch(err){
      return res.status(500).json({ err: err.message });
   }
}