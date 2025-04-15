import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './footer';

const CreateMenuForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Food',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/menus/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('Menu created successfully!');
      setFormData({ name: '', description: '', price: '', category: 'Food' });
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.errors) {
        setError(err.response.data.errors[0].msg);
      } else {
        setError('Failed to create menu');
      }
    }
  };

  return (
    <>
      {/* Header */}
      <header
        style={{
          backgroundColor: '#121618',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 5%',
          height: '100px',
          fontFamily: 'Oswald, sans-serif',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              backgroundImage: `url('./logo.png')`,
              width: '50px',
              height: '60px',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '20px', color: '#00AEEF', fontWeight: '600' }}>
              DEEP <span style={{ color: '#fff' }}>NET</span>
            </div>
            <div style={{ fontSize: '16px', color: '#857878' }}>SOFT</div>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: '20px', color: '#fff', fontSize: '14px' }}>
          <Link to="/" style={navLinkStyle}>HOME</Link>
          <Link to="/create" style={navLinkStyle}>MENU</Link>
          <Link to="/login" style={navLinkStyle}>LOGIN</Link>
          <a href="#contact" style={{ color: '#fff', textDecoration: 'none' }}>CONTACT US</a>
        </nav>
      </header>

      {/* Form Section with background */}
      <div
        style={{
          backgroundImage: `url('/Rectangle116.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 20px',
          display: 'flex',
          justifyContent: 'center',
          fontFamily: 'Oswald, sans-serif',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            padding: '40px',
            borderRadius: '10px',
            width: '100%',
            maxWidth: '500px',
            color: '#fff',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '28px' }}>Create Menu</h2>

          {message && <p style={{ color: 'lightgreen', textAlign: 'center' }}>{message}</p>}
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Menu Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              style={inputStyle}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              required
              style={inputStyle}
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="Food">Food</option>
              <option value="Snack">Snack</option>
              <option value="Drink">Drink</option>
              <option value="Dessert">Dessert</option>
            </select>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#00AEEF',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '10px',
                fontSize: '16px',
              }}
            >
              Create Menu
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

// Shared styles
const inputStyle = {
  width: '100%',
  padding: '12px',
  margin: '10px 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const navLinkStyle = {
  color: '#00AEEF',
  fontWeight: 'bold',
  textDecoration: 'none',
};

export default CreateMenuForm;
