import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import LandingPage from '../LandingPage';
import SignInPage from '../SignInPage';
import ManagerPage from '../ManagerPage';
import BarmanPage from '../BarmanPage';
import CookPage from "../CookPage";
import SupplierPage from "../SupplierPage";

import * as ROUTES from '../../constants/routes'


function App() {

        return (
            <Router>
                    <Route exact path={ROUTES.LANDING} component={LandingPage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
                    <Route path={ROUTES.MANAGER} component={ManagerPage}/>
                    <Route path={ROUTES.BARMAN} component={BarmanPage}/>
                    <Route path={ROUTES.COOK} component={CookPage}/>
                    <Route path={ROUTES.SUPPLIER} component={SupplierPage}/>
            </Router>
        );
}

export default App;