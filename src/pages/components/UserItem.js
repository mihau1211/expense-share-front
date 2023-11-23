import React, { useEffect } from "react";

const UserItem = ({ id, username, valueToReturn, displayRemoveButton, onRemoveUser }) => {
    const handleRemoveUser = () => {
        onRemoveUser(id);
    };

    return (
        <div>
            <div className="user-item">
                {username}
                {valueToReturn ? ` - ${valueToReturn}` : ''}
                {displayRemoveButton && (
                    <button className="remove-button" onClick={handleRemoveUser}>X</button>
                )}
            </div>
        </div>
    );
};

export default UserItem;