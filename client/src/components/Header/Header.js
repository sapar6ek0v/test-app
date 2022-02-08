import React from 'react';
import {useNavigate} from "react-router-dom";
import './Header.css'

const Header = () => {
    const navigate = useNavigate()

    const goHome = () => {
      navigate('/')
    }

    return (
        <header className='container py-3 mb-5'>
            <button onClick={goHome} className='header-btn'>Home</button>
        </header>
    );
};

export default Header;