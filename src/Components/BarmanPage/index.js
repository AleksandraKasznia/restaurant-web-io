import React, {useContext, useEffect, useState} from 'react';
import './BarmanPage.css';
import Order from "../Order";
import LogOut from "../LogOut";
import {BARMAN_ENDPOINT} from "../../constants/apiEndpoints";
import {RoleContext} from "../App";
import {useHistory} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AdminNavBar from "../AdminNavBar";

function BarmanPage() {

    let history = useHistory();
    const user = useContext(RoleContext);

    const getOrdersURL = BARMAN_ENDPOINT + '/getBeverageOrders';
    const acceptOrderURL = BARMAN_ENDPOINT  + '/changeState';

/*    useEffect(() => {
        console.log(user.role.role)
        if (user.role.role !== "ROLE_ADMIN" && user.role.role !== "ROLE_BARTENDER"){
            history.push(ROUTES.SIGN_IN);
        }
    },[user]);*/

    const [doNeedToReload, setDoNeedToReload] = useState(false);
    const [orders, setOrders] = useState([]);

    const fetchData = async () => {
        fetch(getOrdersURL,{method: 'GET', credentials: 'include'})
            .then(result => result.json())
            .then(data => {setOrders(data.map((item) => ({items: item.beverages, orderId: item.id, stage: item.stage})))
            console.log(data)})

    };

    useEffect(() => {
        fetchData()
            .then(() => {console.log(orders)});
    }, [doNeedToReload]);

    function buttonValue(x) {return(x.stage === "BARMAN_ACCEPTED") ? "Ready!": "Accept"}
    const [awaitingOrders, setAwaitingOrders] = useState(null);

    const [ordersBeingPrepared, setOrdersBeingPrepared] = useState(null);


    useEffect(() => {

        setAwaitingOrders( orders ? (orders.filter((order) => order.stage === "IN_PROGRESS" || order.stage === "COOK_ACCEPTED" || order.stage === "DISH_COMPLETE")).map(order => (<div className="order">{console.log(order)}
        <Order {...order}/>
            <button
                className={order.orderId}
                onClick={() => {
                    console.log(order.stage);
                    order.stage = "BARMAN_ACCEPTED";
                    console.log(order.stage);
                    setDoNeedToReload(!doNeedToReload);
                    console.log(orders, awaitingOrders, ordersBeingPrepared)}}
            >{buttonValue(order)}</button>
        </div>)) : null);



        setOrdersBeingPrepared()
        /*setOrdersBeingPrepared(orders ? (orders.filter((order) => order.stage === "BARTENDER_ACCEPTED")).map((item) => <div className="order"><Order {...item.beverages}/><button className={item.orderId}>{buttonValue(item)}</button></div>) : null);
    */},[doNeedToReload, orders]);


    return (
        <div>
{/*            {user.role.role === "ROLE_BARTENDER" || user.role.role === "ROLE_ADMIN" ?*/}
                <div>
                    {user.role.role === "ROLE_ADMIN" ? <AdminNavBar/>: null}
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
                </div>{/*:*/}
{/*                alert("You don't have permissions to reach this page")*/}
            }

        </div>
    )
}

export default BarmanPage;