import React from 'react';
import '../../styles/ExpenseItem.css';

const ExpenseItem = ({ expenseData, handleSelectExpense, isClickable }) => {
    const handleContainerClick = () => {
        if (isClickable) handleSelectExpense(expenseData);
    };

    return (
        <div className={`expense-container ${isClickable ? 'clickable' : ''}`} onClick={handleContainerClick}>
            <div className="expense-details">
                <div className="expense-name">{expenseData.name}</div>
                <div className="expense-date">{new Date(expenseData.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="expense-users">Users: {expenseData.users.length + 1}</div>
        </div>
    );
}

export default ExpenseItem;