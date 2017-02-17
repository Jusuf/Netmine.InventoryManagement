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
    var Articles;
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
            let Articles = class Articles {
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
                }
                saveRack() {
                    let rack = {
                        Name: this.rackName,
                        Id: this.rackId
                    };
                    if (rack.Id) {
                        this.http.fetch("rack/", {
                            method: "put",
                            body: aurelia_fetch_client_1.json(rack)
                        }).then(response => {
                            this.fetchAllRacks();
                            console.log("rack edited: ", response);
                            this.clearRack();
                        });
                    }
                    else {
                        rack.Id = "";
                        this.http.fetch("rack/", {
                            method: "post",
                            body: aurelia_fetch_client_1.json(rack)
                        }).then(response => {
                            this.fetchAllRacks();
                            console.log("rack added: ", response);
                            debugger;
                            this.clearRack();
                        });
                    }
                }
                fetchAllRacks() {
                    return this.http.fetch("rack").
                        then(response => response.json()).then(data => {
                        this.racks = data;
                    });
                }
                deleteRack(rackId) {
                    this.http.fetch(`rack/${rackId}`, { method: "delete" }).then(() => {
                        this.fetchAllRacks();
                        this.clearRack();
                    });
                }
                editRack(rack) {
                    this.rackName = rack.name;
                    this.rackId = rack.id;
                }
                clearRack() {
                    this.rackName = "";
                    this.rackId = "";
                }
                showRackDetails(rackId) {
                    this.router.navigateToRoute("rackDetails", { id: rackId });
                }
            };
            Articles = __decorate([
                aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_fetch_client_1.json, aurelia_router_1.Router)
            ], Articles);
            exports_1("Articles", Articles);
        }
    }
});
//# sourceMappingURL=racks.js.map