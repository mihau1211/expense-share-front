import React from "react";
import ExpenseItem from "../pages/components/ExpenseItem";
import '../styles/AllExpenses.css'

const AllExpensesPopup = ({ handleClose, show, expenses, onSelectExpense }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    const handleSelectExpense = async (expense) => {
        onSelectExpense(expense)
        handleClose()
    }

    return (
        <div className={showHideClassName} style={{ textAlign: 'center' }}>
            <div className='modal-main' style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div style={{ maxHeight: '85%', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                    {expenses?.length > 0 ? (
                        expenses.map((expense, index) => (
                            <ExpenseItem
                                className="expense-item"
                                key={index}
                                expenseData={expense}
                                isClickable={true}
                                handleSelectExpense={handleSelectExpense}
                            />
                        ))
                    ) : (
                        <p>None</p>
                    )}
                </div>
                <div style={{ position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)' }}>
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default AllExpensesPopup