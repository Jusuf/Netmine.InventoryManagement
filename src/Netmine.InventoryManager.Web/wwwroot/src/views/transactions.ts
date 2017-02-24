import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
import {Router} from 'aurelia-router';
import moment from "moment";

@inject(HttpClient, json, Router)

export class Transactions {

    self: this;
    router: Router;

    transactions: Array<ITransaction>;
    racks: Array<IRack>;
    articles: Array<IArticle>;
    selectedArticleId: string;


    statesSelect: string;
    stateSelected: string;

    transactionDate: Date;
    articleNumber: string;
    articleName: string;
    batchNumber: string;
    orderNumber: string;
    rackId: string;
    amount: number;

    constructor(private http: HttpClient, json, router: Router) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('api/');
        });
        this.router = router;
    }

    activate() {
        this.fetchAllRacks()
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
        debugger;
        this.http.fetch("transaction/", {
            method: "post",
            body: json(transaction)

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
        this.transactionDate = new Date(Date.now());
        this.articleName = "";
        this.articleNumber = "";
        this.batchNumber = "";
        this.orderNumber = "";
        this.amount = 0;
        this.rackId = "";
    }

    attached() {

        this.transactionDate = new Date(Date.now());

        $("#artnr").autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: "api/article/searchByNumber?number=" + request.term,
                    dataType: "json",
                    data: {
                        q: request.term
                    },
                    success: function (data) {
                        response(
                            $.map(data, function (item) {
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

        }
        )
    }

    fetchAllArticles() {
        return this.http.fetch("article").
            then(response => response.json()).then(data => {
                this.articles = data;
            });
    }

}

export interface ITransaction {
    id: string;
    articleNumber: string;
    articleName: string;
    batchNumber: string;
    orderNumber: string;
    transactionType: number;
    amount: number;
    articleId: string;
    rackId: string;
}

export interface IRack {
    id: string;
    name: string;
}

export interface IArticle {
    id: string;
    number: string;
    name: string;
}

