import React, { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { DataContext } from '../store/GlobalState.js';
import { patchData } from '../utils/fetchData.js';
import { imageUpload } from '../utils/ImageUpload.js';

import valid from '../utils/valid.js';

const Profile = () => {
   const initialState = {
      avatar: "",
      name: "",
      password: "",
      cf_password: ""
   }
   
   const [data, setData] = useState(initialState);
   const { avatar, name, password, cf_password } = data;

   const { state, dispatch } = useContext(DataContext);
   const { auth, notify } = state;

   useEffect(()=>{

      if(auth.user) setData({ ...data, name: auth.user.name });

   }, [auth.user]);

   const handleChange = (e)=>{
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
      dispatch({ type: 'NOTIFY', payload: {} });
   }

   const handleUpdate = (e)=>{
      e.preventDefault();
      if(password){
         const errMsg = valid(name, auth.user.email, password, cf_password);
         if(errMsg) return dispatch({ type: 'NOTIFY', payload: { error: errMsg } });
         updatePassword();
      }

      if(name !== auth.user.name || avatar) updateInfor()
   }

   const updatePassword = ()=>{
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      patchData('user/resetPassword', { password }, auth.token)
         .then((res)=>{
            if(res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.msg } });
            return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
         })
   }

   const changeAvatar = (e)=>{
      console.log(e.target.files)
      const file = e.target.files[0];
      if(!file) return dispatch({ type: 'NOTIFY', payload: { error: 'File doesnt exist' } });

      if(file.size > 1024 * 1024) return dispatch({ type: 'NOTIFY', payload: { error: 'The Largest image size is 1 MB' } });

      if(file.type !== "image/jpeg" && file.type !== "image/png") return dispatch({ type: 'NOTIFY', payload: { error: 'Image format is incorrect! ' } });

      setData({ ...data, avatar: file });

   }

   const updateInfor = async()=>{
      let media;
      dispatch({ type:"NOTIFY", payload: { loading: true } });

      if(avatar) media = await imageUpload([avatar]);

      console.log(media);
   }

   if(!auth.user) return null;

   return (  
      <div className="profile_page">
         <Head>
            <title>Profile</title>
         </Head>

         <section className="row text-secondary my-3">
            <div className="col-md-4">
               <h3 className="text-center">
                  {auth.user.role === "user" ? "User Profile" : "Admin Profile"}
               </h3>

               <div className="avatar">
                  <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="avatar"/>
                  <span>
                     <i className="fas fa-camera"></i>
                     <p>Change</p>
                     <input 
                        accept="image/*"
                        type="file" 
                        name="file" 
                        id="file_up"
                        onChange={changeAvatar} 
                     />
                  </span>
               </div>

               <div className="form-group">
                  <label htmlFor="name" >Name</label>
                  <input 
                     type="text" name="name" 
                     value={name} 
                     className="form-control" 
                     placeholder="your name"
                     onChange={handleChange}
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="email" >Email</label>
                  <input 
                     type="text" name="email" 
                     value={auth.user.email} 
                     className="form-control" 
                     placeholder="your email" 
                     disabled={true}
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="password" >New Password</label>
                  <input 
                     type="password" name="password" 
                     value={password}
                     className="form-control" 
                     placeholder="your password" 
                     onChange={handleChange}
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="cf_password" >Confirm New Password</label>
                  <input 
                     type="password" name="cf_password" 
                     value={cf_password}
                     className="form-control" 
                     placeholder="confirm your password" 
                     onChange={handleChange}
                  />
               </div>

               <button 
                  className="btn btn-info" 
                  disabled={notify.loading}
                  onClick={handleUpdate} 
               >
                  Update
               </button>

            </div>


            <div className="col-md-8">
               <h3>Orders</h3>
            </div>
         </section>
      </div>
   );
}
 
export default Profile;
