import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import checkAuth from './auth/checkAuth';

const ViewMenuDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
           `${process.env.REACT_APP_API_URL}/api/menus/viewmenu/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMenu(response.data);
      } catch (err) {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError('Failed to fetch menu item');
        }
      }
    };

    fetchMenu();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this menu item?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete( `${process.env.REACT_APP_API_URL}/api/menus/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Menu item deleted  successfully');
      navigate('/'); // Redirect back to menu list
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete menu item');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h2>Menu Details</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!menu && !error && <p>Loading...</p>}
      {menu && (
        <div>
          <h3>{menu.name}</h3>
          <p><strong>Description:</strong> {menu.description}</p>
          <p><strong>Category:</strong> {menu.category}</p>
          <p><strong>Price:</strong> ${menu.price}</p>

          <div style={{ marginTop: 20 }}>
            <button onClick={handleUpdate} style={{ marginRight: 10 }}>
              Update
            </button>
            <button onClick={handleDelete} style={{ backgroundColor: '#f44336', color: '#fff' }}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMenuDetail;
