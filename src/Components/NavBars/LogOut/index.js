import React from 'react';
import {LANDING} from '../../../constants/routes';
import {LOGOUT_URL} from '../../../constants/apiEndpoints';
import {Link} from "react-router-dom";

function LogOut() {
    let post = {
        method: 'POST',
        credentials: 'include',
        body: {}
    };

    function handleClick () {
        fetch(LOGOUT_URL, post)
            .then(response => console.log(response));
    }

    return (
        <div className="logoutButton">
                <Link to={LANDING} onClick={handleClick}>
                    Log Out
                </Link>
        </div>

    )
}

export default LogOut;