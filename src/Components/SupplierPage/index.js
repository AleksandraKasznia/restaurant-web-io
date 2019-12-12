import React, {useState} from "react";
import Select from 'react-select';

function SupplierPage(){

    const [amount,setAmount] = useState(0);

    const products = ["jabłko", "pomidor"];

    const options = products.map((product) => ({value: product, label: product}));

    const productsToRestock= [{name: "pomidor", quantity: 30}, {}];

    const productsToRestockView = productsToRestock.map((item) => <li key={item.name}> {item.name} {item.quantity} </li>);

    return (
        <div>
            <form>
                <h3>Update supply</h3>
                <label> Choose the product </label>
                <Select options={options}/>
                <label> Amount of the bought product</label>
                <input
                    type="number"
                    value={amount}
                    onChange={event => setAmount(event.target.value)}
                />
            </form>
            <div>
                <h3>We're short on:</h3>
                <div>
                    <div>name quantity</div>
                    {productsToRestockView}
                </div>
            </div>
        </div>
    )
}

export default SupplierPage;