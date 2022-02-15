/* 
    This component measures the password strength
*/
import React from 'react';
import classes from './PasswordStrengthMeter.module.css';
import zxcvbn from 'zxcvbn'

const PasswordStrengthMeter = (props) => {
    //takes the password and zxcvbn returns a result object which is used to determine the score of the password
    const testedResult = zxcvbn(props.password)
    const createPasswordLabel = (result) => {
        switch (result.score) {
            case 0:
                return 'Weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return 'Weak';
        }
    }
    return (
        <div >
            {/* displays the password strength */}
            <progress
                className={classes[`password_${createPasswordLabel(testedResult)}`]}
                value={testedResult.score}
                max="4"
            />
            <label>
                {props.password && (
                    <>
                        <strong>Password strength:</strong>
                        {createPasswordLabel(testedResult)}
                    </>
                )}
            </label>
        </div>
    );
}

export default PasswordStrengthMeter;