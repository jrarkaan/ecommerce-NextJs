import React, { createContext, useReducer, useEffect } from 'react';
import reducers from './Reducers.js';
import { getData } from '../utils/fetchData.js';

export const DataContext = createContext();

export const DataProvider = ({ children })=>{
   const initialState = { notify: {}, auth: {} };
   const [state, dispatch] = useReducer(reducers, initialState);

   useEffect(()=>{
      const firstLogin = localStorage.getItem('firstLogin');
      if(firstLogin){
         getData('auth/accessToken').then((res) => console.log(res));
      }
   }, []);

   return(
      <DataContext.Provider value={{ state, dispatch }}>
         {children}
      </DataContext.Provider>
   );
}