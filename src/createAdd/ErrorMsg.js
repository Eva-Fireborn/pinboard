import React from 'react';

const ErrorMsg = props => {

    return (
        <div className="userErrorMessage">
            {props.children === '' ? null : props.children}
        </div>
    );
};

export default ErrorMsg;