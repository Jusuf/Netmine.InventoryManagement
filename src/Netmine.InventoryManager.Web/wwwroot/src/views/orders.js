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
                    http.configure(config => {
                        config
                            .useStandardConfiguration()
                            .withBaseUrl('api/');
                    });
                    this.router = router;
                }
                activate() {
                    this.fetchOrdersByStatus(OrderStatus.Active);
                    toastr.info('test');
                }
                fetchOrdersByStatus(status) {
                    return this.http.fetch(`order/${status}`).
                        then(response => response.json()).then(data => {
                        this.activeOrders = data;
                    });
                }
                showOrderDetails(order) {
                    let id = order.id;
                    return Promise.all([
                        this.http.fetch(`order/details/${id}`)
                            .then(response => response.json()).then(data => {
                            this.selectedOrder = data.value;
                        }),
                    ]);
                }
                completeOrder(order) {
                    var totalAmount = 0;
                    if (!order) {
                        alert("No order selected");
                        return;
                    }
                    if (this.selectedOrder.orderRows.length == 0) {
                        alert("Ordern har inga orderrader!");
                        return;
                    }
                    this.selectedOrder.cargo.forEach((function (cargoItem) {
                        if (cargoItem.takeAmount > cargoItem.amount) {
                            alert("Du kan inte ta mer än vad som finns på lager!");
                            return;
                        }
                        totalAmount += cargoItem.takeAmount;
                    }));
                    if (totalAmount == 0) {
                        alert("Du måste ta mer än noll av något!");
                        return;
                    }
                    this.selectedOrder.cargo;
                    //send order ID and cargo array
                    this.http.fetch("order/complete", {
                        method: "post",
                        body: aurelia_fetch_client_1.json(this.selectedOrder)
                    }).then(response => {
                        {
                            console.log("Order complete: ", response);
                        }
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