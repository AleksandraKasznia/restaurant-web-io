import React, {useContext, useEffect, useState} from 'react';
import './ManagerPage.css';
import Select from "react-select";
import {MANAGER_ENDPOINT} from "../../constants/apiEndpoints";
import {RoleContext} from "../App/RoleContext";
import {useHistory} from 'react-router-dom';
import AdminNavBar from "../NavBars/AdminNavBar";
import {SIGN_IN} from "../../constants/routes";
import UserNavBar from "../NavBars/UserNavBar";
import Footer from "../Footer";
import DownloadLink from "react-download-link";

const getAllProductsURL = MANAGER_ENDPOINT + '/products';
const getAllUsersURL = MANAGER_ENDPOINT + '/fetchUsers';
const addUserURL = MANAGER_ENDPOINT + '/signup';
const deleteUserURL = MANAGER_ENDPOINT + '/deleteUserId/';
const updateUserURL = MANAGER_ENDPOINT + '/update';
const addMenuItemURL = MANAGER_ENDPOINT + '/addMenuItem';
const addTablesURL = MANAGER_ENDPOINT + "/addTables/";
const deleteMenuItemURL = MANAGER_ENDPOINT + "/deleteMenuItem/";
const addProductURL = MANAGER_ENDPOINT + '/addProductItem';
const getFeedbackURL = MANAGER_ENDPOINT + '/feedbackEmployees';

