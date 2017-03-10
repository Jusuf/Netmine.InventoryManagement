System.register(["aurelia-framework", "aurelia-fetch-client", 'aurelia-router', '../../src/components/date-format'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, aurelia_fetch_client_1, aurelia_router_1, date_format_1;
    var Transactions;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_fetch_client_1_1) {
                aurelia_fetch_client_1 = aurelia_fetch_client_1_1;
            },
            function (aurelia_router_1_1) {
                aurelia_router_1 = aurelia_router_1_1;
            },
            function (date_format_1_1) {
                date_format_1 = date_format_1_1;
            }],
        execute: function() {
            //import "datatables";
            let Transactions = class Transactions {
                constructor(http, json, router, dateFormat) {
                    this.http = http;
                    http.configure(config => {
                        config
                            .useStandardConfiguration()
                            .withBaseUrl('api/');
                    });
                    this.router = router;
                    this.dateformat = dateFormat;
                }
                activate() {
                    this.fetchAllRacks();
                    this.fetchAllTransactions();
                    this.fetchAllArticles();
                }
                saveTransaction() {
                    this.selectedArticleId = $("#artnr").attr("articleId");
                    let transaction = {
                        id: "",
                        date: this.transactionDate,
                        articleNumber: this.articleNumber,
                        articleName: this.articleName,
                        batchNumber: this.batchNumber,
                        orderNumber: this.orderNumber,
                        rackId: this.rackId,
                        amount: this.amount,
                        transactionType: 30,
                        articleId: this.selectedArticleId
                    };
                    this.http.fetch("transaction/", {
                        method: "post",
                        body: aurelia_fetch_client_1.json(transaction)
                    }).then(response => {
                        this.fetchAllTransactions();
                        console.log("transaction added: ", response);
                        this.clearTransaction();
                        this.fetchAllRacks();
                    });
                }
                fetchAllTransactions() {
                    return this.http.fetch("transaction").
                        then(response => response.json()).then(data => {
                        this.transactions = data;
                    });
                }
                fetchAllRacks() {
                    return this.http.fetch("rack").
                        then(response => response.json()).then(data => {
                        this.racks = data;
                    });
                }
                clearTransaction() {
                    this.transactionDate = this.dateformat.getDate();
                    this.articleName = "";
                    this.articleNumber = "";
                    this.batchNumber = "";
                    this.orderNumber = "";
                    this.amount = 0;
                    this.rackId = "";
                }
                attached() {
                    var dataSet = [
                        ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
                        ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
                        ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"],
                        ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060"],
                        ["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700"],
                        ["Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000"],
                        ["Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500"],
                        ["Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900"],
                        ["Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500"],
                        ["Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600"],
                        ["Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560"],
                        ["Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000"],
                        ["Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600"],
                        ["Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500"],
                        ["Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750"],
                        ["Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500"],
                        ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000"],
                        ["Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500"],
                        ["Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000"],
                        ["Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500"],
                        ["Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000"],
                        ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000"],
                        ["Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450"],
                        ["Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600"],
                        ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000"],
                        ["Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575"],
                        ["Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650"],
                        ["Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850"],
                        ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000"],
                        ["Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000"],
                        ["Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400"],
                        ["Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500"],
                        ["Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000"],
                        ["Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500"],
                        ["Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050"],
                        ["Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675"]
                    ];
                    $(document).ready(function () {
                        $('#example').DataTable({
                            data: dataSet,
                            columns: [
                                { title: "Name" },
                                { title: "Position" },
                                { title: "Office" },
                                { title: "Extn." },
                                { title: "Start date" },
                                { title: "Salary" }
                            ]
                        });
                    });
                    //$("#transactiontable").DataTable({
                    //});
                    this.transactionDate = this.dateformat.getDate();
                    $("#artnr").autocomplete({
                        source: function (request, response) {
                            $.ajax({
                                url: "api/article/searchByNumber?number=" + request.term,
                                dataType: "json",
                                data: {
                                    q: request.term
                                },
                                success: function (data) {
                                    response($.map(data, function (item) {
                                        return {
                                            label: item.number + " " + item.name,
                                            number: item.number,
                                            name: item.name,
                                            id: item.id
                                        };
                                    }));
                                }
                            });
                        },
                        minLength: 3,
                        select: function (event, ui) {
                            event.preventDefault();
                            console.log(ui.item ?
                                "Selected: " + ui.item.label :
                                "Nothing selected, input was " + this.value);
                            $("#artnr").val(ui.item.number);
                            $("#artnr").attr("articleId", ui.item.id);
                            $("#artname").val(ui.item.name);
                        },
                        search: function (event, ui) {
                            $("#artnr").removeAttr("articleId");
                            $("#artname").val("");
                        },
                        open: function () {
                            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
                        },
                        close: function () {
                            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
                        }
                    });
                }
                fetchAllArticles() {
                    return this.http.fetch("article").
                        then(response => response.json()).then(data => {
                        this.articles = data;
                    });
                }
            };
            Transactions = __decorate([
                aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_fetch_client_1.json, aurelia_router_1.Router, date_format_1.DateFormatValueConverter)
            ], Transactions);
            exports_1("Transactions", Transactions);
        }
    }
});
//# sourceMappingURL=transactions.js.map