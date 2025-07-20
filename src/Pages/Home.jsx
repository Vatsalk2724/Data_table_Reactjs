
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import axios from "axios";

const Home = () => {
  const { register, handleSubmit, reset } = useForm();
  const [products, setProducts] = useState([]);

  
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `https://684bb39bed2578be881c2986.mockapi.io/api/products/product`
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  
  async function submitForm(data) {
    const newDate = { ...data, createdAt: new Date().toLocaleDateString() };
    try {
      await axios.post(
        `https://684bb39bed2578be881c2986.mockapi.io/api/products/product`,
        newDate
      );
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
    reset();
  }

  useEffect(() => {
    fetchProducts();
  }, []);



  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} className="form mx-auto mt-4 p-5 w-50 shadow-lg  ">
        <div className="mb-3">
          <select className="form-select" {...register("ProductSelect")}> 
            <option value="" defaultValue>
              -Select-Category
            </option>
            <option value="Cloths">Cloths</option>
            <option value="Electronics">Electronics</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            {...register("ProductProducts")}
            placeholder="Please Enter Product"
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            {...register("ProductImage")}
            placeholder="Please Enter Url"
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="number"
            {...register("ProductPrice")}
            placeholder="Please Enter Price"
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            {...register("ProductDesc")}
            placeholder="Please Enter Product Desc"
          />
        </div>

        <button className="btn btn-success text-center mb-3">Submit</button>
      </form>


    </>
  );
};

export default Home;
