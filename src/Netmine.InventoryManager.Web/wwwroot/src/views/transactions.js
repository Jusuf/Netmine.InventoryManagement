System.register(["aurelia-framework", "aurelia-fetch-client", 'aurelia-router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, aurelia_fetch_client_1, aurelia_router_1;
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
            }],
        execute: function() {
            let Transactions = class Transactions {
                constructor(http, json, router) {
                    this.http = http;
                    http.configure(config => {
                        config
                            .useStandardConfiguration()
                            .withBaseUrl('api/');
                    });
                    this.router = router;
                }
                activate() {
                    this.fetchAllRacks();
                    this.fetchAllTransactions();
                }
                saveTransaction() {
                    let transaction = {
                        id: "",
                        date: this.transactionDate,
                        articleNumber: this.articleNumber,
                        articleName: this.articleName,
                        batchNumber: this.batchNumber,
                        orderNumber: this.orderNumber,
                        rackId: this.rackId,
                        amount: this.amount,
                        transactionType: 30
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
                    this.transactionDate = new Date();
                    this.articleName = "";
                    this.articleNumber = "";
                    this.batchNumber = "";
                    this.orderNumber = "";
                    this.amount = 0;
                    this.rackId = "";
                }
            };
            Transactions = __decorate([
                aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_fetch_client_1.json, aurelia_router_1.Router)
            ], Transactions);
            exports_1("Transactions", Transactions);
        }
    }
});
//# sourceMappingURL=transactions.js.map