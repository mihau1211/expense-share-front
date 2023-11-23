import React, { useState } from "react"
import validator from 'validator'
import '../styles/RegisterPage.css'

const RegisterPage = ({ onCloseRegister }) => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
    });
    const [isEmailUnique, setIsEmailUnique] = useState(true)
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)

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

        const response = await fetch(`http://localhost:3100/api/v1/users/email?email=${email}`, options)
        const data = await response.json()
        return data
    }

    const handleNameChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            name: value,
        });
    };

    const handleCancel = () => {
        onCloseRegister()
    }

    const handleEmailChange = async (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            email: value,
        });
        const response = await fetchUserByEmail(value)
        setIsEmailValid(validator.isEmail(value))
        setIsEmailUnique(response.isAvailable)
    }

    const handlePasswordChange = async (e) => {
        const { value } = e.target
        setFormData({
            ...formData,
            password: value
        })
        setIsPasswordValid(validator.isStrongPassword(value))
    }

    const createUser = async () => {
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

        const response = await fetch(`http://localhost:3100/api/v1/users`, options)
        const data = await response.json()
        return data
    }

    const submitRegister = async (e) => {
        e.preventDefault()
        if (isEmailUnique && isEmailValid && isPasswordValid && formData.name) {
            const user = await createUser()
            if (user) onCloseRegister()
        }
    }

    return (
        <div className="center-container">
            <div className="form-container">
                <form onSubmit={submitRegister}>
                    <label htmlFor="email">Email:</label>
                    <input
                        className="input-box"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleEmailChange} />
                    <br />
                    <label htmlFor="name">Name:</label>
                    <input
                        className="input-box"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleNameChange} />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input
                        className="input-box"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handlePasswordChange} />
                    <br />
                    <button
                        className="button-box"
                        type="button"
                        onClick={handleCancel}>
                        Cancel
                    </button>
                    <button
                        className="button-box"
                        disabled={!formData.name || !formData.password || !formData.email || !isEmailUnique || !isEmailValid || !isPasswordValid}
                        type="submit">
                        Register
                    </button>
                </form>

            </div>
        </div>
    );
}

export default RegisterPage