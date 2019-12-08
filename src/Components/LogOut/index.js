import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LANDING } from '../../constants/routes';

function LogOut() {
    return (
        <div className="logoutButton">
            <Link to={LANDING} >
                <button>
                    Log Out
                </button>
            </Link>
        </div>

    )
}

export default LogOut;