import React, { useState } from 'react';
import '../styles/LoginPage.css';

const login = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3100/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem('authToken', data.token);
            sessionStorage.setItem('userId', data.user._id);
            return data.token
        } else {
            window.alert('Nie udało się zalogować. Sprawdź poprawność danych.');
            return null
        }
    } catch (error) {
        console.error('Wystąpił błąd podczas wysyłania żądania:', error);
        return null
    }
}

const LoginPage = ({ onLogin, onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        return onLogin(await login(email, password))
    };

    const handleRegister = async (e) => {
        e.preventDefault()
        onRegister()
    }

    return (
        <div className="center-container">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            className="input-box"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            className="input-box"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="form-group label-and-button">
                        <button onClick={handleRegister}>Register</button>
                        <label htmlFor="submit" />
                        <button id="submit" type="submit" className="button-box">
                            Log In
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default LoginPage;