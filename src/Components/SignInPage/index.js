import React, { useState } from 'react';

const API = "https://api1.www.3drepo.io/api/";
const LOGIN_URL = API + "login";

function SignInPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const credentials = {
        "username": username,
        "password": password
    };

    var post = {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Credentials': 'true',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Cookie': 'connect.sid=:sessionId'
        },
        credentials: 'include',
        mode: "cors",
        body: JSON.stringify(credentials)
    };

    return (
      <div>
          <form
            onSubmit={event => {
                event.preventDefault();
                console.log(credentials);
                fetch(LOGIN_URL, post)
                    .then(function(response) {
                        console.log(response)
                    })

            }}>
              <label>
                  Username or email:
                  <input
                      type="text"
                      value={username}
                      onChange={event => setUsername(event.target.value)}
                  />
              </label>
              <label>
                  Password:
                  <input
                      type="password"
                      value={password}
                      onChange={event => setPassword(event.target.value)}
                  />
              </label>
              <button type="submit">
                  Log In
              </button>
          </form>
      </div>
    );
}

export default SignInPage;