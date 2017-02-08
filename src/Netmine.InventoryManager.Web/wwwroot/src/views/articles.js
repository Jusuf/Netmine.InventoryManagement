System.register(["aurelia-framework", "aurelia-fetch-client"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, aurelia_fetch_client_1;
    var Articles;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_fetch_client_1_1) {
                aurelia_fetch_client_1 = aurelia_fetch_client_1_1;
            }],
        execute: function() {
            let Articles = class Articles {
                constructor(http) {
                    this.http = http;
                }
                activate() {
                    this.fetchAllArticles();
                }
                saveArticle() {
                    const article = {
                        Name: this.articleName,
                        Number: this.articleNumber,
                        Id: this.articleId
                    };
                    if (article.Id) {
                        this.http.fetch("http://localhost:64889/api/article/", {
                            method: "put",
                            body: aurelia_fetch_client_1.json(article)
                        }).then(response => {
                            this.fetchAllArticles();
                            console.log("article edited: ", response);
                            this.articleName = "";
                            this.articleNumber = null;
                            this.articleId = "";
                        });
                    }
                    else {
                        this.http.fetch("http://localhost:64889/api/article/", {
                            method: "post",
                            body: aurelia_fetch_client_1.json(article)
                        }).then(response => {
                            this.fetchAllArticles();
                            console.log("article added: ", response);
                        });
                    }
                }
                fetchAllArticles() {
                    return this.http.fetch("http://localhost:64889/api/article").
                        then(response => response.json()).then(data => {
                        this.articles = data;
                    });
                }
                deleteArticle(articleId) {
                    this.http.fetch(`http://localhost:64889/api/article/${articleId}`, { method: "delete" }).then(() => { this.fetchAllArticles(); });
                }
                editArticle(article) {
                    this.articleName = article.name;
                    this.articleNumber = article.number;
                    this.articleId = article.id;
                }
            };
            Articles = __decorate([
                aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_fetch_client_1.json)
            ], Articles);
            exports_1("Articles", Articles);
        }
    }
});
//activate() {
//    return this.http.fetch("http://localhost:64889/api/values").
//        then(response => response.json()).then(data => {
//            this.values = data;
//        });
//} 
//# sourceMappingURL=articles.js.map