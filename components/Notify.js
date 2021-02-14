import React, { useContext } from 'react';
import { DataContext } from '../store/GlobalState.js';
import Loading from './Loading.js';
import Toast from './Toast.js';

const Notify = ()=>{
   const { state, dispatch } = useContext(DataContext);
   const { notify } = state;

   return(
      <React.Fragment>
         {notify.loading && <Loading />}
         {notify.error && (
            <Toast 
               msg={{ msg: notify.error, title: 'Error' }}
               handleShow={()=> dispatch({ type: 'NOTIFY', payload: {} })}
               bgColor="bg-danger"
            />
         )}
         {notify.success && (
            <Toast 
               msg={{ msg: notify.success, title: 'Success' }}
               handleShow={()=> dispatch({ type: 'NOTIFY', payload: {} })}
               bgColor="bg-success"
            />
         )}
      </React.Fragment>
   );
}

export default Notify;