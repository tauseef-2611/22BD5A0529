import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { Form, InputGroup, Button, Card } from 'react-bootstrap';

import './Products.css'; // Importing a CSS file to style your components


const Products = () => {
    
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    rating: '',
    priceRange: { min: '', max: '' },
    availability: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=10000', {
          headers: {
            Authorization: 'Bearer your-token'
          }
        });
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('Response data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const filteredProducts = products.filter(product => {
    return (
      (filters.category === '' || product.category === filters.category) &&
      (filters.company === '' || product.company === filters.company) &&
      (filters.rating === '' || product.rating >= filters.rating) &&
      (filters.priceRange.min === '' || product.price >= filters.priceRange.min) &&
      (filters.priceRange.max === '' || product.price <= filters.priceRange.max) &&
      (filters.availability === '' || product.availability === filters.availability)
    );
  });

  return (
    <div className="products-page">
    <form className="filter-form">
      <div className="form-group" id="filterForm">
        <label>Filter</label>
        <div className="input-group mb-3">
          <input className="form-control" placeholder="Category" name="category" onChange={handleFilterChange} />
          <input className="form-control" placeholder="Company" name="company" onChange={handleFilterChange} />
          <input className="form-control" placeholder="Rating" type="number" name="rating" onChange={handleFilterChange} />
          <input className="form-control" placeholder="Min Price" type="number" name="priceRange.min" onChange={handleFilterChange} />
          <input className="form-control" placeholder="Max Price" type="number" name="priceRange.max" onChange={handleFilterChange} />
          <input className="form-control" placeholder="Availability" name="availability" onChange={handleFilterChange} />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary">Filter</button>
          </div>
        </div>
      </div>
    </form>

    <div className="product-list">
      {filteredProducts.map((product, index) => (
        <div className="card" style={{ width: '18rem' }} key={index}>
          <img className="card-img-top" src="img.jpg" alt="Product" /> {/* Replace with your product image */}
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">
              {product.description}
            </p>
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      ))}
    </div>
  </div>

  );
};

export default Products;