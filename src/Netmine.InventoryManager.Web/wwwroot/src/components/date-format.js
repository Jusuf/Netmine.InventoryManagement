System.register(["moment"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var moment_1;
    var DateFormatValueConverter;
    return {
        setters:[
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            class DateFormatValueConverter {
                toView(value) {
                    if (moment_1.default.isDate(value)) {
                        return moment_1.default(value).format("D/M/YYYY");
                    }
                    else {
                        var dateFromString = new Date(value);
                        return moment_1.default(dateFromString).format("D/M/YYYY");
                    }
                }
                getDate() {
                    return moment_1.default().toDate();
                }
            }
            exports_1("DateFormatValueConverter", DateFormatValueConverter);
        }
    }
});
//# sourceMappingURL=date-format.js.map