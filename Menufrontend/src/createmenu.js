import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './footer'; // Make sure `footer.js` has `export default Footer`
import { useNavigate } from 'react-router-dom';

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
      const response = await axios.post('http://localhost:4000/api/menus/create',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('Menu created successfully!');
      setFormData({ name: '', description: '', price: '', category: 'Food' });

      // Optional: redirect after success
      // navigate('/view');
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
      {/* Navigation Header */}
      <div
        style={{
          width: '100%',
          height: '100px',
          backgroundColor: '#121618',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 5vw',
          fontFamily: 'Oswald, sans-serif',
          boxSizing: 'border-box',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              backgroundImage: `url('./logo.png')`,
              width: '68px',
              height: '76px',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1' }}>
            <div style={{ fontSize: '28px', color: '#00AEEF', fontWeight: '600' }}>
              DEEP <span style={{ color: '#fff' }}>NET</span>
            </div>
            <div style={{ fontSize: '22px', color: '#857878', marginTop: '4px' }}>SOFT</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#fff' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>HOME</Link>
          <Link to="/" style={{ color: '#00AEEF', fontWeight: 'bold', textDecoration: 'none' }}>MENU</Link>
          <Link to="/login" style={{ color: '#00AEEF', fontWeight: 'bold', textDecoration: 'none' }}>LOGIN</Link>
          <span style={{ cursor: 'pointer' }}>MAKE A RESERVATION</span>
          <span style={{ cursor: 'pointer' }}>CONTACT US</span>
        </div>
      </div>

      {/* Background Section */}
      <div
        style={{
          backgroundImage: `url('/Rectangle116.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 0',
          fontFamily: 'Oswald, sans-serif',
          display: 'flex',
          justifyContent: 'center',
          color: '#fff',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '40px',
            borderRadius: '10px',
            width: '500px',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Menu</h2>

          {message && <p style={{ color: 'lightgreen' }}>{message}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

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
                padding: '10px',
                backgroundColor: '#00AEEF',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '10px',
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

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

export default CreateMenuForm;
