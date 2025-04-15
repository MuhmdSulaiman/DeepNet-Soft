import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditMenuForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:4000/api/menus/viewmenu/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFormData({
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          category: response.data.category
        });
      } catch (err) {
        setError('Failed to load menu data');
      }
    };

    fetchMenu();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5001/api/menus/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage('Menu updated successfully!');
      setTimeout(() => navigate('/'), 1000); 
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.errors) {
        setError(err.response.data.errors[0].msg);
      } else {
        setError('Failed to update menu');
      }
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h2>Edit Menu</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Menu Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          required
        /><br /><br />

        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Snack">Snack</option>
          <option value="Drink">Drink</option>
          <option value="Dessert">Dessert</option>
        </select><br /><br />

        <button type="submit">Update Menu</button>
      </form>
    </div>
  );
};

export default EditMenuForm;
