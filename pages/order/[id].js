import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { DataContext } from '../../store/GlobalState.js';

const DetailOrder = () => {
   const { state, dispatch } = useContext(DataContext);
   const { orders, auth } = state;

   return (
      <div>Detail <Order></Order></div>
   )
}

export default DetailOrder;
