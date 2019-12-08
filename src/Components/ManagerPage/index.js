import React, { useState } from 'react';
import './ManagerPage.css';

function ManagerPage() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [role, setRole] = useState("");
    const [itemName, setItemName] = useState("");
    const [availability, setAvailability] = useState(false);
    const [isDishOrDrink, setIsDishOrDrink] = useState("");
    const [neededProducts, setNeededProducts] = useState({products: []});
    const [price, setPrice] = useState(0.0);


    return (
        <div>
            <section>
                <h1>Employees</h1>
                <div className="formsSection">
                    <form className="addEmployeeForm"/*onSubmit={this.addUser}*/>
                        <h3>Add User</h3>
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
                                value={username}
                                onChange={event => setUsername(event.target.value)}
                            />
                        </label>

                        <label>
                            <div className="description">
                                Email:
                            </div>

                            <input
                                type="text"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </label>

                        <button type="submit">
                            Add
                        </button>
                    </form>
                    <form /*onSubmit={this.deleteUser}*/>
                        <h3>Delete User</h3>
                        <label>
                            <div className="description">
                                id:
                            </div>
                            <input
                                type="text"
                                value={userId}
                                onChange={event => setUserId(event.target.value)}
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
                                value={userId}
                                onChange={event => setUserId(event.target.value)}
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
                                value={username}
                                onChange={event => setUsername(event.target.value)}
                            />
                        </label>

                        <label>
                            <div className="description">
                                Email:
                            </div>
                            <input
                                type="text"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </label>

                        <button type="submit">
                            Update
                        </button>
                    </form>
                </div>
            </section>

            <section>
                <h1>Menu Items</h1>
                <div className="formsSection">
                    <form /*onSubmit={this.addMenuItem}*/>
                        <h3>Add Menu Item</h3>
                        <label>
                            <div className="description">
                                Unique name:
                            </div>
                            <input
                                type="text"
                                value={itemName}
                                onChange={event => setItemName(event.target.value)}
                            />
                        </label>

                        <label>
                            <div className="description">
                                Dish or drink:
                            </div>
                            <select>
                                <option value="drink">Drink</option>
                                <option value="dish">Dish</option>
                            </select>
                        </label>

                        <label>
                            <div className="description">
                                Needed products:
                            </div>
                            /*TODO */
                        </label>

                        <label>
                            <div className="description">
                                Price:
                            </div>
                            <input
                                type="text"
                                value={price}
                                onChange={event => setPrice(event.target.value)}
                            />
                        </label>

                        <label>
                            <div className="description">
                                Is available:
                            </div>
                            <input
                                type="checkbox"
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
                                value={itemName}
                                onChange={event => itemName(event.target.value)}
                            />
                        </label>

                        <div className="formButton">
                            <button type="submit">
                                Delete
                            </button>
                        </div>
                    </form>
                    <form /*onSubmit={this.updateMenuItem}*/>
                        <h3>Update Menu Item</h3>
                        <label>
                            <div className="description">
                                Item name:
                            </div>
                            <input
                                type="text"
                                value={itemName}
                                onChange={event => itemName(event.target.value)}
                            />
                        </label>

                        <label>
                            <div className="description">
                                Dish or drink:
                            </div>
                            <select>
                                <option value="drink">Drink</option>
                                <option value="dish">Dish</option>
                            </select>
                        </label>

                        <label>
                            <div className="description">
                                Needed products:
                            </div>

                            /*TODO */
                        </label>

                        <label>
                            <div className="description">
                                Price:
                            </div>
                            <input
                                type="text"
                                value={price}
                                onChange={event => setPrice(event.target.value)}
                            />
                        </label>

                        <label>
                            <div className="description">
                                Is available:
                            </div>
                            <input
                                type="checkbox"
                            />
                        </label>

                        <div className="formButton">
                            <button type="submit">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
export default ManagerPage;