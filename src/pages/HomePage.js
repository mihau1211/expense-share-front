import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import TransactionContainer from "./components/TransactionsContainer";
import '../styles/HomePage.css'
import SummaryContainer from "./components/SummaryContainer";
import UsersContainer from "./components/UsersContainer";
import NewTransactionForm from "./components/NewTransactionForm";

const HomePage = ({ onLogout }) => {
    const token = sessionStorage.getItem('authToken')
    const [expenses, setExpenses] = useState()
    const [selectedExpense, setSelectedExpense] = useState()
    const [user, setUser] = useState()
    const [transactionsModify, setTransactionsModify] = useState(false)

    const handleLogout = async () => {
        onLogout()
    }

    const handleTransactionModify = async () => {
        setTransactionsModify(true)
    }

    const fetchData = async (url, token) => {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const options = {
            method: 'GET',
            headers: headers
        };

        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    };

    const fetchUserData = async () => {
        const userData = await fetchData('http://localhost:3100/api/v1/users/me', token);
        return userData
    }

    const fetchExpensesData = async () => {
        const expensesData = await fetchData('http://localhost:3100/api/v1/expenses/me', token);
        return expensesData
    }

    const handleExpenseAdd = async () => {
        const expensesData = await fetchExpensesData()
        setExpenses(expensesData)
    }

    const handleUserAdd = async () => {
        const expenseData = await fetchExpensesData()
        setExpenses(expenseData)
    }

    const handleUserRemove = async () => {
        const expenseData = await fetchExpensesData()
        setExpenses(expenseData)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUserData()
                const expensesData = await fetchExpensesData()

                setUser(userData);
                setExpenses(expensesData);
            } catch (error) {
                console.error('Błąd podczas pobierania danych z API:', error);
            }
        };

        fetchData();
    }, [token])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const prevExpense = selectedExpense
                const expensesData = await fetchExpensesData()

                setExpenses(expensesData);
                setTransactionsModify(false)
                setSelectedExpense(prevExpense)
            } catch (error) {
                console.error('Błąd podczas pobierania danych z API:', error);
            }
        }

        fetchData()
    }, [transactionsModify])

    return (
        <div className="homepage-container">
            <SideBar
                selectedExpense={selectedExpense}
                expenses={expenses} username={user?.name}
                onSelectExpense={setSelectedExpense}
                onExpenseAdd={handleExpenseAdd}
                onLogout={handleLogout}
            />
            <div className="column1">
                <TransactionContainer
                    expense={selectedExpense}
                    onTransactionRemove={handleTransactionModify}
                />
                <SummaryContainer
                    expense={selectedExpense}
                />
            </div>
            <div className="column2">
                <UsersContainer
                    expense={selectedExpense}
                    onUserAdd={handleUserAdd}
                    onUserRemove={handleUserRemove}
                />
                <NewTransactionForm
                    expense={selectedExpense}
                    onTransactionAdd={handleTransactionModify}
                />
            </div>

        </div>
    )
}

export default HomePage