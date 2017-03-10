import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
import {Router} from 'aurelia-router';
import {DateFormatValueConverter} from '../../src/components/date-format';
//import "datatables";

@inject(HttpClient, json, Router, DateFormatValueConverter)

export class Transactions {

    dateformat: DateFormatValueConverter;
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

    constructor(private http: HttpClient, json, router: Router, dateFormat: DateFormatValueConverter) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('api/');
        });
        this.router = router;
        this.dateformat = dateFormat;
    }

    activate() {
        this.fetchAllRacks()
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
            body: json(transaction)

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

    async attached() {

        this.displayDatatable()

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
    async displayDatatable(){
    let response = await this.http.fetch("transaction");
    this.transactions = await response.json();
    var table = $('#transactiontable').DataTable({
        data: this.transactions,
        columns: [
            { "data": "transactionType", title: "Typ" },
            { "data": "orderOut", title: "Ordernr ut" },
            { "data": "orderIn",title: "Ordernr in" },
            { "data": "articleNumber",title: "Artnr." },
            { "data": "articleName",title: "Benämning" },
            { "data": "batchNumber",title: "Batchnr" },
            { "data": "amount",title: "Antal" },
            { "data": "rackName",title: "Lagerplats" },
            { "data": "date",title: "Datum" }
        ]
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
    date: string;
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

