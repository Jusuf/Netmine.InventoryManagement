﻿import moment from "moment";

export class DateFormatValueConverter {
    toView(value) {
        return moment(value).format("D/M/YYYY");
    }
}