import React, {useState} from "react";
import './Order.css';


function Order (order) {
    const items = order.menuItems.map((item) => <li key={item}> {item} </li>);


    return (
    <div className="order">
        <div className="orderId">
            {order.orderId}
        </div>
        <div className="menuItems">
            {items}
        </div>
    </div>
    )
}

export default Order;