import React, { useEffect, useState } from "react";
import TransactionItem from "./TransactionItem";

const TransactionContainer = ({ expense, onTransactionRemove }) => {
    const [transactions, setTransactions] = useState([]);
    const [isTransactionRemoved, setIsTransactionRemoved] = useState(false)
    const [isLoggedOwner, setIsLoggedOwner] = useState(false)

    const handleRemoveTransaction = async (transactionId) => {
        const removeMessage = await removeTransactionFromExpense(transactionId)
        if (removeMessage.message !== "Success") return alert('Unable to remove transaction')
        setIsTransactionRemoved(true)
        onTransactionRemove()
    }

    const removeTransactionFromExpense = async (transactionId) => {
        const token = sessionStorage.getItem('authToken')
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const options = {
            method: 'PATCH',
            headers: headers
        };

        const response = await fetch(`http://localhost:3100/api/v1/transactions/${transactionId}`, options);
        const data = await response.json();
        return data
    }

    useEffect(() => {
        const fetchTransactions = async () => {
            const token = sessionStorage.getItem('authToken')
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const options = {
                method: 'GET',
                headers: headers
            };

            const response = await fetch(`http://localhost:3100/api/v1/transactions/${expense._id}`, options);
            const data = await response.json();
            return data
        }

        const fetchData = async () => {
            if (expense) {
                const userId = sessionStorage.getItem('userId');
                const transactionsData = await fetchTransactions()
                for (let transaction of transactionsData) {
                    transaction.isOwner = userId === transaction.owner._id
                }
                setTransactions(transactionsData)
                setIsTransactionRemoved(false)
                setIsLoggedOwner(userId === expense.owner._id)
            }
        }

        fetchData()
    }, [expense, isTransactionRemoved])

    return (
        <div className="transaction-container">
            <div className="transaction-container-title">{expense?.name}</div>
            <div className="transaction-container-content">

                {transactions.map((transaction, index) => (
                    <TransactionItem
                        key={index}
                        transactionData={transaction}
                        onTransactionRemove={handleRemoveTransaction}
                        displayRemoveButton={transaction.isOwner ? true : isLoggedOwner}
                    />
                ))}
            </div>
        </div>

    )
}

export default TransactionContainer