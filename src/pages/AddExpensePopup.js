import React, { useState } from "react";
import '../styles/AllExpenses.css'
import UserItem from "./components/UserItem";

const AddExpensesPopup = ({ handleClose, show, onExpenseAdd }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    const [formData, setFormData] = useState({
        name: "",
        users: []
    });
    const [user, setUser] = useState('')
    const [users, setUsers] = useState([])

    const addNewExpense = async () => {
        const token = sessionStorage.getItem('authToken')
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(formData)
        };

        const response = await fetch(`http://localhost:3100/api/v1/expenses`, options)
        const data = await response.json()
        return data
    }

    const handleSubmitForm = async () => {
        if (formData.name && formData.users) {
            const result = await addNewExpense()
            if (result) {
                setFormData({
                    name: '',
                    users: []
                })
                setUsers([])
                onExpenseAdd()
                handleClose()
            }
        }
    }

    const onClose = () => {
        setUsers([])
        setUser('')
        setFormData({
            name: '',
            users: []
        })
        handleClose()
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChangeUser = async (e) => {
        const { value } = e.target
        setUser(() => (value))
    }

    const handleRemoveUser = async (id) => {
        const idx = formData.users.indexOf(id)

        const userIdsArray = [...formData.users]
        userIdsArray.splice(idx, 1);

        const usersArray = [...users]
        usersArray.splice(idx, 1)

        setFormData((prevData) => ({
            ...prevData,
            users: Array.from(userIdsArray)
        }))
        setUsers(usersArray)
    }

    const handleAddUser = async () => {
        const response = await fetchUserData(user)
        if (response.length === 0) return alert('Not found user with provided email')

        const userIds = new Set([...formData.users, response[0]._id]);
        setFormData((prevData) => ({
            ...prevData,
            users: Array.from(userIds)
        }));
        const usersArray = new Set([...users, response[0]])
        setUsers(Array.from(usersArray));
        setUser('')
    }

    const fetchUserData = async (email) => {
        const token = sessionStorage.getItem('authToken')
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const options = {
            method: 'GET',
            headers: headers
        };

        const response = await fetch(`http://localhost:3100/api/v1/users?email=${email}`, options)
        const data = await response.json()
        return data
    }

    return (
        <div className={showHideClassName} style={{ textAlign: 'center' }}>
            <div className='modal-main' style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className="add-expense-content">
                    <textarea
                        className="expense-input"
                        id="name"
                        name="name"
                        rows="1"
                        cols="30"
                        placeholder="Enter expense name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <textarea
                        className="expense-input"
                        id="user"
                        name="user"
                        rows="1"
                        cols="30"
                        placeholder="Enter user email"
                        value={user}
                        onChange={handleChangeUser}
                        required
                    ></textarea>
                    <button style={{ marginTop: "1vh", marginBottom: "1vh" }} onClick={handleAddUser} disabled={!user}>Add user</button>
                </div>
                <div style={{ maxHeight: '70%', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                    {users.length > 0 ? (users.map((user, index) => (
                        <UserItem
                            key={index}
                            id={user._id}
                            username={user.email}
                            onRemoveUser={handleRemoveUser}
                        />
                    ))) : (
                        <div>None</div>
                    )}
                </div>

                <button style={{ marginTop: "1vh", marginRight: "1vw", fontSize: "large" }} disabled={!formData.name || !formData.users.length} onClick={handleSubmitForm}>Add expense</button>
                <button style={{ marginTop: "1vh", marginRight: "1vw", fontSize: "large" }} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default AddExpensesPopup