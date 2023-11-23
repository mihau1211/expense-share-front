import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";

const UsersContainer = ({ expense, onUserAdd, onUserRemove }) => {
    const [users, setUsers] = useState()
    const [email, setEmail] = useState('')
    const [isLoggedOwner, setIsLoggedOwner] = useState(false)

    const fetchReturnValueByUser = async () => {
        const token = sessionStorage.getItem('authToken')
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const options = {
            method: 'GET',
            headers: headers
        };

        const response = await fetch(`http://localhost:3100/api/v1/transactions/toReturnByUser/${expense._id}`, options);
        const data = await response.json();
        return data
    }

    const addUserToExpense = async (userId) => {
        const token = sessionStorage.getItem('authToken')
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const options = {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify({
                user: userId
            })
        };

        const response = await fetch(`http://localhost:3100/api/v1/expenses/${expense._id}/addUser`, options);
        const data = await response.json();
        return data
    }

    const fetchUserByEmail = async (email) => {
        const token = sessionStorage.getItem('authToken')
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const options = {
            method: 'GET',
            headers: headers
        };

        const response = await fetch(`http://localhost:3100/api/v1/users?email=${email}`, options);
        const data = await response.json();
        return data
    }

    const removeUserFromExpense = async (userId) => {
        const token = sessionStorage.getItem('authToken')
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const options = {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify({ userId })
        };

        const response = await fetch(`http://localhost:3100/api/v1/expenses/${expense._id}/removeUser`, options);
        const data = await response.json();
        return data
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setEmail(() => (value));
    }

    const handleRemoveUser = async (userId) => {
        const updatedExpense = await removeUserFromExpense(userId)
        if (!updatedExpense._id) return alert('Unable to remove user')
        onUserRemove()
    }

    const handleAddUser = async () => {
        const userToAdd = await fetchUserByEmail(email)
        if (userToAdd.length === 0) return alert('No user with provided email')
        await addUserToExpense(userToAdd[0]._id)
        onUserAdd()
        setEmail('')
    }

    useEffect(() => {
        const fetchData = async () => {
            if (expense) {
                const userArray = [...expense.users]
                userArray.push(expense.owner)
                const valuesToReturn = await fetchReturnValueByUser()
                for (let user of userArray) {
                    user.valueToReturn = valuesToReturn.userReturnAmounts[user._id]
                    user.isOwner = user._id === expense.owner._id.toString();
                }
                setUsers(userArray)
                const userId = sessionStorage.getItem('userId');
                setIsLoggedOwner(userId === expense.owner._id)
            }
        }

        fetchData()
    }, [expense])

    return (
        <div className="users-container">
            <div className="users-label">Users</div>
            { }
            <div className="user-email-input">
                <textarea
                    className="add-user-input"
                    id="name"
                    name="user"
                    rows="1"
                    cols="30"
                    placeholder="Enter user email"
                    value={email}
                    onChange={handleChange}
                    required
                ></textarea>
                <button className="add-user-button" onClick={handleAddUser} disabled={!email}>Add user</button>
            </div>
            <div className="users-content">
                {users ? (
                    users.map((user, index) => (
                        <UserItem
                            key={index}
                            onRemoveUser={handleRemoveUser}
                            id={user._id} username={user.name}
                            valueToReturn={user.valueToReturn}
                            displayRemoveButton={user.isOwner ? false : isLoggedOwner}
                        />
                    ))
                ) : (
                    <p>No users available.</p>
                )}
            </div>
        </div>
    )
}

export default UsersContainer