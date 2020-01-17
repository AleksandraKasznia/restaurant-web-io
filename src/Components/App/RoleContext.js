/*
 * Copyright 2020 Aleksandra Kasznia
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React, {createContext, useEffect, useReducer} from "react";

const roleReducer = (role, action) => {
    console.log("weszło");
    switch (action.type) {
        case 'loginUser':
            return {
                role: action.role
            };
        case 'logoutUser':
            return  {
                role: "guest"
            };
        default:
            return role;
    }
};

const initialState = {role: "guest", dispatchRole: null};

const localState = JSON.parse(localStorage.getItem("role"));
const RoleContext = createContext();

function RoleProvider(props) {
    const [role, dispatchRole] = useReducer(roleReducer, localState || initialState);

    useEffect(() => {
        localStorage.setItem("role", JSON.stringify(role));
    }, [role]);

    return (
        <RoleContext.Provider value={{role: role, dispatchRole: dispatchRole}}>
            {props.children}
        </RoleContext.Provider>
    );
}

export { RoleContext, RoleProvider };