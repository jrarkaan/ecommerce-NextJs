import bcrypt from 'bcrypt';
import connectDB from '../../../utils/connectDB.js';
import auth from '../../../middleware/auth.js';
import Users from '../../../models/userModels.js';

connectDB();

export default async(req, res)=>{
   switch(req.method){
      case "PATCH":
         await resetPassword(req, res);
         break;
   }
}

const resetPassword = async(req, res)=>{
   try{
      const result = await auth(req, res);
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      await Users.findOneAndUpdate({ _id: result.id }, { password: passwordHash });

      res.status(200).json({ msg: "Update Success!" })
   }catch(err){
      return res.status(500).json({ err: err.message });
   }
}