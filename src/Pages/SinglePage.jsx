import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'


const SinglePage = () => {

  const [product, setProduct] = useState({})
  const {productId} = useParams()

  console.log(product);  

  async function ShowAPi(id) {

    await axios.get(`https://684bb39bed2578be881c2986.mockapi.io/api/products/product/${productId}`)
     .then((res) => setProduct(res.data)) 
  }



  useEffect(() => {
    ShowAPi()
  } , [productId])


  return (
    <>
    
    <div className="card mx-auto mt-lg-5 col-lg-6 w-50 shadow-lg p-5 ">
      <div className="row">
      <div className='col-lg-3'> <img src={product.ProductImage} width={100} height={100} /></div>
      <div className="col-lg-9">
        <p><b>{product.ProductSelect}</b></p>
       <h6>{product.ProductProducts}</h6>
       <p>{product.ProductDesc}</p>
       <p>₹{product.ProductPrice}</p> 
        </div>


      </div>
    </div>
    </>
  )
}


export default SinglePage