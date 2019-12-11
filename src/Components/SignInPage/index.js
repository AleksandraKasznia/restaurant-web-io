import React, { useState } from 'react';
import { LOGIN_URL } from '../../constants/apiEndpoints'
import './SignInPage.css';
import Logo from '../../Icons/waiter.svg';

function SignInPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const credentials = {
        "username": username,
        "password": password,
        "returnSecureToken" : true
    };

    var post = {
        method: 'POST',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'Accept-Encoding': 'gzip, deflate, br',
'Accept-Language': 'pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7',
'Cache-Control': 'max-age=0',
'Connection': 'keep-alive',
'Content-Length': '32',
'Content-Type': 'application/x-www-form-urlencoded',
'Cookie': 'JSESSIONID=E472A575A1533AAD7A9B115B6C0BDFC1',
'Host': 'localhost:8080',
'Origin': 'http://localhost:8080',
'Referer': 'http://localhost:8080/login',
'Sec-Fetch-Mode': 'navigate',
'Sec-Fetch-Site': 'same-origin',
'Sec-Fetch-User': '?1',
'Upgrade-Insecure-Requests': '1',
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
        },
        body: JSON.stringify(credentials)
    };

    return (
      <div className="signInPage">
          <img src={Logo} />
          <form
            onSubmit={event => {
                event.preventDefault();
                console.log(JSON.stringify(credentials));
                fetch(LOGIN_URL, post)
                    .then(function(response) {
                        console.log(response)
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