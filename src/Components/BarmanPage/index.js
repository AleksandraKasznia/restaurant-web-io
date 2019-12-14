import React, {useEffect, useState} from 'react';
import './BarmanPage.css';
import Order from "../Order";
import LogOut from "../LogOut";
import {BARMAN_ENDPOINT} from "../../constants/apiEndpoints";

function BarmanPage() {

    function buttonValue(x) {return(x.isBeingPrepared) ? "Ready!": "Accept"}
    const [orders, setOrders] = useState([]);
    const [awaitingOrders, setAwaitingOrders] = useState(orders ? (orders.filter((order) => !order.isBeingPrepared)).map((item) => <div className="order"><Order {...item}/><button className={item.orderId}>{buttonValue(item)}</button></div>) : null);
    const [ordersBeingPrepared, setOrdersBeingPrepared] = useState(orders ? (orders.filter((order) => order.isBeingPrepared)).map((item) => <div className="order"><Order {...item}/><button className={item.orderId}>{buttonValue(item)}</button></div>) : null);

    const getOrdersURL = BARMAN_ENDPOINT + '/getBeverageOrders';

    useEffect(() => {
        const fetchData = async () => {
            const result = fetch(getOrdersURL,{method: 'GET', credentials: 'include'});
            setOrders(result.data);
            console.log(orders);
        };

        fetchData();
    }, []);

    return (
        <div>
            <LogOut/>
            <button> Refresh </button>
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