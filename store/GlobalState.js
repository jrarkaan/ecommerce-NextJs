import React, { createContext, useReducer, useEffect } from 'react';
import reducers from './Reducers.js';
import { getData } from '../utils/fetchData.js';

export const DataContext = createContext();

export const DataProvider = ({ children })=>{
   const initialState = { notify: {}, auth: {}, cart: [] };
   const [state, dispatch] = useReducer(reducers, initialState);
   const { cart } = state;

   useEffect(()=>{
      const firstLogin = localStorage.getItem('firstLogin');
      if(firstLogin){
         getData('auth/accessToken').then((res)=>{
            if(res.err) return localStorage.removeItem("firstLogin");

            dispatch({
               type: "AUTH",
               payload: {
                  token: res.access_token,
                  user: res.user
               }
            });

         });
      }
   }, []);

   useEffect(() => {
      const __next__cart01__ = JSON.parse(localStorage.getItem('__next__cart01__'));
      if(__next__cart01__) dispatch({ type: 'ADD_CART', payload: __next__cart01__ });
   }, []);

   useEffect(()=>{
      localStorage.setItem('__next__cart01__', JSON.stringify(cart));
   },[cart]);

   return(
      <DataContext.Provider value={{ state, dispatch }}>
         {children}
      </DataContext.Provider>
   );
}