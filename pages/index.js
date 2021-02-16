import React, { useState } from 'react';
import Head from 'next/head';
import { getData } from '../utils/fetchData.js';
import ProductItem from '../components/product/ProductItem.js';

export default function Home(props) {

  const [products, setProducts] = useState(props.products);

  return (
    <div className="products">
      <Head>
        <title>Home Page</title>
      </Head>

      {
        products.length === 0 ? (
          <h2>No Products</h2>
        ) : products.map((product)=>(
          <ProductItem key={product._id} product={product} />
        ))
      }
    </div>
  )
}

export async function getServerSideProps(){
  const res = await getData('product') // to connect a folder api/product/index
  return{
    props: {
      products: res.products,
      result: res.result
    }
  }
}
