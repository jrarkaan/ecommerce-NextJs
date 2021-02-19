import Head from 'next/head';
import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../store/GlobalState.js';
import CartItem from '../components/CartItem.js';
import Link from 'next/link';
import { getData } from '../utils/fetchData.js';

const Cart = () => {
   const { state, dispatch } = useContext(DataContext);
   const { cart, auth } = state;
   const [total, setTotal] = useState(0);

   useEffect(()=>{
      const res = cart.reduce((prev, item)=>{
         return prev + (item.price * item.quantity)
      }, 0);

      setTotal(res);
   }, [cart]);

   useEffect(()=>{
      const cartLocal = JSON.parse(localStorage.getItem('__next__cart01__'));
      if(cartLocal && cartLocal.length > 0){
         let newArr = [];
         const updateCart = async()=>{
            for (const item of cartLocal){
               const res = await getData(`product/${item._id}`);

               const { _id, title, images, price, inStock, sold } = res.product;
               if(inStock > 0){
                  newArr.push({ _id, title, images,
                      price, inStock, sold, quantity: item.quantity > inStock ? 1 : item.quantity 
                  });
               }
            }

            dispatch({ type: 'ADD_CART', payload: newArr });
         }

         updateCart();
      }
   }, []);

   if(cart.length === 0) return <h2>Not empty!</h2>
   
   return (  
      <div className="row mx-auto">
         <Head>
            <title>Cart Page</title>
         </Head>

         <div className="col-md-8 text-secondary table-responsive my-3">
            <h2 className="text-uppercase">Shopping Cart</h2>

            <table className="table my-3">
               <tbody>
                  {
                     cart.map(item=>(
                        <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                     ))
                  }
               </tbody>
            </table>

         </div>

         <div className="col-md-4 my-3 text-right text-uppercase">
            <form>
               <h2>Shipping</h2>
               <label htmlFor="address">Address</label>
               <input 
                  type="text"
                  name="address"
                  id="address"
                  className="form-control mb-2"
               />
               <label htmlFor="address">Mobile</label>
               <input 
                  type="text"
                  name="mobile"
                  id="mobile"
                  className="form-control mb-2"
               />
            </form>

            <h3>Total : <span className="text-info" >${total}</span></h3>

            <Link href={auth.user ? "#" : '/signin'} >
               <a className="btn btn-dark my-2">Proceed with Payment</a>
            </Link>
         </div>
      </div>
   );
}
 
export default Cart;