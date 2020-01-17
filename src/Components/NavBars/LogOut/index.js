/*
 * Copyright 2020 Aleksandra Kasznia
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

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