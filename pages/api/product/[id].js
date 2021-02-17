import connectDB from '../../../utils/connectDB.js';
import Products from '../../../models/productModels.js';

connectDB();

export default async(req, res)=>{
   switch(req.method){
      case "GET":
         await getProduct(req, res);
         break;
   }
}

const getProduct = async(req, res)=>{
   try {
      const { id } = req.query;
      const product = await Products.findById(id);

      if(!product) return res.status(400).json({ err: 'This product doesnt exist.' });

      res.status(200).json({
         status: "success",
         product
      });

   }catch(err){
      return res.status(500).json({ err: err.message });
   }
}