System.register(["aurelia-framework", "aurelia-fetch-client", 'aurelia-router', '../../src/components/date-format'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments)).next());
        });
    };
    var aurelia_framework_1, aurelia_fetch_client_1, aurelia_router_1, date_format_1;
    var Transactions, TransactionType;
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
                        transactionType: TransactionType.Received,
                        articleId: this.selectedArticleId
                    };
                    this.http.fetch("transaction/", {
                        method: "post",
                        body: aurelia_fetch_client_1.json(transaction)
                    }).then(response => {
                        console.log("transaction added: ", response);
                        this.clearTransaction();
                        this.fetchAllRacks();
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
                    return __awaiter(this, void 0, void 0, function* () {
                        this.displayDatatable();
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
                    });
                }
                fetchAllArticles() {
                    return this.http.fetch("article").
                        then(response => response.json()).then(data => {
                        this.articles = data;
                    });
                }
                displayDatatable() {
                    return __awaiter(this, void 0, void 0, function* () {
                        let response = yield this.http.fetch("transaction");
                        this.transactions = yield response.json();
                        var table = $('#transactiontable').DataTable({
                            "language": { "url": "../../language/SwedishDataTables.json" },
                            data: this.transactions,
                            columns: [
                                {
                                    "data": "transactionType",
                                    title: "Typ",
                                    "width": "10%",
                                    "render": function (data, type, row) {
                                        var transactionType = '';
                                        if (data == TransactionType.Received) {
                                            return transactionType = 'Inleverans';
                                        }
                                        if (data == TransactionType.Sent) {
                                            return transactionType = 'Utleverans';
                                        }
                                        if (data == TransactionType.Adjust) {
                                            return transactionType = 'Justering';
                                        }
                                        if (data == TransactionType.Damaged) {
                                            return transactionType = 'Skadat';
                                        }
                                    },
                                },
                                {
                                    "data": "orderNumber",
                                    title: "Ordernr ut",
                                    width: "10%",
                                    "render": function (data, type, row) {
                                        var orderNumberOut = '';
                                        if (row.transactionType == TransactionType.Sent) {
                                            return orderNumberOut = data;
                                        }
                                        else {
                                            return orderNumberOut = '';
                                        }
                                    }
                                },
                                {
                                    "data": "orderNumber",
                                    title: "Ordernr in",
                                    "render": function (data, type, row) {
                                        var orderNumberIn = '';
                                        if (row.transactionType == TransactionType.Received) {
                                            return orderNumberIn = data;
                                        }
                                        else {
                                            return orderNumberIn = '';
                                        }
                                    }
                                },
                                { "data": "article.number", title: "Artnr." },
                                { "data": "article.name", title: "Benämning" },
                                { "data": "batchNumber", title: "Batchnr" },
                                { "data": "amount", title: "Antal" },
                                { "data": "rack.name", title: "Lagerplats" },
                                {
                                    "data": "date", title: "Datum",
                                    "render": function (data, type, row) {
                                        return date_format_1.DateFormatValueConverter.convertDate(data);
                                    }
                                }
                            ]
                        });
                    });
                }
            };
            Transactions = __decorate([
                aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_fetch_client_1.json, aurelia_router_1.Router, date_format_1.DateFormatValueConverter)
            ], Transactions);
            exports_1("Transactions", Transactions);
            (function (TransactionType) {
                TransactionType[TransactionType["Received"] = 10] = "Received";
                TransactionType[TransactionType["Sent"] = 20] = "Sent";
                TransactionType[TransactionType["Adjust"] = 30] = "Adjust";
                TransactionType[TransactionType["Damaged"] = 40] = "Damaged";
            })(TransactionType || (TransactionType = {}));
            exports_1("TransactionType", TransactionType);
        }
    }
});
//# sourceMappingURL=transactions.js.map