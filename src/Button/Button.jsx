import React from "react";
// import { useMemo } from "react";
import './Button.css';

// const Button = ({type,children,buttonStyle,buttonSize,onClick}) => {
//     return <button type={type} onClick={onClick} className={`btn ${buttonStyle} ${buttonSize}`}>{children}</button>
// };

const Button = React.memo(({type,children,buttonStyle,buttonSize,onClick}) => {
    return <button type={type} onClick={onClick} className={`btn mx-1 ${buttonStyle} ${buttonSize}`}>{children}</button>
});

export default Button;