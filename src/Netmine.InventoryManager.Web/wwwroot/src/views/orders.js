"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_fetch_client_1 = require("aurelia-fetch-client");
var aurelia_router_1 = require("aurelia-router");
var Orders = (function () {
    function Orders(http, json, router) {
        this.http = http;
        http.configure(function (config) {
            config
                .useStandardConfiguration()
                .withBaseUrl('api/');
        });
        this.router = router;
    }
    Orders.prototype.activate = function () {
        this.fetchOrdersByStatus(OrderStatus.Active);
    };
    Orders.prototype.fetchOrdersByStatus = function (status) {
        var _this = this;
        return this.http.fetch("order/" + status).
            then(function (response) { return response.json(); }).then(function (data) {
            _this.activeOrders = data;
        });
    };
    Orders.prototype.showOrderDetails = function (order) {
        var _this = this;
        var id = order.id;
        return Promise.all([
            this.http.fetch("order/details/" + id)
                .then(function (response) { return response.json(); }).then(function (data) {
                _this.selectedOrder = data.value;
            }),
        ]);
    };
    Orders.prototype.completeOrder = function (order) {
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
        }).then(function (response) {
            {
                console.log("Order complete: ", response);
                //todo: refresh page...
            }
        });
    };
    return Orders;
}());
Orders = __decorate([
    aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_fetch_client_1.json, aurelia_router_1.Router)
], Orders);
exports.Orders = Orders;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["New"] = 0] = "New";
    OrderStatus[OrderStatus["Active"] = 1] = "Active";
    OrderStatus[OrderStatus["Completed"] = 2] = "Completed";
})(OrderStatus || (OrderStatus = {}));