function ManagerPage() {
    let history = useHistory();
    const user = useContext(RoleContext);

    const [usernameToAdd, setUsernameToAdd] = useState("");
    const [emailToAdd, setEmailToAdd] = useState("");
    const [usernameToUpdate, setUsernameToUpdate] = useState("");
    const [emailToUpdate, setEmailToUpdate] = useState("");
    const [passwordToAdd, setPasswordToAdd] = useState("");
    const [passwordToUpdate, setPasswordToUpdate] = useState("");
    const [userIdToDelete, setUserIdToDelete] = useState("");
    const [roleToUpdate, setRoleToUpdate] = useState([]);
    const [roleToAdd, setRoleToAdd] = useState([]);
    const [itemNameToAdd, setItemNameToAdd] = useState("");
    const [itemNameToDelete, setItemNameToDelete] = useState("");
    const [isDishOrDrinkToAdd, setIsDishOrDrinkToAdd] = useState("");
    const [neededProductsToAdd, setNeededProductsToAdd] = useState(null);
    const [priceToAdd, setPriceToAdd] = useState(0.0);
    const [numberOfTables, setNumberOfTables] = useState(1);
    const [productName, setProductName] = useState("");
    const [productAmount, setProductAmount] = useState(0);
    const [allProducts, setAllProducts] = useState([]);
    const [doNeedToRefresh, setDoNeedToRefresh] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [feedback,setFeedback] = useState("");
    const newUser = {
        username: usernameToAdd,
        password: passwordToAdd,
        role: roleToAdd,
        email: emailToAdd,
        displayName: null
    };
    async function getFeedback() {
        try {
            const resp1 = await fetch(getFeedbackURL, {
                method: 'GET',
                credentials: 'include'
            });
            const resp = ((await resp1.json()).map(object => JSON.stringify(object) + "\n")).toString();
            console.log(resp);
            setFeedback(resp)
        }
        catch (e) {
            alert("Sorry there was an error, please make a reservation via phone call");
            console.log(e);
        }
    }

    useEffect(() => {
        const fetchProductData = async () => {
            fetch(getAllProductsURL,{method: 'GET', credentials: 'include'})
                .then(result => result.json())
                .then(data => setAllProducts(data));
        };

        const fetchUserData = async () => {
            fetch(getAllUsersURL, {method: 'GET', credentials: 'include'})
                .then(result => result.json())
                .then(data => setAllUsers(data));
        };

        fetchProductData();
        fetchUserData();
        getFeedback();
    }, [doNeedToRefresh]);

    const possibleRoles = ["ROLE_WAITER", "ROLE_BARTENDER", "ROLE_COOK", "ROLE_SUPPLIER", "ROLE_MANAGER"];
    const rolesOptions = possibleRoles.map((role) => ({value: role, label: role.replace("ROLE_","").toLowerCase()}));
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
    const updateUserReq = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            username: usernameToUpdate,
            password: passwordToUpdate,
            authorities: roleToUpdate,
            email: emailToUpdate
        })
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
    const deleteMenuItemReq = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',
        },
        credentials: 'include',
    };
    const addTableReq = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
        })
    };
    const addProductReq = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            name: productName,
            amount: productAmount
        })
    };


    return (
        <div>
            {user.role.role === "ROLE_MANAGER" || user.role.role === "ROLE_ADMIN" ?
                <div className="managerPager">
                    {user.role.role === "ROLE_ADMIN" ? <AdminNavBar/>: <UserNavBar/>}
                    <section className="employees">
                        <h1>Employees</h1>
                        <div> </div>
                        <div className="formsSection">
                            <form className="user" onSubmit={event => {
                                event.preventDefault();
                                fetch(addUserURL, addUserReq)
                                    .then(() => {
                                        setDoNeedToRefresh(!doNeedToRefresh);
                                        setUsernameToAdd("");
                                        setEmailToAdd("");
                                        setPasswordToAdd("");
                                        setRoleToAdd("");
                                    })
                            }}>
                                <div className="header">
                                    <h3>Add User</h3>
                                </div>
                                <label>
                                    <div className="description">
                                        Choose role:
                                    </div>
                                </label>
                                    <Select
                                        options={rolesOptions}
                                        onChange={selectedItem => setRoleToAdd(selectedItem.value)}
                                    />

                                <label>
                                    <div className="description">
                                        Username:
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
                            <form className="user" onSubmit={event => {
                                event.preventDefault();
                                fetch(deleteUserURL + userIdToDelete, deleteUserReq)
                                    .then(() =>{
                                        setUserIdToDelete("");
                                        setDoNeedToRefresh(!doNeedToRefresh);
                                    });
                            }}>
                                <h3>Delete User</h3>
                                <label>
                                    <div className="description">
                                        id:
                                    </div>
                                    <Select
                                        options={allUsersOptions}
                                        onChange={selectedItem => setUserIdToDelete(selectedItem.value)}
                                    />
                                </label>

                                <button type="submit">
                                    Delete
                                </button>
                            </form>
                            <form className="user" onSubmit={event => {
                                event.preventDefault();
                                fetch(updateUserURL, updateUserReq)
                                    .then(() => {
                                        setUsernameToUpdate("");
                                        setRoleToUpdate("");
                                        setEmailToUpdate("");
                                        setUsernameToUpdate("");
                                        setPasswordToUpdate("");
                                    });
                            }}>
                                <h3>Update User</h3>
                                <label>
                                    <div className="description">
                                        id:
                                    </div>
                                    <Select
                                        options={allUsersOptions}
                                        onChange={selectedItem => setUsernameToUpdate(selectedItem.label)}
                                    />
                                </label>

                                <label>
                                    <div className="description">
                                        Choose role:
                                    </div>
                                    <Select
                                        options={rolesOptions}
                                        onChange={selectedItem => setRoleToUpdate(selectedItem.value)}
                                    />
                                </label>

                                <label>
                                    <div className="description">
                                        Username:
                                    </div>
                                    <input
                                        type="text"
                                        value={usernameToUpdate}
                                        onChange={event => setUsernameToUpdate(event.target.value)}
                                    />
                                </label>

                                <label>
                                    <div className="description">
                                        Email:
                                    </div>
                                    <input
                                        type="text"
                                        value={emailToUpdate}
                                        onChange={event => setEmailToUpdate(event.target.value)}
                                    />
                                </label>
                                <label>
                                    <div className="description">
                                        Password:
                                    </div>

                                    <input
                                        type="password"
                                        value={passwordToUpdate}
                                        onChange={event => setPasswordToUpdate(event.target.value)}
                                    />
                                </label>

                                <button type="submit">
                                    Update
                                </button>
                            </form>
                        </div>
                    </section>
                    <section className="tablesAndMenu">
                        <h1>Menu Items and Tables</h1>
                        <div className="formsSection">
                            <form className="menu" onSubmit={event => {
                                event.preventDefault();
                                fetch(addMenuItemURL, addMenuItemReq)
                                    .then(() => {
                                        setDoNeedToRefresh(!doNeedToRefresh);
                                        setItemNameToAdd("");
                                        setPriceToAdd("");
                                        setIsDishOrDrinkToAdd("");
                                    })
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
                                        onChange={selectedItem => setNeededProductsToAdd(selectedItem ? selectedItem.map(item => item.value) : null)}
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
                            <form className="menu" onSubmit={event => {
                                event.preventDefault();
                                fetch(deleteMenuItemURL + itemNameToDelete, deleteMenuItemReq)
                                    .then(() => {
                                        setItemNameToDelete("");
                                    })
                            }}>
                                <h3>Delete Menu Item</h3>
                                <label>
                                    <div className="description">
                                        Item name:
                                    </div>
                                    <input
                                        type="text"
                                        value={itemNameToDelete}
                                        onChange={event => setItemNameToDelete(event.target.value)}
                                    />
                                </label>

                                <div className="formButton">
                                    <button type="submit">
                                        Delete
                                    </button>
                                </div>
                            </form>
                            <form className="table" onSubmit={event => {
                                event.preventDefault();
                                fetch(addTablesURL + numberOfTables, addTableReq)
                                    .then(() => {
                                        setNumberOfTables(1);
                                    })
                            }}>
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
                                <button  type="submit">Add</button>
                            </form>
                        </div>
                    </section>
                    <section>
                        <h1>Products and Feedback</h1>
                        <div className="formsSection">
                            <form className="product" onSubmit={event => {
                                event.preventDefault();
                                fetch(addProductURL,addProductReq)
                                    .then(() => {
                                        setDoNeedToRefresh(!doNeedToRefresh);
                                        setProductName("");
                                        setProductAmount(0);
                                    })
                            }}>
                                <div>
                                    <h3>Add product</h3>
                                </div>
                                <label>
                                    Name:
                                    <input
                                        type="text"
                                        value={productName}
                                        onChange={event => setProductName(event.target.value)}
                                    />
                                </label>
                                <label>
                                    Amount
                                    <input
                                        type="number"
                                        value={productAmount}
                                        onChange={event => setProductAmount(event.target.value)}
                                    />
                                </label>
                                <button type="submit"> Add </button>
                            </form>
                            <div className="feedback">
                                <h3>Get feedback </h3>
                                <DownloadLink
                                    filename="feedback.txt"
                                    exportFile={() => feedback}
                                    tagName = "button"
                                >
                                    Get feedback
                                </DownloadLink>
                            </div>
                        </div>
                    </section>
                    <Footer/>
                </div>

                : (history.push(SIGN_IN))}
        </div>
    );
}
export default ManagerPage;