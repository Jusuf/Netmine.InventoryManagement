import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(Router)
export class App {
    router: Router;

    constructor() { }

    configureRouter(config, router: Router) {
        this.router = router;

        config.title = "AureliaTSapp";
        config.map([
            { route: ["", "todos"], moduleId: "./views/todos", nav: true, title: "Todos" },
            { route: "article", name: "article", moduleId: "./views/articles", nav: true, title: "Articles" },
            { route: "articleDetails/:id", name: "articleDetails", moduleId: "./views/articleDetails", title: "Article details" }
        ]);
    }
}