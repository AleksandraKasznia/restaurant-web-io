import React, {useContext, useEffect, useState} from 'react';
import './BarmanPage.css';
import Order from "../Order";
import {BARMAN_ENDPOINT} from "../../constants/apiEndpoints";
import {RoleContext} from "../App/RoleContext";
import {useHistory} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
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
            .then(result => result.json())
            .then(data => console.log(data))
    };

    const acceptOrder = (orderId) => {
        fetch(acceptOrderURL + '?orderId=' + orderId.toString(), {method: 'PATCH', credentials: 'include'})
            .then(result => result.json())
            .then(data => console.log(data))
    };



    const [orders, setOrders] = useState([]);


    function buttonValue(x) {return(x.barman) ? "Ready!": "Accept"}
    const [doNeedToReload, setDoNeedToReload] = useState(false);

    const fetchData = async () => {
        fetch(getOrdersURL,{method: 'GET', credentials: 'include'})
            .then(result => result.json())
            .then(data => {setOrders(data.map((item) => ({items: item.beverages, orderId: item.id, stage: item.stage, barman: item.bartender})));
                console.log(data)})
    };

    useEffect(() => {
        fetchData()
            .then(() => {console.log(orders)});
        console.log("jestem w fetchującym")

    }, []);


    const [awaitingOrders, setAwaitingOrders] = useState(null);
    const [ordersBeingPrepared, setOrdersBeingPrepared] = useState(null);

    useEffect(() => {
        console.log("jestem w ordersach");
        setAwaitingOrders( orders ? (orders.filter((order) => (order.stage === "IN_PROGRESS" || order.stage === "DISH_COMPLETE") && (order.barman === null)).map(order => (<div className="waitingOrders">
            <Order {...order}/>
            <button
                className={order.orderId}
                onClick={() => {
                    acceptOrder(order.orderId);
                    order.barman = 10;
                    setDoNeedToReload(!doNeedToReload);
                    console.log(orders, awaitingOrders, ordersBeingPrepared)}}
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
                    setDoNeedToReload(!doNeedToReload);
                    console.log(orders, awaitingOrders, ordersBeingPrepared)}}
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