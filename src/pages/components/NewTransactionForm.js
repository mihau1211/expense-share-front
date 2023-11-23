import React, { useEffect, useState } from "react";

const NewTransactionForm = ({ expense, onTransactionAdd }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        date: "",
        value: 0,
        expense: expense?._id
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            date: new Date().toISOString().split('T')[0]
        }));
    }, []);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            expense: expense?._id
        }))
    }, [expense])

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const addNewTransaction = async () => {
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

            const response = await fetch(`http://localhost:3100/api/v1/transactions`, options);
            const data = await response.json();
            return data
        }

        const fetchData = async () => {
            if (expense) {
                await addNewTransaction()
                onTransactionAdd()
                setFormData({
                    name: "",
                    description: "",
                    date: new Date().toISOString().split('T')[0],
                    value: 0,
                    expense: expense?._id
                });
            }
        }

        fetchData()
    };

    return (
        <div className="new-transaction-container">
            <div className="new-transaction-label">Add new transaction</div>
            <div className="new-transaction-content">
                <form onSubmit={handleSubmitForm}>
                    <div className="form-section">
                        <label htmlFor="name">Name:</label>
                        <br />
                        <textarea
                            className="transaction-input"
                            id="name"
                            name="name"
                            rows="1"
                            cols="50"
                            placeholder="Enter transaction name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="form-section">
                        <label htmlFor="description">Description:</label>
                        <br />
                        <textarea
                            className="transaction-input"
                            id="description"
                            name="description"
                            rows="4"
                            cols="50"
                            placeholder="Enter transaction description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="form-section" style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ marginRight: '10px' }}>
                            <label htmlFor="datepicker">Date:</label>
                            <br />
                            <input
                                className="transaction-input"
                                type="date"
                                id="datepicker"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="value">Value:</label>
                            <br />
                            <input
                                className="transaction-input"
                                type="number"
                                id="value"
                                name="value"
                                placeholder="Enter transaction value"
                                value={formData.value}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <button style={{ fontSize: 'large', marginTop: '3vh', marginBottom: '1vh' }} type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default NewTransactionForm;
