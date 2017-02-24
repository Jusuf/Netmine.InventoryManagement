import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
import {Router} from 'aurelia-router';

@inject(HttpClient, json, Router)
export class Orders {

    router: Router;
    selectedOrder: IOrderDetails;
    activeOrders: Array<IOrder>;

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
}

enum OrderStatus {
    New = 0,
    Active = 1,
    Completed = 2
}

