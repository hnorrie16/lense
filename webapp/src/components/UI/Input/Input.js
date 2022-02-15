import classes from './Input.module.css'
import React from 'react'

const Input = (props) => {

    const containerStyle = [classes.Container, props.styleContainer].join(" ")
    let content = null
    let value = props.value

    let validationError = null;

    if (props.invalid && props.touched) {
        if (props.typeOfInput === 'textarea') {
            validationError = <p className={classes.ValidationErrorTextArea}>
                [{props.errorMessage}]
            </p>
        }
        else {
            validationError = <p className={classes.ValidationError}>
                [{props.errorMessage}]
            </p>
        }
    }

    switch (props.typeOfInput) {
        case "text":
            content = props.value !== undefined && props.value !== null
                ? <div className={containerStyle}>
                    <label htmlFor={props.id}>{props.label}</label>
                    <input
                        className={props.invalid && props.touched ? value === "Unanswered" ? [classes.InputInvalid, classes.TextTransform].join(" ") : [classes.InputInvalid].join(" ")
                            : value === "Unanswered" ? [classes.Input, classes.TextTransform].join(" ") : classes.Input}
                        id={props.id}
                        name={props.name}
                        type="text"
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                        value={value}
                    />
                </div> : null;
            break;
        case "textarea":
            content = <div className={containerStyle}>
                <div style ={{"display": "flex"}}><label htmlFor={props.id}>{props.label}</label>{validationError}</div>
                <textarea
                    className={props.invalid && props.touched ? value === "Unanswered" ? [classes.TextAreaInvalid, classes.TextTransform].join(" ") : [classes.TextAreaInvalid].join(" ")
                        : value === "Unanswered" ? [classes.TextArea, classes.TextTransform].join(" ") : classes.TextArea}
                    id={props.id}
                    name={props.name}
                    type="text"
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    value={props.value}
                />

            </div>
            break;
        case "time":
            content = props.value !== undefined && props.value !== null
                ? <div className={containerStyle}>
                    <label htmlFor={props.id}>{props.label}</label>
                    <input
                        id={props.id}
                        name={props.name}
                        type={value !== "Unanswered" ? "time" : "text"}
                        onChange={props.onChange}
                        value={value}
                        className={value === "Unanswered" ? classes.TextTransform : null}
                    />
                </div> : null;
            break;
        default:
            content = props.value !== undefined && props.value !== null
                ? <div className={containerStyle}>
                    <div style ={{"display": "flex"}}><label htmlFor={props.id}>{props.label}</label>{validationError}</div>
                    <input
                        className={props.invalid && props.touched ? value === "Unanswered" ? [classes.InputInvalid, classes.TextTransform].join(" ") : [classes.InputInvalid].join(" ")
                            : value === "Unanswered" ? [classes.Input, classes.TextTransform].join(" ") : classes.Input}
                        id={props.id}
                        name={props.name}
                        type="text"
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                        value={value}
                    />
                </div> : null;
            break;
    }
    return (
        content
    )
}

export default Input