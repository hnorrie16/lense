import React from 'react'
import classes from './Button.module.css'

const Button = (props) => {
    return (
        <button
            className={props.buttonType === "primary" ? [props.class, classes.Primary, props.classCustom].join(" ") : [props.classCustom, props.class, classes.Secondary].join(" ")}
            disabled={props.disabled}
            onClick={props.clicked}
            type="button"
        >
            {props.children}
        </button>

    )
}

export default Button