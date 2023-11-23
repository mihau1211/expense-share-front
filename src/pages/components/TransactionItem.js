import React from "react";

const TransactionItem = ({ transactionData, onTransactionRemove, displayRemoveButton }) => {
    const handleRemoveTransaction = () => {
        onTransactionRemove(transactionData._id)
    }

    return (
        <div className="transaction-item">
            <div className="transaction-field name">{transactionData.name}</div>
            <div className="transaction-field description">{transactionData.description}</div>
            <div className="transaction-value-owner-date">
                <div className="transaction-field bottom">{parseFloat(transactionData.value).toFixed(2)}</div>
                <div className="transaction-field bottom">{transactionData.owner.name}</div>
                <div className="transaction-field bottom">{new Date(transactionData.date).toLocaleDateString('en-GB')}</div>
                {displayRemoveButton && (
                    <button className="remove-button" onClick={handleRemoveTransaction}>X</button>
                )}
            </div>
        </div>
    )
}

export default TransactionItem