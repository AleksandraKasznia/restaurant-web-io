import React, {useContext} from "react";
import './Order.css';


function Order (order) {

    const items = order.items.map((item) => <li key={item.name}> {item.name} </li>);

    return (
    <div className="singleOrder">
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