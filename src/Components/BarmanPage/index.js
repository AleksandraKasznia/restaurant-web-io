/*
 * Copyright 2020 Aleksandra Kasznia
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React, {useContext, useEffect, useState} from 'react';
import './BarmanPage.css';
import Order from "../Order";
import {BARMAN_ENDPOINT} from "../../constants/apiEndpoints";
import {RoleContext} from "../App/RoleContext";
import {useHistory} from 'react-router-dom';
import AdminNavBar from "../NavBars/AdminNavBar";
import UserNavBar from "../NavBars/UserNavBar";
import Footer from "../Footer";
import {SIGN_IN} from "../../constants/routes";

function BarmanPage() {

    let history = useHistory();
    const user = useContext(RoleContext);

    const getOrdersURL = BARMAN_ENDPOINT + '/getBeverageOrders';
    const finalizeOrderURL = BARMAN_ENDPOINT  + '/changeState';
    const acceptOrderURL = BARMAN_ENDPOINT + '/assign';

    const finalizeOrder = (orderId) => {
        fetch(finalizeOrderURL + "?orderId=" + orderId.toString(), {method: 'PATCH', credentials: 'include'})
            .catch(err => {
                console.log(err);
            })
    };

    const acceptOrder = (orderId) => {
        fetch(acceptOrderURL + '?orderId=' + orderId.toString(), {method: 'PATCH', credentials: 'include'})
            .catch(err => {
                console.log(err);
            })
    };



    const [orders, setOrders] = useState([]);


    function buttonValue(x) {return(x.barman) ? "Ready!": "Accept"}
    const [doNeedToReload, setDoNeedToReload] = useState(false);

    const fetchData = async () => {
        fetch(getOrdersURL,{method: 'GET', credentials: 'include'})
            .then(result => result.json())
            .then(data => setOrders(data.map((item) => ({items: item.beverages, orderId: item.id, stage: item.stage, barman: item.bartender}))))
    };

    useEffect(() => {
        fetchData()
            .catch(err => {
                console.log(err);
                alert("Can't load resources, please refresh the page, if you keep seeing this error please contact your administrator");
            });
    }, []);


    const [awaitingOrders, setAwaitingOrders] = useState(null);
    const [ordersBeingPrepared, setOrdersBeingPrepared] = useState(null);

    useEffect(() => {
        setAwaitingOrders( orders ? (orders.filter((order) => (order.stage === "IN_PROGRESS" || order.stage === "DISH_COMPLETE") && (order.barman === null)).map(order => (<div className="waitingOrders">
            <Order {...order}/>
            <button
                className={order.orderId}
                onClick={() => {
                    acceptOrder(order.orderId);
                    order.barman = 10;
                    setDoNeedToReload(!doNeedToReload);}}
            >{buttonValue(order)}</button>
        </div>))) : null);

        setOrdersBeingPrepared(orders ? (orders.filter((order) => order.barman !== null)).map(order => (<div className="acceptedOrders">
            <Order {...order}/>
            <button
                className={order.orderId}
                onClick={() => {
                    finalizeOrder(order.orderId);
                    order.barman = null;
                    order.stage = "FINISHED";
                    setDoNeedToReload(!doNeedToReload);}}
            >{buttonValue(order)}</button>
        </div>)) : null)
    },[orders, doNeedToReload]);


    return (
        <div>
            {user.role.role === "ROLE_BARTENDER" || user.role.role === "ROLE_ADMIN" ?
                <div>
                    {user.role.role === "ROLE_ADMIN" ? <AdminNavBar/>: <UserNavBar/>}
                    <button className="refreshButton" onClick={() => fetchData()}> Refresh </button>
                    <div className="barmanPage">
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
                (history.push(SIGN_IN))
            }
            <Footer/>
        </div>
    )
}

export default BarmanPage;