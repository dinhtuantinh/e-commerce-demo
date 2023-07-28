import React from 'react';
import notfound from './../assets/notfound.jpg';
import './../css/NotFound.css';

const NotFound = () => {
    return (
        <div className="error">
            <img src={notfound} className="imgNotFound" alt="not found"/>
        </div>
    )
}

export default NotFound;