import React from 'react';
import {Bars} from "react-loader-spinner";

const Loader = () => {
    return (
        <div className='loader'>
            <Bars heigth="100" width="100" color="grey" ariaLabel="loading-indicator" />
        </div>
    );
};

export default Loader;