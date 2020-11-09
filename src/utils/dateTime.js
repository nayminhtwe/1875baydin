const moment = require('moment')
moment.suppressDeprecationWarnings = true

exports.now = (format = "YYYY-M-D H:mm:s") => {
    return moment().format(format)
}

exports.addDatesFromNow = (days, date, format = "YYYY-M-D H:mm:s") => {
    const number = days.split(" ")[0]
    const unit = days.split(" ")[1]
    return moment(date).add(number, unit).format(format)
}

exports.checkValidDate = (date_range, date) => {
    const {start_date, end_date} = date_range;
    return moment(date).isBetween(this.format(start_date),this.format(end_date), undefined, [])
}

exports.format = (date) => {
    return moment(date).format('YYYY-M-D')
}