import React, {useContext, useEffect, useState} from 'react';
import './CookPage.css';
import Order from "../Order";

import LogOut from "../LogOut";
import AdminNavBar from "../AdminNavBar";
import {RoleContext} from "../App/RoleContext";
import {useHistory} from 'react-router-dom';
import * as ROUTES from "../../constants/routes";
import {SIGN_IN} from "../../constants/routes";
import {COOK_ENDPOINT} from "../../constants/apiEndpoints";

function CookPage() {
    let history = useHistory();
    const user = useContext(RoleContext);

    const getOrdersURL = COOK_ENDPOINT + '/getDishOrders';
    const finalizeOrderURL = COOK_ENDPOINT  + '/changeState';
    const acceptOrderURL = COOK_ENDPOINT + '/assign';

    const finalizeOrder = (orderId) => {
        fetch(finalizeOrderURL + "?orderId=" + orderId.toString(), {method: 'PATCH', credentials: 'include'})
            .then(result => result.json())
            .then(data => console.log(data))
    };

    const acceptOrder = (orderId) => {
        fetch(acceptOrderURL + '?orderId=' + orderId.toString(), {method: 'PATCH', credentials: 'include'})
            .then(result => result.json())
            .then(data => console.log(data))
    };


    const [orders, setOrders] = useState([]);

    function buttonValue(x) {return(x.chef) ? "Ready!": "Accept"}

    const [doNeedToReload, setDoNeedToReload] = useState(false);

    const fetchData = async () => {
        fetch(getOrdersURL,{method: 'GET', credentials: 'include'})
            .then(result => result.json())
            .then(data => {setOrders(data.map((item) => ({items: item.dishes, orderId: item.id, stage: item.stage, chef: item.chef})));
                console.log(data)})
    };

    useEffect(() => {
        fetchData()
            .then(() => {console.log(orders)})

    }, []);


    const [awaitingOrders, setAwaitingOrders] = useState(null);
    const [ordersBeingPrepared, setOrdersBeingPrepared] = useState(null);

    useEffect(() => {
        console.log("jestem w ordersach");
        setAwaitingOrders( orders ? (orders.filter((order) => (order.stage === "IN_PROGRESS" || order.stage === "BEVERAGE_COMPLETE") && (order.chef === null)).map(order => (<div className="order">
            <Order {...order}/>
            {console.log(order.stage)}
            <button
                className={order.orderId}
                onClick={() => {
                    acceptOrder(order.orderId);
                    order.chef = 10;
                    setDoNeedToReload(!doNeedToReload);
                    console.log(orders, awaitingOrders, ordersBeingPrepared)}}
            >{buttonValue(order)}</button>
        </div>))) : null);

        setOrdersBeingPrepared(orders ? (orders.filter((order) => order.chef !== null)).map(order => (<div className="order">
            <Order {...order}/>
            {console.log(order.chef)}
            <button
                className={order.orderId}
                onClick={() => {
                    finalizeOrder(order.orderId);
                    order.chef = null;
                    order.stage = "FINISHED";
                    setDoNeedToReload(!doNeedToReload);
                    console.log(orders, awaitingOrders, ordersBeingPrepared)}}
            >{buttonValue(order)}</button>
        </div>)) : null)
    },[orders, doNeedToReload]);
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
                (history.push(SIGN_IN))}
        </div>
    )
}

export default CookPage;