import React, { useState } from 'react';
import './BarmanPage.css';

import LogOut from "../LogOut";

function BarmanPage() {
    return (
        <div>
            <LogOut/>
            <div className="barmanPage">

                <div>
                    <h1>Awaiting Orders</h1>
                </div>
                <div>
                    <h1>Your Orders</h1>
                </div>
            </div>
        </div>
    )
}

export default BarmanPage;