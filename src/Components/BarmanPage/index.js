import React, {useEffect, useState} from 'react';
import './BarmanPage.css';
import Order from "../Order";
import LogOut from "../LogOut";
import {BARMAN_ENDPOINT} from "../../constants/apiEndpoints";

function BarmanPage() {

    const order1 = {
        orderId: 1,
        menuItems: ["water sparkly", "mohito"],
        isBeingPrepared: false
    };
    const order2 = {
        orderId: 2,
        menuItems: ["red wine"],
        isBeingPrepared: true
    };
    const order3 = {
        orderId: 3,
        menuItems: ["orange juice", "lemonade", "beer"],
        isBeingPrepared: false
    };

    const [doNeedToReload, setDoNeedToReload] = useState(false);

    function buttonValue(x) {return(x.isBeingPrepared) ? "Ready!": "Accept"}
    const [orders, setOrders] = useState([order1, order2, order3]);
    const [awaitingOrders, setAwaitingOrders] = useState(orders ? (orders.filter((order) => !order.isBeingPrepared)).map((item) => <div className="order"><Order {...item}/><button
        className={item.orderId}
        onClick={() => {item.isBeingPrepared = true;
        setDoNeedToReload(!doNeedToReload);
        console.log(orders, awaitingOrders, ordersBeingPrepared)}}
    >{buttonValue(item)}</button></div>) : null);
    const [ordersBeingPrepared, setOrdersBeingPrepared] = useState(orders ? (orders.filter((order) => order.isBeingPrepared)).map((item) => <div className="order"><Order {...item}/><button
        className={item.orderId}
    >{buttonValue(item)}</button></div>) : null);

    const getOrdersURL = BARMAN_ENDPOINT + '/getBeverageOrders';

    const fetchData = async () => {
        const result = fetch(getOrdersURL,{method: 'GET', credentials: 'include'});
        setOrders(result.data);
        console.log(orders);
    };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    useEffect(() => {
        setAwaitingOrders(orders ? (orders.filter((order) => !order.isBeingPrepared)).map((item) => <div className="order"><Order {...item}/><button
            className={item.orderId}
            onClick={() => {item.isBeingPrepared = true;
                setDoNeedToReload(!doNeedToReload);
                console.log(orders, awaitingOrders, ordersBeingPrepared)}}
        >{buttonValue(item)}</button></div>) : null);
        setOrdersBeingPrepared(orders ? (orders.filter((order) => order.isBeingPrepared)).map((item) => <div className="order"><Order {...item}/><button className={item.orderId}>{buttonValue(item)}</button></div>) : null);
    },[doNeedToReload]);

    return (
        <div>
            <LogOut/>
            <button onClick={() => fetchData()}> Refresh </button>
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
        </div>
    )
}

export default BarmanPage;