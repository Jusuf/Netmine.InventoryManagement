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
    var Orders, OrderStatus;
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
            let Orders = class Orders {
                constructor(http, json, router) {
                    this.http = http;
                    this.router = router;
                }
                activate() {
                    this.fetchOrdersByStatus(OrderStatus.Active);
                }
                fetchOrdersByStatus(status) {
                    status = 1;
                    return this.http.fetch(`http://localhost:64889/api/order/${status}`).
                        then(response => response.json()).then(data => {
                        this.activeOrders = data;
                    });
                }
            };
            Orders = __decorate([
                aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_fetch_client_1.json, aurelia_router_1.Router)
            ], Orders);
            exports_1("Orders", Orders);
            (function (OrderStatus) {
                OrderStatus[OrderStatus["New"] = 0] = "New";
                OrderStatus[OrderStatus["Active"] = 1] = "Active";
                OrderStatus[OrderStatus["Completed"] = 2] = "Completed";
            })(OrderStatus || (OrderStatus = {}));
        }
    }
});
//# sourceMappingURL=orders.js.map