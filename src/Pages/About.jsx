import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";


const About = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");


  async function showApi(data) {
    await axios
      .get(
        `https://684bb39bed2578be881c2986.mockapi.io/api/products/product`,
        data
      )
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }

  
  const filteredProducts = product
    .filter((item) => {
  
      const matchesSearch =
        item.ProductProducts?.toLowerCase().includes(search.toLowerCase()) ||
        item.ProductSelect?.toLowerCase().includes(search.toLowerCase());
  
      const matchesCategory = filterCategory
        ? item.ProductSelect === filterCategory
        : true;
  
      const price = Number(item.ProductPrice);
      const matchesMin = minPrice !== "" ? price >= Number(minPrice) : true;
      const matchesMax = maxPrice !== "" ? price <= Number(maxPrice) : true;
      return matchesSearch && matchesCategory && matchesMin && matchesMax;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.ProductProducts.localeCompare(b.ProductProducts);
      } else if (sortBy === "price") {
        return Number(a.ProductPrice) - Number(b.ProductPrice);
      }
      return 0;
    });

  
  const priceList = filteredProducts.map((item) => Number(item.ProductPrice)).filter((n) => !isNaN(n));
  
  async function trash(id) {
    if (confirm("Do You Want To Delete")) {
      await axios.delete(
        `https://684bb39bed2578be881c2986.mockapi.io/api/products/product/${id}`
      );
      showApi();
    }
  }

  useEffect(() => {
    showApi();
  }, []);

  return (
    <>
  
      <div className="container mt-4 mb-3">
        <div className="row g-2 align-items-end">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or category"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Cloths">Cloths</option>
              <option value="Electronics">Electronics</option>
              <option value="Others">Others</option>
            </select>
          </div>
  
          <div className="col-md-3">
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
       
      </div>

      <table className="table table-bordered table-hover table-info ">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Name</th>
            <th>Desc</th>
            <th>Image</th>
            <th>Price</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.ProductSelect}</td>
                <td width={150}>{product.ProductProducts}</td>
                <td width={150}>{product.ProductDesc}</td>
                <td width={100}>
                  <img src={product.ProductImage} width={100} height={100} />
                </td>
                <td>
                  <sup>₹</sup>
                  {product.ProductPrice}
                </td>
                <td>{product.createdAt}</td>
                <td>
                  <NavLink
                    onClick={() => trash(product.id)}
                    className="btn btn-outline-danger mx-2"
                  >
                    <FaTrash />
                  </NavLink>
                  <NavLink
                    to={`/SinglePage/${product.id}`}
                    className="btn btn-outline-warning">
                    <FaEye />
                  </NavLink>
                  <NavLink
                    to={`/Updates/${product.id}`}
                    className="btn btn-outline-success">
                    <FaPencil />
                  </NavLink>
                </td>
              </tr>
            ))
          ) : (
            <tr>
            
            </tr>
          )}

        </tbody>
      </table>
    </>
  );
};

export default About;
