//updates the object with its new properties
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

//checks if the value is empty, and sets a default value if it is
export const checkIfDefined = (value, defaultValue) => {
    if (value !== undefined && value !== null) {
        return value
    }
    return defaultValue
};

// used to format the time so that it matches the format required on the backend
export const timeFormatter = (time) => {
    const timeList = time.split(":")
    let hh = timeList[0] 
    let mm = timeList[1] 
    let ss = timeList[2] 
    if (hh.length < 2) hh = "0" + timeList[0]
    return hh + ":" + mm + ":" + checkIfDefined(ss, "00")
}