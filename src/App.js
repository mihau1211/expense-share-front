import React, { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage';

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isRegisterOn, setIsRegisterOn] = useState(false)

    useEffect(() => {
        if (!!sessionStorage.getItem('authToken')) handleLogin()
    }, []);

    const handleLogin = async () => {
        setLoggedIn(!!sessionStorage.getItem('authToken'))
    }

    const handleRegister = async () => {
        setIsRegisterOn(!isRegisterOn)
    }

    return (
        <div className="App">
            {isLoggedIn ? (
                <HomePage onLogout={handleLogin} />
            ) : (
                isRegisterOn ? (
                    <RegisterPage onCloseRegister={handleRegister} />
                ) : (
                    <LoginPage onLogin={handleLogin} onRegister={handleRegister}/>
                )
            )}
        </div>
    );
}

export default App;
