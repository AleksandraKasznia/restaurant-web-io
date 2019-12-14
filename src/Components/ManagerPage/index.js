import React, {useEffect, useState} from 'react';
import './ManagerPage.css';
import {Link} from "react-router-dom";
import {LANDING} from "../../constants/routes";
import LogOut from "../LogOut";
import Select from "react-select";
import {MANAGER_ENDPOINT} from "../../constants/apiEndpoints";

const getAllProductsURL = MANAGER_ENDPOINT + '/products';
const addUserURL = MANAGER_ENDPOINT + '/signup';
const deleteUserURL = MANAGER_ENDPOINT + '/deleteUser/';
const addMenuItemURL = MANAGER_ENDPOINT + '/addMenuItem';
const addTableURL = MANAGER_ENDPOINT + "/addTable";

function ManagerPage() {

    const [usernameToAdd, setUsernameToAdd] = useState("");
    const [emailToAdd, setEmailToAdd] = useState("");
    const [usernameToUpdate, setUsernameToUpdate] = useState("");
    const [emailToUpdate, setEmailToUpdate] = useState("");
    const [passwordToAdd, setPasswordToAdd] = useState("");
    const [userIdToDelete, setUserIdToDelete] = useState("");
    const [userIdToUpdate, setUserIdToUpdate] = useState("");
    const [roleToUpdate, setRoleToUpdate] = useState([]);
    const [roleToAdd, setRoleToAdd] = useState([]);
    const [itemNameToAdd, setItemNameToAdd] = useState("");
    const [isDishOrDrinkToAdd, setIsDishOrDrinkToAdd] = useState("");
    const [neededProductsToAdd, setNeededProductsToAdd] = useState(null);
    const [priceToAdd, setPriceToAdd] = useState(0.0);
    const [numberOfTables, setNumberOfTables] = useState(1);
    const [allProducts, setAllProducts] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const newUser = {
        username: usernameToAdd,
        password: passwordToAdd,
        authorities: roleToAdd,
        email: emailToAdd,
        displayName: null
    };

    useEffect(() => {
        const fetchData = async () => {
            fetch(getAllProductsURL,{method: 'GET', credentials: 'include'})
                .then(result => result.json())
                .then(data => setAllProducts(data));
        };

        fetchData();
    }, []);

    const possibleRoles = ["Waiter", "Barman", "Cook", "Supplier", "Manager"];
    const rolesOptions = possibleRoles.map((role) => ({value: role.toUpperCase(), label: role}));
    const dishOrDrinkOptions = [{value: "DISH", label: "dish"},{value: "DRINK", label: "drink"}];
    const allProductsOptions = allProducts.map((product) => ({value: product.name, label: product.name}));
    const allUsersOptions = allUsers.map((user) => ({value: user.id, label: user.username}));

    const addUserReq = {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newUser)
    };
    const deleteUserReq = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',
        },
        credentials: 'include',
    };
    const addMenuItemReq = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            name: itemNameToAdd,
            foodType: isDishOrDrinkToAdd,
            price: priceToAdd,
            itemsNeededNames: neededProductsToAdd,
        })
    };
    const addTableReq = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
        })
    };

    return (
        <div className="managerPager">
            <LogOut/>
            <section>
                <h1>Employees</h1>
                <div className="formsSection">
                    <form className="addEmployeeForm" onSubmit={event => {
                        event.preventDefault();
                        fetch(addUserURL, addUserReq)
                            .then(response => console.log(response))
                    }}>
                        <div className="header">
                        <h3>Add User</h3>
                        </div>
                        <label>
                            <div className="description">
                                Choose role:
                            </div>
                            <Select
                                options={rolesOptions}
                                onChange={selectedItem => setRoleToAdd(selectedItem.value)}
                            />
                        </label>
                        <label>
                            <div className="description">
                                Full name:
                            </div>
                            <input
                                type="text"
                                value={usernameToAdd}
                                onChange={event => setUsernameToAdd(event.target.value)}
                            />
                        </label>

                        <label>
                            <div className="description">
                                Email:
                            </div>

                            <input
                                type="text"
                                value={emailToAdd}
                                onChange={event => setEmailToAdd(event.target.value)}
                            />
                        </label>

                        <label>
                            <div className="description">
                                Password:
                            </div>

                            <input
                                type="password"
                                value={passwordToAdd}
                                onChange={event => setPasswordToAdd(event.target.value)}
                            />
                        </label>

                        <button type="submit">
                            Add
                        </button>
                    </form>
                    <form onSubmit={event => {
                        event.preventDefault();
                        fetch(deleteUserURL + '{' + userIdToDelete + '}',deleteUserReq)
                            .then(result => console.log(result));
                    }}>
                        <h3>Delete User</h3>
                        <label>
                            <div className="description">
                                id:
                            </div>
                            <input
                                type="text"
                                value={userIdToDelete}
                                onChange={event => setUserIdToDelete(event.target.value)}
                            />
                        </label>

                        <button type="submit">
                            Delete
                        </button>
                    </form>
                    <form /*onSubmit={this.updateUser}*/>
                        <h3>Update User</h3>
                        <label>
                            <div className="description">
                                id:
                            </div>
                            <input
                                type="text"
                                value={userIdToDelete}
                                onChange={event => setUserIdToDelete(event.target.value)}
                            />
                        </label>

                        <label>
                            <div className="description">
                                Choose role:
                            </div>
                            <select>
                                <option value="waiter">Waiter</option>
                                <option value="barman">Barman</option>
                                <option value="cook">Cook</option>
                                <option value="supplier">Supplier</option>
                                <option value="manager">Manager</option>
                            </select>
                        </label>

                        <label>
                            <div className="description">
                                Full name:
                            </div>
                            <input
                                type="text"
                                value={usernameToAdd}
                                onChange={event => setUsernameToAdd(event.target.value)}
                            />
                        </label>

                        <label>
                            <div className="description">
                                Email:
                            </div>
                            <input
                                type="text"
                                value={emailToAdd}
                                onChange={event => setEmailToAdd(event.target.value)}
                            />
                        </label>

                        <button type="submit">
                            Update
                        </button>
                    </form>
                </div>
            </section>

            <section>
                <h1>Menu Items and Tables</h1>
                <div className="formsSection">
                    <form onSubmit={event => {
                        event.preventDefault();
                        console.log(neededProductsToAdd);
                        fetch(addMenuItemURL, addMenuItemReq)
                            .then(response => console.log(response))
                    }}>
                        <h3>Add Menu Item</h3>
                        <label>
                            <div className="description">
                                Unique name:
                            </div>
                            <input
                                type="text"
                                value={itemNameToAdd}
                                onChange={event => setItemNameToAdd(event.target.value)}
                            />
                        </label>

                        <label>
                            <div className="description">
                                Dish or drink:
                            </div>
                            <Select
                                options={dishOrDrinkOptions}
                                onChange={selectedItem => setIsDishOrDrinkToAdd(selectedItem.value)}
                            />
                        </label>

                        <label>
                            <div className="description">
                                Needed products:
                            </div>
                            <Select
                                isMulti
                                options={allProductsOptions}
                                onChange={selectedItem => {setNeededProductsToAdd(selectedItem.map(item => item.value));
                                console.log(selectedItem)
                                }}
                            />
                        </label>
                        <label>
                            <div className="description">
                                Price:
                            </div>
                            <input
                                type="text"
                                value={priceToAdd}
                                onChange={event => setPriceToAdd(event.target.value)}
                            />
                        </label>

                        <button type="submit">
                            Add
                        </button>
                    </form>
                    <form /*onSubmit={this.deleteMenuItem}*/>
                        <h3>Delete Menu Item</h3>
                        <label>
                            <div className="description">
                                Item name:
                            </div>
                            <input
                                type="text"
                                value={itemNameToAdd}
                                onChange={event => itemNameToAdd(event.target.value)}
                            />
                        </label>

                        <div className="formButton">
                            <button type="submit">
                                Delete
                            </button>
                        </div>
                    </form>
                    <form>
                        <h3>Add a table</h3>
                        <label>
                            <div className="description">
                                Number of tables to add:
                            </div>
                            <input
                                type="number"
                                value={numberOfTables}
                                onChange={event => setNumberOfTables(event.target.value)}
                            />
                        </label>
                        <button onClick={() => {
                            fetch(addTableURL, addTableReq)
                                .then(response => console.log(response))
                        }}>Add</button>
                    </form>
                </div>
            </section>
        </div>
    );
}
export default ManagerPage;