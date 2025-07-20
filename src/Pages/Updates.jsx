import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Updates = () => {
  const { register, handleSubmit, reset } = useForm();
  const { productId } = useParams();
  const redirect = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`https://684bb39bed2578be881c2986.mockapi.io/api/products/product/${productId}`);
        reset(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    }

    fetchProduct();
  }, [reset, productId]);

  async function submitForm(data) {
    try {
      await axios.put(`https://684bb39bed2578be881c2986.mockapi.io/api/products/product/${productId}`, data);
      redirect('/About');
    } catch (err) {
      console.error('Error updating product:', err);
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className="form mx-auto mt-4 p-5 w-50 shadow-lg">
      <div className="mb-3">
        <select className="form-select" {...register('ProductSelect')} defaultValue="">
          <option value="">-Select-Category-</option>
          <option value="Cloths">Cloths</option>
          <option value="Electronics">Electronics</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div className="mb-3">
        <input className="form-control" type="text" {...register('ProductProducts')} placeholder="Please Enter Product" />
      </div>
      <div className="mb-3">
        <input className="form-control" type="text" {...register('ProductImage')} placeholder="Please Enter Url" />
      </div>
      <div className="mb-3">
        <input className="form-control" type="number" {...register('ProductPrice')} placeholder="Please Enter Price" />
      </div>
      <div className="mb-3">
        <input className="form-control" type="text" {...register('ProductDesc')} placeholder="Please Enter Product Desc" />
      </div>
      <button className="btn btn-warning text-center mb-3">Update</button>
    </form>
  );
};

export default Updates;
