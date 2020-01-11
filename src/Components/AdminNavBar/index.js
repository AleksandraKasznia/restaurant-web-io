import React, {useContext} from "react";
import {Link} from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import {RoleContext} from "../App";


function AdminNavBar () {
    const user = useContext(RoleContext);

    return (
        <div>
            <Link to={ROUTES.MANAGER}> Manager Panel </Link>
            <Link to={ROUTES.COOK}> Cook Panel </Link>
            <Link to={ROUTES.BARMAN}> Barman Panel </Link>
            <Link to={ROUTES.SUPPLIER}> Supplier Panel </Link>
        </div>
    )
}

export default AdminNavBar