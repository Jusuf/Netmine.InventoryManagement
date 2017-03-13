import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
import {Router} from 'aurelia-router';
import {DateFormatValueConverter} from '../../src/components/date-format';

@inject(HttpClient, json, Router, DateFormatValueConverter)

export class Transactions {
    dateformat: DateFormatValueConverter;
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
            transactionType: TransactionType.Received,
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

    async displayDatatable() {

        let response = await this.http.fetch("transaction");

        this.transactions = await response.json();
        
        var table = $('#transactiontable').DataTable({
            "language": { "url": "../../language/SwedishDataTables.json"  } ,
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
                        return DateFormatValueConverter.convertDate(data);
                    }
                }
            ]
        });
    }

}

export interface ITransaction {
    id: string;
    article: IArticle;
    articleName: string;
    batchNumber: string;
    orderNumber: string;
    transactionType: number;
    amount: number;
    articleId: string;
    rack: IRack;
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

export enum TransactionType {
    Received = 10,
    Sent = 20,
    Adjust = 30,
    Damaged = 40
}



