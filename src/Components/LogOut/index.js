import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LANDING } from '../../constants/routes';
import {LOGOUT_URL} from '../../constants/apiEndpoints';

function LogOut() {
    var post = {
        method: 'POST',
        credentials: 'include',
        body: {}
    };
    return (
        <div className="logoutButton">
            <Link to={LANDING} >
                <button onClick={event => {
                    fetch(LOGOUT_URL, post)
                        .then(response => console.log(response))
                }}>
                    Log Out
                </button>
            </Link>
        </div>

    )
}

export default LogOut;