import React, {useContext, useEffect, useState} from 'react';
import { LOGIN_URL } from '../../constants/apiEndpoints'
import './SignInPage.css';
import Logo from '../../Icons/waiter.svg';
import {useHistory} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {RoleContext} from "../App/RoleContext";
import Footer from "../Footer";

function SignInPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    let history = useHistory();

    const credentials = 'username='+ username + '&password='+ password;

    var post = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
        body: credentials
    };

    const user = useContext(RoleContext);

    useEffect(() => {
        if (role !== ""){
            user.dispatchRole({type: 'loginUser', role: role});
            console.log(role)
            switch (role) {
                case "ROLE_BARTENDER":
                    history.push(ROUTES.BARMAN);
                    break;
                case "ROLE_ADMIN":
                    history.push(ROUTES.MANAGER);
                    break;
                case "ROLE_MANAGER":
                    history.push(ROUTES.MANAGER);
                    break;
                case "ROLE_SUPPLIER":
                    history.push(ROUTES.SUPPLIER);
                    break;
                case "ROLE_COOK":
                    history.push(ROUTES.COOK);
                    break;
                default:
                    alert("Unable to authenticate user, please contact your administrator")
                    break;
            }
        }
    },[role]);

    return (
        <div>
            <div className="signInPage">
                <img src={Logo} />
                <form
                    onSubmit={event => {
                        event.preventDefault();
                        fetch(LOGIN_URL, post)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                let rolesObject = data.map(role => role.authority);
                                console.log(rolesObject);
                                if (rolesObject.includes("ROLE_ADMIN")){
                                    setRole("ROLE_ADMIN");
                                }
                                else{
                                    setRole(rolesObject[0]);
                                }
                            })
                    }}>
                    <label>
                        Username:
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                    <label>
                        Password:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <button>
                        Log In
                    </button>
                </form>
            </div>
            <Footer/>
        </div>

    );
}

export default SignInPage;