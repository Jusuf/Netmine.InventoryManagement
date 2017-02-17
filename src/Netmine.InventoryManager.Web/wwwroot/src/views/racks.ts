import {inject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
import {Router} from 'aurelia-router';

@inject(HttpClient, json, Router)
export class Articles {

    router: Router;

    racks: Array<IRack>;
    rackName: string;
    rackId: string;

    constructor(private http: HttpClient, json, router: Router) {
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
                body: json(rack)

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
                body: json(rack)

            }).then(response => {
                this.fetchAllRacks();
                console.log("rack added: ", response);
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
        this.http.fetch(`rack/${rackId}`,
            { method: "delete" }).then(() => {
                this.fetchAllRacks();
                this.clearRack();
            });

    }

    editRack(rack: IRack) {
        this.rackName = rack.name;
        this.rackId = rack.id;
    }

    clearRack() {
        this.rackName = "";
        this.rackId = "";
    }

}

export interface IRack {
    id: string;
    name: string;
}

