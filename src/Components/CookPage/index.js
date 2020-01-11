import React, {useContext, useEffect, useState} from 'react';
import './CookPage.css';
import Order from "../Order";

import LogOut from "../LogOut";
import AdminNavBar from "../AdminNavBar";
import {RoleContext} from "../App";
import {useHistory} from 'react-router-dom';
import * as ROUTES from "../../constants/routes";

function CookPage() {
    let history = useHistory();
    const user = useContext(RoleContext);

    useEffect(() => {
        console.log(user.role.role)
        if (user.role.role !== "ROLE_ADMIN" && user.role.role !== "ROLE_COOK"){
            history.push(ROUTES.SIGN_IN);
        }
    },[user]);

    const order = {
        orderId: "123",
        menuItems: ["baked sausage", "whipped cream"],
        isBeingPrepared: true
    };

    const order1 = {
        orderId: "12331",
        menuItems: ["sausage", "tomato soup"],
        isBeingPrepared: false
    };

    const order3 = {
        orderId: "11423",
        menuItems: ["whipped cream"],
        isBeingPrepared: false
    };

    function buttonValue(x) {return(x.isBeingPrepared) ? "Ready!": "Accept"}
    const [orders, setOrders] = useState([order, order1, order3]);
    const [awaitingOrders, setAwaitingOrders] = useState((orders.filter((order) => !order.isBeingPrepared)).map((item) => <div className="order"><Order {...item}/><button className={item.orderId}>{buttonValue(item)}</button></div>));
    const [ordersBeingPrepared, setOrdersBeingPrepared] = useState((orders.filter((order) => order.isBeingPrepared)).map((item) => <div className="order"><Order {...item}/><button className={item.orderId}>{buttonValue(item)}</button></div>));

    return (
        <div>
            {user.role.role === "ROLE_COOK" || user.role.role === "ROLE_ADMIN" ?
                <div>
                    {user.role.role === "ROLE_ADMIN" ? <AdminNavBar/>: null}
                    <LogOut/>
                    <button> Refresh </button>
                    <div className="cookPage">

                        <div>
                            <h1>Awaiting Orders</h1>
                            <div className="ordersPanel">
                                {awaitingOrders}
                            </div>
                        </div>
                        <div>
                            <h1>Your Orders</h1>
                            <div className="ordersPanel">
                                {ordersBeingPrepared}
                            </div>
                        </div>
                    </div>
                </div>:
                alert("You don't have permissions to reach this page")}
        </div>
    )
}

export default CookPage;