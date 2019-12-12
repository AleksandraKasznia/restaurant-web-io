import React, { useState } from 'react';
import { LOGIN_URL } from '../../constants/apiEndpoints'
import './SignInPage.css';
import Logo from '../../Icons/waiter.svg';

function SignInPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const credentials = 'username='+ username + '&password='+ password;

    var post = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: credentials
    };

    return (
      <div className="signInPage">
          <img src={Logo} />
          <form
            onSubmit={event => {
                event.preventDefault();
                console.log(credentials, username, password);
                fetch(LOGIN_URL, post)
                    .then(function(response) {
                        console.log(response.data)
                    })

            }}>
              <label>
                  Username or email:
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
    );
}

export default SignInPage;