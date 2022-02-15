/**
 * File for exporting current time and current date
*/

module.exports = {
    //Returns the current time
    current_time: function (date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        // sets time in HH:MM:SS format
        return hours + ":" + minutes + ":" + seconds;
    },
    //Returns the current date
    current_date: function (date) {
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate()
        // sets date in YYYY-MM-DD format
        if (month < 10) {
            month = "0" + month
        }
        if (day < 10) {
            day = "0" + day
        }
        return year + "-" + month + "-" + day;
    },
    //Converts to proper time format
    convertToTimeFormat: function (time12h) {
        if(time12h === undefined) return undefined
        if(time12h === "") return ""

        const [time, modifier] = time12h.split(' ');

        let [hours, minutes, seconds] = time.split(':');


        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}:${seconds}`;
    }
}