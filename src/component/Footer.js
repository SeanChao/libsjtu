import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <div
    style={{
      marginTop: '40px',
      marginBottom: '40px',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    }}
  >
    <ul className="footer footer-li" style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center', marginBottom: '8px', fontSize: '12px', color: '#586069' }}>
      <li>
        <Link to="/about">关于</Link>
      </li>
      <li>
        <a href="https://github.com/SeanChao/libsjtu">参与</a>
      </li>
    </ul>
  </div>
);

export default Footer;
