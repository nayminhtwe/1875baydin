const moment = require('moment')

exports.now = (format = "YYYY-M-D H:mm:s") => {
    return moment().format(format)
}

exports.addDatesFromNow = (days, date, format = "YYYY-M-D H:mm:s") => {
    const number = days.split(" ")[0]
    const unit = days.split(" ")[1]
    return moment(date).add(number, unit).format(format)
}
