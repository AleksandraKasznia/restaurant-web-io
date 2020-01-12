import React from 'react';
import { Link } from 'react-router-dom';
import { SIGN_IN } from '../../constants/routes';
import Logo from '../../Icons/waiter.svg';
import './LandingPage.css';
import Footer from "../Footer";

const LandingPage = () => (
    <div>
        <div className="landingPage">
            <img src={Logo} alt="logo"/>
            <h1> Restaurant-io </h1>
            <div className="loginButton">
                <Link to={SIGN_IN}>
                    <button> Log in </button>
                </Link>
            </div>
        </div>
        <Footer/>
    </div>
);

export default LandingPage;