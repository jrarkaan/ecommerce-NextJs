import React, { createContext, useReducer } from 'react';
import reducers from './Reducers.js'

export const DataContext = createContext();

export const DataProvider = ({ children })=>{
   const initialState = { notify: {}, auth: {} };
   const [state, dispatch] = useReducer(reducers, initialState);

   return(
      <DataContext.Provider value={[state, dispatch]}>
         {children}
      </DataContext.Provider>
   );
}