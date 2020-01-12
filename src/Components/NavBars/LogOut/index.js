import React from 'react';
import {LANDING} from '../../../constants/routes';
import {LOGOUT_URL} from '../../../constants/apiEndpoints';
import {Link} from "react-router-dom";

function LogOut() {
    let post = {
        method: 'POST',
        credentials: 'include',
    };

    function handleClick () {
        fetch(LOGOUT_URL, post)
            .catch(err => {
                console.log(err);
                alert("Something went wrong" + err);
            })
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