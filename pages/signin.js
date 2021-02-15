import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import valid from '../utils/valid.js'; 
import { DataContext } from '../store/GlobalState.js';
import { postData } from '../utils/fetchData.js';

const Signin = () => {
   const initialState = { email: '', password: '' };
   const router = useRouter();
   const [userData, setUserData] = useState(initialState);
   const { email, password } = userData;

   const { state, dispatch } = useContext(DataContext);
   const { auth } = state;

   const handleChangeInput = (e)=>{
      const { name, value } = e.target;
      setUserData({...userData, [name]: value});
   }

   const handleSubmit = async(e)=>{
      e.preventDefault();

      dispatch({ type: 'NOTIFY', payload: { loading: true }});
      const res = await postData('auth/login', userData);
      
      if(res.err) return  dispatch({ type: 'NOTIFY', payload: { error: res.err }});
     
      dispatch({ type: 'NOTIFY', payload: { success: res.msg }});

      dispatch({ type: 'AUTH', payload: {
         token: res.access_token,
         user: res.user
      }});
      
      Cookie.set('refreshtoken', res.refresh_token, {
         path: 'api/auth/accessToken',
         expires: 7
      });
      localStorage.setItem('firstLogin', true);
   }

   useEffect(()=>{
      if(Object.keys(auth).length !== 0) router.push('/');
   }, [auth]);

   return (  
      <div>
         <Head>
            <title>Sign In Page</title>
         </Head>

         <form className="mx-auto my-4" style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
            
            <div className="form-group">
               <label htmlfor="exampleInputEmail1">Email address</label>
               <input 
                  type="email" 
                  className="form-control" 
                  id="exampleInputEmail1" 
                  aria-describedby="emailHelp" 
                  name="email"
                  value={email}
                  onChange={handleChangeInput}
               />
               <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>

            <div className="form-group">
               <label htmlfor="exampleInputPassword1">Password</label>
               <input 
                  type="password" 
                  className="form-control" 
                  id="exampleInputPassword1" 
                  name="password"
                  value={password}
                  onChange={handleChangeInput}
               />
            </div>
           
            <button type="submit" className="btn btn-dark w-100">Login</button>

            <p className="my-2">You don't have an account? 
               <Link href="/register"><a style={{ color: 'crimson' }}> Register</a></Link>
            </p>
         </form>
      </div>
      
   );
}
 
export default Signin;