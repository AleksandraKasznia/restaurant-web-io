import React from 'react';
import { useHistory } from 'react-router-dom';
import { LANDING } from '../../constants/routes';
import {LOGOUT_URL} from '../../constants/apiEndpoints';

function LogOut() {
    let history = useHistory();

    let post = {
        method: 'POST',
        credentials: 'include',
        body: {}
    };

    function handleClick () {
        history.push(LANDING);
        fetch(LOGOUT_URL, post)
            .then(response => console.log(response));
    }

    return (
        <div className="logoutButton">
                <button onClick={handleClick}>
                    Log Out
                </button>
        </div>

    )
}

export default LogOut;