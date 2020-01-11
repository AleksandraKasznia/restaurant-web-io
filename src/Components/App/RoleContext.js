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
        console.log(role);
        localStorage.setItem("role", JSON.stringify(role));
    }, [role]);

    return (
        <RoleContext.Provider value={{role: role, dispatchRole: dispatchRole}}>
            {props.children}
        </RoleContext.Provider>
    );
}

export { RoleContext, RoleProvider };