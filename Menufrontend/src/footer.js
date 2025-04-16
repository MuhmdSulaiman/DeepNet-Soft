import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#000', color: '#fff', fontFamily: 'Oswald, sans-serif' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '40px 20px',
          borderTop: '1px solid #222',
          flexWrap: 'wrap',
        }}
      >
        {/* Connect with us */}
        
        <div id="contact" style={{ padding: '60px 20px', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '28px', marginBottom: '20px' }}>Contact Us</h2>
          <p style={infoStyle}><FaPhoneAlt style={iconStyle} /> +91 9567843340</p>
          <p style={infoStyle}><FaEnvelope style={iconStyle} /> info@deepnetsoft.com</p>
        </div>

        <div style={boxStyle}>
          <img
            src="/Logo.png"
            alt="Deep Net Soft"
            style={{ height: '60px', marginBottom: '10px' }}
          />
          <h3 style={{ margin: '10px 0' }}>
            <span style={{ color: '#00AEEF' }}>DEEP</span> <span style={{ color: '#ccc' }}>NET SOFT</span>
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>

        {/* Find us */}
        <div style={boxStyle}>
          <h4 style={titleStyle}>FIND US</h4>
          <p style={infoStyle}><FaMapMarkerAlt style={iconStyle} /> First floor, Geo Infopark,<br /> Infopark EXPY, Kakkanad</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid #222',
          padding: '10px 20px',
          fontSize: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <span>© 2024 Deepnetsoft Solutions. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};

const boxStyle = {
  border: '1px solid #444',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
  maxWidth: '280px',
  margin: '10px',
};

const titleStyle = {
  color: '#00AEEF',
  marginBottom: '10px',
  fontWeight: 'bold',
};

const infoStyle = {
  margin: '6px 0',
  fontSize: '14px',
  lineHeight: '1.5',
};

const iconStyle = {
  marginRight: '8px',
  color: '#00AEEF',
};

export default Footer;
