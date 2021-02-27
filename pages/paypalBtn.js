import React, { useEffect, useRef } from 'react';
import { postData } from '../utils/fetchData.js';

const  paypalBtn= ({ address, mobile, total, state, dispatch }) => {
  const { auth, cart } = state;
   const refPaypalBtn = useRef();

   useEffect(() => {
      paypal.Buttons({
         createOrder: function(data, actions) {
           // This function sets up the details of the transaction, including the amount and line item details.
           return actions.order.create({
             purchase_units: [{
               amount: {
                 value: total
               }
             }]
           });
         },
         onApprove: function(data, actions) {
           // This function captures the funds from the transaction.
           dispatch({ type: "NOTIFY", payload: { loading: true } });
           
           return actions.order.capture().then(function(details) {
             postData('order', { address, mobile, cart, total }, auth.token)
                .then(res => {
                    if(res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });
                    dispatch({ type: "ADD_CART", payload: [] });
                    return dispatch({ type: "ADD_CART", payload: { success: res.msg } })
                  })
             // This function shows a transaction success message to your buyer.
            //  alert('Transaction completed by ' + details.payer.name.given_name);
           });
         }
       }).render(refPaypalBtn.current);
   }, []);


   return (  
      <div ref={refPaypalBtn}></div>
   );
}
 
export default paypalBtn;