import Head from 'next/head';
import React, { useContext } from 'react';
import { DataContext } from '../store/GlobalState.js';

const Cart = () => {
   const { state, dispatch } = useContext(DataContext);
   const { cart } = state;

   if(cart.length === 0) return <h2>Not empty!</h2>
   return (  
      <div>
         <Head>
            <title>Cart Page</title>
         </Head>

         <h1>Cart</h1>
      </div>
   );
}
 
export default Cart;