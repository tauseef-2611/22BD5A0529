import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=100', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MDc2NDM3LCJpYXQiOjE3MTcwNzYxMzcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImMzZTlhNjIxLTc4NDYtNGI4YS1hNWRkLTE2MGE2Y2RhMTJkYiIsInN1YiI6IndvcmsudGF1c2VlZkBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJUZWNoVGl0YW4iLCJjbGllbnRJRCI6ImMzZTlhNjIxLTc4NDYtNGI4YS1hNWRkLTE2MGE2Y2RhMTJkYiIsImNsaWVudFNlY3JldCI6Inl4aWFWVkpZR2txaEV6ZVoiLCJvd25lck5hbWUiOiJNb2hhbW1lZCBUYXVzZWVmIEFobWVkIiwib3duZXJFbWFpbCI6IndvcmsudGF1c2VlZkBnbWFpbC5jb20iLCJyb2xsTm8iOiIyMkJENUEwNTI5In0.LDf5ZRkFRgrRIEf-KlTgO973l0ID6vDyPL_00c1VQKA'
          }
        });

        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Description</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Products;