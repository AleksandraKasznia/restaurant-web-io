import React, {createContext, useReducer} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import LandingPage from '../LandingPage';
import SignInPage from '../SignInPage';
import ManagerPage from '../ManagerPage';
import BarmanPage from '../BarmanPage';
import CookPage from "../CookPage";
import SupplierPage from "../SupplierPage";

import * as ROUTES from '../../constants/routes'

export const RoleContext = createContext("guest");


function App() {
    const roleReducer = (state, action) => {
        console.log("weszło")
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
                return state;
        }
    };
    const [role, dispatchRole] = useReducer(roleReducer, "guest");

        return (
            <RoleContext.Provider value={{role: role, dispatchRole: dispatchRole}}>
                <Router>
                        <Route exact path={ROUTES.LANDING} component={LandingPage} />
                        <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
                        <Route path={ROUTES.MANAGER} component={ManagerPage}/>
                        <Route path={ROUTES.BARMAN} component={BarmanPage}/>
                        <Route path={ROUTES.COOK} component={CookPage}/>
                        <Route path={ROUTES.SUPPLIER} component={SupplierPage}/>
                </Router>
            </RoleContext.Provider>
        );
}

export default App;