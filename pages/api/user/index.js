import connectDB from '../../../utils/connectDB.js';
import auth from '../../../middleware/auth.js';
import Users from '../../../models/userModels.js';

connectDB();

export default async(req, res)=>{
   switch(req.method){
      case "PATCH":
         await uploadInfor(req, res);
         break;
   }
}

const uploadInfor = async(req, res)=>{
   try{
      const result = await auth(req, res);
      const { name, avatar } = req.body;

      const newUser = await Users.findOneAndUpdate({ _id: result.id }, { name, avatar });

      res.status(201).json({
         msg: "updated success!",
         user: {
            name,
            avatar,
            role: newUser.role,
            email: newUser.email
         }
      });

   }catch(err){
      return res.status(500).json({
         err: err.message
      })
   }
}