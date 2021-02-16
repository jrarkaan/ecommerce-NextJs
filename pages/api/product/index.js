import connectDB from '../../../utils/connectDB.js';
import Products from '../../../models/productModels.js';

connectDB();

export default async(req, res)=>{
   switch(req.method){
      case "GET":
         await getProducts(req, res);
         break;
   }
}

const getProducts = async(req, res)=>{
   try {
      const products = await Products.find();

      res.status(200).json({
         status: "success",
         result: products.length,
         products
      });

   }catch(err){
      return res.status(500).json({ err: err.message });
   }
}