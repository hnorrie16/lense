/* 
    This is an overlay component shown behind all modals
    The overlay acts like a button and when clicked the modal will close
    The overlay works like a container for modal as it will enable scrolling for modals if they go beyond the bottom of the screen
*/
import React from "react"
import classes from './Overlay.module.css';
//displays the overlay
const Overlay = props =>
     (
        <div
            className={props.show ?[classes.overlay, props.classCustom].join(' '): [classes.overlay, classes.hideOverlay].join(' ')}
            tabIndex={-1}
        >
            <div
                role="button"
                onClick={props.close}
                className={classes.exitModalDiv}
            >
            </div>
            {props.children}
        </div>
    ) 

export default Overlay