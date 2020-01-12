import React from "react";
import {Link} from "react-router-dom";
import * as ROUTES from '../../../constants/routes';
import './AdminNavBar.css';
import LogOut from "../LogOut";

function AdminNavBar () {

    return (
        <div className="AdminNavBar">
            <LogOut/>
            <Link to={ROUTES.MANAGER}> Manager Panel </Link>
            <Link to={ROUTES.COOK}> Cook Panel </Link>
            <Link to={ROUTES.BARMAN}> Barman Panel </Link>
            <Link to={ROUTES.SUPPLIER}> Supplier Panel </Link>
        </div>
    )
}

export default AdminNavBar