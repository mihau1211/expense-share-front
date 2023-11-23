import React, { useEffect, useState } from "react";

const SummaryContainer = ({ expense }) => {
    const [value, setValue] = useState(0)

    const fetchValueToReturn = async () => {
        const token = sessionStorage.getItem('authToken')
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const options = {
            method: 'GET',
            headers: headers
        };

        const response = await fetch(`http://localhost:3100/api/v1/transactions/toreturn/${expense._id}`, options);
        const data = await response.json();
        return data
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (expense) {
                    const valueToReturn = await fetchValueToReturn();
                    setValue(valueToReturn.value)
                }
            } catch (error) {
                console.error('Błąd podczas pobierania danych z API:', error);
            }
        }

        fetchData()
    }, [expense])

    return (
        <div className="summary-container">
            <div className="summary-label-container">
                <div className="summary-label info">You have to return: </div>
                <div className="summary-label value">{value}</div>
            </div>
        </div>
    )
}

export default SummaryContainer