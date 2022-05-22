import React from "react";
import Spinner from "../../img/spinner.gif";
import './index.css';

function LoadingSpinner() {
    return (
        <div className="fp-container">
            <img src={Spinner} className="fp-loader" alt="loading" />
        </div>
    );
}

export default LoadingSpinner;
