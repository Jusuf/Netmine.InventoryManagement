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
                    this.fetchAllTransactions();
                }
                saveRack() {
                    let rack = {
                        Name: this.rackName,
                        Id: this.rackId
                    };
                    if (rack.Id) {
                        this.http.fetch("transaction/", {
                            method: "put",
                            body: aurelia_fetch_client_1.json(rack)
                        }).then(response => {
                            this.fetchAllTransactions();
                            console.log("rack edited: ", response);
                            this.clearTransaction();
                        });
                    }
                    else {
                        rack.Id = "";
                        this.http.fetch("transaction/", {
                            method: "post",
                            body: aurelia_fetch_client_1.json(rack)
                        }).then(response => {
                            this.fetchAllTransactions();
                            console.log("rack added: ", response);
                            this.clearTransaction();
                        });
                    }
                }
                fetchAllTransactions() {
                    return this.http.fetch("transaction").
                        then(response => response.json()).then(data => {
                        this.racks = data;
                    });
                }
                deleteRack(transactionId) {
                    this.http.fetch(`transaction/${transactionId}`, { method: "delete" }).then(() => {
                        this.fetchAllTransactions();
                        this.clearTransaction();
                    });
                }
                editTransaction(rack) {
                    this.rackName = rack.name;
                    this.rackId = rack.id;
                }
                clearTransaction() {
                    this.rackName = "";
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