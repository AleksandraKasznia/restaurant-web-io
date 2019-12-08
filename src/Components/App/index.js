import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPage from '../LandingPage';
import SignInPage from '../SignInPage';
import ManagerPage from '../ManagerPage';
import BarmanPage from '../BarmanPage';

import * as ROUTES from '../../constants/routes'


function App() {

        return (
            <Router>
                    <Route exact path={ROUTES.LANDING} component={LandingPage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
                    <Route path={ROUTES.MANAGER} component={ManagerPage}/>
                <Route path={ROUTES.BARMAN} component={BarmanPage}/>
            </Router>
        );
}

export default App;