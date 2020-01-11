import React, {useContext} from "react";
import './Order.css';


function Order (order) {

    const items = order.items.map((item) => <li key={item.id}> {item.name} </li>);

    return (
    <div className="order">
        {console.log(order[0])}
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