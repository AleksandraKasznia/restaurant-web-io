import React from 'react';
import { Link } from 'react-router-dom';
import { SIGN_IN } from '../../constants/routes';
import Logo from '../../Icons/waiter.svg';
import './LandingPage.css';

const LandingPage = () => (
    <div className="landingPage">
        <img src={Logo}/>
        <h1> Restaurant-io </h1>
        <div className="loginButton">
            <Link to={SIGN_IN}>
                <button> Sign In </button>
            </Link>
        </div>
    </div>
);

export default LandingPage;