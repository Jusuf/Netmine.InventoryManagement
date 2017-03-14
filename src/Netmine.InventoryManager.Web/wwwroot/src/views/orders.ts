import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
import {Router} from 'aurelia-router';

@inject(HttpClient, json, Router)
export class Orders {

    router: Router;
    selectedOrder: IOrderDetails;
    activeOrders: Array<IOrder>;
    takeAmount: Array<number>;

    constructor(private http: HttpClient, json, router: Router) {
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
            body: json(this.selectedOrder)

        }).then(response => {
            {
                console.log("Order complete: ", response);

                //todo: refresh page...
            }
        });
    }
}

export interface IOrder {
    id: string;
    status: number;
    message: string;
    createdById: string;
    recipientId: string;
}

export interface IOrderDetails {
    id: string;
    date: Date;
    createdByUserName: string;
    recipientName: string;
    address: string;
    zipCode: number;
    city: string;
    message: string;
    orderRows: Array<IOrderRow>;
    cargo: Array<ICargo>;
}

export interface IOrderRow {
    id: string;
    articleName: string;
    amount: number;
}

export interface ICargo {
    id: string;
    amount: number;
    batchNumber: string;
    blockedAmount: number;
    rackName: string;
    takeAmount: number;
}

enum OrderStatus {
    New = 0,
    Active = 1,
    Completed = 2
}

