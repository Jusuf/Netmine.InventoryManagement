import moment from "moment";

export class DateFormatValueConverter {
    toView(value) {
        if (moment.isDate(value)) {
            return moment(value).format("D/M/YYYY");
        }
        else {
            var dateFromString = new Date(value);
            return moment(dateFromString).format("D/M/YYYY");
        }
    }

    getDate() {
        return moment().toDate();
    }
}