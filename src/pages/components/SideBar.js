import React, { useState, useEffect } from "react";
import '../../styles/SideBar.css'
import ExpenseItem from "./ExpenseItem";
import AllExpensesPopup from "../AllExpensesPopup";
import AddExpensesPopup from "../AddExpensePopup";

const SideBar = ({ onLogout, onExpenseAdd, onSelectExpense, selectedExpense, username, expenses }) => {
    const [showAllExpenses, setShowAllExpenses] = useState(false);
    const [showAddExpenses, setShowAddExpenses] = useState(false);

    const handleLogout = async () => {
        const token = sessionStorage.getItem('authToken')
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const options = {
            method: 'POST',
            headers: headers
        };

        const response = await fetch('http://localhost:3100/api/v1/logout', options);
        const data = await response.json();
        if (!!data) sessionStorage.removeItem('authToken')
        onLogout()
    }

    const toggleAllExpenses = () => {
        setShowAllExpenses(!showAllExpenses)
    }

    const toggleAddExpenses = () => {
        setShowAddExpenses(!showAddExpenses)
    }

    useEffect(() => {
        if (expenses) onSelectExpense(expenses[0])
    }, [expenses, onSelectExpense]);


    return (
        <div className="side-bar-container">
            <div className="user-info-container">
                <label className="user-label">{username}</label>
            </div>
            <div className="sidebar-section-labels">Selected expense</div>
            <div className="last-expenses-container">
                {!!selectedExpense ? (
                    <ExpenseItem
                        expenseData={selectedExpense}
                        isClickable={false}
                    />
                ) : (
                    <p>None</p>
                )}
            </div>
            <div className="sidebar-section-labels">Last expenses</div>
            <div className="last-expenses-container">
                {expenses?.length > 0 ? (
                    expenses.slice(0,4).map((expense, index) => (
                        <ExpenseItem
                            key={index}
                            expenseData={expense}
                            isClickable={true}
                            handleSelectExpense={onSelectExpense}
                        />
                    ))
                ) : (
                    <p>None</p>
                )}
            </div>
            <div className="sidebar-section-labels-clickable" onClick={toggleAllExpenses}>All expenses</div>
            <div className="sidebar-section-labels-clickable"onClick={toggleAddExpenses}>Add expense</div>
            <div className="sidebar-section-labels-clickable" onClick={handleLogout}>Logout</div>

            <AllExpensesPopup show={showAllExpenses} onSelectExpense={onSelectExpense} handleClose={toggleAllExpenses} expenses={expenses}/>
            <AddExpensesPopup show={showAddExpenses} onExpenseAdd={onExpenseAdd} handleClose={toggleAddExpenses}/>
        </div>
    )
}

export default SideBar