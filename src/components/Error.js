import React from 'react'

const Error = ({message}) => {
    return ( 
        <p className="my-e p-4 text-center alert alert-primary">{message}</p>
    );
}
 
export default Error;