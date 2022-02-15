/**
 * File for exporting validation functions
*/

module.exports = {
    // returns array of all validation error messages
    getErrors: function (errors) {
        let errorList = []
        var objectKeysArray = Object.keys(errors)
        objectKeysArray.forEach(function (objKey) {
            errorList.push(errors[objKey].message)
        })
        return errorList
    },

    checkIfDefined: (value, defaultValue) => {
        if (typeof (value) !== "number") {
            if (value !== undefined && value !== null) {
                return value
            }
        }
        else {
            if (value !== undefined && value !== null && isNaN(value) === false) {
                return value
            }
        }
        return defaultValue
    },

    checkIfEmpty: (value) => {
        if (value === "") return "Unanswered"
        else return value
    },

    checkIfObjDefined: (obj, defaultObj) => {
        if (obj !== undefined && obj !== null) {
            if (Object.keys(obj).length !== 0) return obj
            else return defaultObj
        }
        return defaultObj
    }
}