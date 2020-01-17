/*
 * Copyright 2020 Aleksandra Kasznia
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React, {useContext, useEffect, useState} from "react";
import Select from 'react-select';
import './Supplier.css';
import {SUPPLIER_ENDPOINT} from "../../constants/apiEndpoints";
import AdminNavBar from "../NavBars/AdminNavBar";
import UserNavBar from "../NavBars/UserNavBar";
import Footer from "../Footer";
import {RoleContext} from "../App/RoleContext";
import {useHistory} from 'react-router-dom';
import {SIGN_IN} from "../../constants/routes";

function SupplierPage(){
    let history = useHistory();
    const user = useContext(RoleContext);

    const restockProductURL = SUPPLIER_ENDPOINT + "/supply";
    const getAllProductsURL = SUPPLIER_ENDPOINT + "/products";

    const [productToRestockName, setProductToRestockName] = useState("");
    const [productToRestockAmount,setProductToRestockAmount] = useState(0);
    const [allProducts, setAllProducts] = useState([]);

    const options = allProducts.map((product) => ({value: product.name, label: product.name}));
    const productsToRestock= allProducts.filter((product) => product.productStatus === "LOW");
    const productsToRestockView = productsToRestock.map((item) => <tr key={item.name}><td>{item.name}</td><td>{item.amount}</td></tr>);

    useEffect(() => {
        const fetchAllProducts = async () => {
            fetch(getAllProductsURL, {method: 'GET', credentials: 'include'})
                .then(result => result.json())
                .then(data => setAllProducts(data))
                .catch(err => {
                    console.log(err);
                    alert("Can't load products, please contact your administrator or check the err message in the console");
                })
        };

        fetchAllProducts();

    },[]);

    const restockProductReq = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            name: productToRestockName,
            amount: productToRestockAmount
        })
    };

    return (
        <div>
            {user.role.role === "ROLE_SUPPLIER" || user.role.role === "ROLE_ADMIN" ?
            <div>
                {user.role.role === "ROLE_ADMIN" ? <AdminNavBar/>: <UserNavBar/>}
                <div className="supplier">
                    <form onSubmit={event => {
                        event.preventDefault();
                        fetch(restockProductURL, restockProductReq)
                            .then(response => {
                                if (response.status === 200){
                                }
                                else{
                                    alert("Something went wrong, please try again later")
                                }
                            })
                            .catch(() => alert("There was an unexpected error and the product has not been updated, if you keep seeing this please contact your administrator"))
                    }}>
                        <h3>Update supply</h3>
                        <label> Choose the product </label>
                        <Select options={options}
                                onChange={selectedItem => setProductToRestockName(selectedItem.value)}
                        />
                        <label> Amount of the bought product</label>
                        <input
                            type="number"
                            value={productToRestockAmount}
                            onChange={event => setProductToRestockAmount(event.target.value)}
                        />
                        <button type="submit"> Submit </button>
                    </form>
                    <div className="supplierDiv">
                        <h3>We're short on:</h3>
                        <div>
                            <table>
                                <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                </tr>
                                </thead>
                                <tbody>
                                {productsToRestockView}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>: (history.push(SIGN_IN))}
            <Footer/>
        </div>
    )
}

export default SupplierPage;