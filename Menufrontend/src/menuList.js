import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Footer from './footer';

const ViewMenu = () => {
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/menus/viewmenu`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMenus(response.data);
        setFilteredMenus(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch menus');
      }
    };
    fetchMenus();
  }, []);

  useEffect(() => {
    let results = menus;
    if (searchTerm) {
      results = results.filter(menu =>
        menu.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (categoryFilter) {
      results = results.filter(menu =>
        (menu.category || '').toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    setFilteredMenus(results);
  }, [searchTerm, categoryFilter, menus]);

  const handleItemClick = (id) => navigate(`/find/${id}`);
  const handleCategoryClick = (category) =>
    setCategoryFilter(prev => (prev === category ? '' : category));

  const categories = ['Food', 'Snack', 'Drink', 'Dessert'];

  return (
    <>
      {/* Header */}
      <header style={{
        backgroundColor: '#121618',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 5%',
        height: '100px',
        fontFamily: 'Oswald, sans-serif',
        flexWrap: 'wrap',
        position: 'relative',
        width: '100%',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            backgroundImage: `url('./logo.png')`,
            width: '50px',
            height: '60px',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '20px', color: '#00AEEF', fontWeight: '600' }}>
              DEEP <span style={{ color: '#fff' }}>NET</span>
            </div>
            <div style={{ fontSize: '16px', color: '#857878' }}>SOFT</div>
          </div>
          <div >
           {/* Navigation Buttons Section (Right side) */}
  <div style={{ display: 'flex', gap: '20px', position:'absolute',left:'800px' }}>
  <Link to="/" style={{ color: '#00AEEF', fontWeight: 'bold', textDecoration: 'none' }}>HOME</Link>
<Link to="/create" style={{ color: '#00AEEF', fontWeight: 'bold', textDecoration: 'none' }}>MENU</Link>
<Link to="/login" style={{ color: '#00AEEF', fontWeight: 'bold', textDecoration: 'none' }}>LOGIN</Link>
<Link to="/signup" style={{ color: '#00AEEF', fontWeight: 'bold', textDecoration: 'none' }}>SIGNUP</Link>

    <a href="#contact" style={{ cursor: 'pointer', color: '#fff', textDecoration: 'none' }}>CONTACT US</a>
  </div>
         </div> 
        </div>

        {/* Mobile Nav Toggle */}
        <div
          className="mobile-nav-toggle"
          style={{
            display: 'block',
            color: '#fff',
            fontSize: '28px',
            cursor: 'pointer',
          }}
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FaBars />
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav style={{
            backgroundColor: '#121618',
            color: '#fff',
            padding: '10px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            position: 'absolute',
            top: '100px',
            left: 0,
            width: '100%',
            zIndex: 1000,
          }}>
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#00AEEF' }}>HOME</span>
            <Link to="/create" style={{ color: '#00AEEF', fontWeight: 'bold', textDecoration: 'none' }}>MENU</Link>
            <Link to="/login" style={{ color: '#00AEEF', fontWeight: 'bold', textDecoration: 'none' }}>LOGIN</Link>
            <Link to="/signup" style={{ color: '#00AEEF', fontWeight: 'bold', textDecoration: 'none' }}>SIGNUP</Link>
            <a href="#contact" style={{ cursor: 'pointer', color: '#fff', textDecoration: 'none' }}>CONTACT US</a>
          </nav>
        )}
      </header>

      {/* Banner */}
      <div style={{
        backgroundImage: "url('/first.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        color: 'white',
        padding: '40px 20px',
      }}>
        <img src="./MENU.png" alt="MENU" style={{ maxWidth: '100%' }} />
        <p style={{
          fontFamily: 'Kelly Slab',
          fontWeight: '400',
          fontSize: '18px',
          marginTop: '20px'
        }}>
          Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the "Order Online" button located below the menu.
        </p>
      </div>

      {/* Category Buttons */}
      <div style={{
        backgroundImage: `url('./Rectangle107.png')`,
        width: '100%',
        padding: '20px 10px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '10px',
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            style={{
              padding: '8px 16px',
              backgroundColor: categoryFilter === cat ? '#007bff' : '#f0f0f0',
              color: categoryFilter === cat ? '#fff' : '#000',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Items Section */}
      <div style={{
        backgroundImage: `url('/Rectangle116.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: '60px 20px',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1140px',
          border: '1px solid #fff',
          padding: '40px 20px',
          boxSizing: 'border-box',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
          }}>
            <div style={{ flex: 1, height: '2px', backgroundColor: '#fff', marginRight: '15px' }} />
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#fff',
              textShadow: '2px 2px 0 #D70026',
            }}>TODAY'S MENU</h2>
            <div style={{ flex: 1, height: '2px', backgroundColor: '#fff', marginLeft: '15px' }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            color: '#ffffff',
          }}>
            {filteredMenus.length === 0 && !error ? (
              <p style={{ textAlign: 'center' }}>No menus found for this category.</p>
            ) : (
              filteredMenus.map((menu) => (
                <div key={menu._id} onClick={() => handleItemClick(menu._id)} style={{ cursor: 'pointer' }}>
                  <div style={{
                    fontFamily: 'Oswald, sans-serif',
                    color: '#fff',
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: '700',
                      fontSize: '18px',
                      borderBottom: '2px dotted #fff',
                      paddingBottom: '4px',
                    }}>
                      <span>{menu.name?.toUpperCase()}</span>
                      <span>${menu.price}</span>
                    </div>
                    <p style={{
                      fontSize: '14px',
                      marginTop: '4px',
                      color: '#aaa',
                      fontFamily: 'monospace'
                    }}>{menu.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Decorative Images */}
          <img src="/Frame.png" alt="Decorative Frame" style={{
            position: 'absolute',
            top: '518px',
            left: '-153px',
            width: '299px',
            height: '641px',
            zIndex: 0,
          }} />
          <img src="./left-drink.png" alt="cocktail-left" style={{
            position: 'absolute',
            top: '-60px',
            left: '-60px',
            width: '120px',
            zIndex: 0
          }} />
          <img src="./right-drink.png" alt="cocktail-right" style={{
            position: 'absolute',
            bottom: '-40px',
            right: '-60px',
            width: '120px',
            zIndex: 0
          }} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ViewMenu;
