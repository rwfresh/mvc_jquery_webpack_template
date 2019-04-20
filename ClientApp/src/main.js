import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../styles/site.css';

import $ from 'jquery';

window.jQuery = $;
window.$ = $;
window.jquery = $;

import 'popper.js';
import 'bootstrap';

//Add a namspace
window.MyWebApp = {};

var Routes = {
    Home: {
        init: function () {
            // controller-wide code
        },
        NewJsPage: function () {
            // action-specific code
            import("./newJsPage").then((module) => {
                window.MyWebApp.newJsPage = module.newJsPage;
            });
        },
        Privacy: function () {
            // Privacy action code
        }
    }
};

var Router = {
    exec: function (controller, action) {
        action = action === undefined ? "init" : action;

        if (controller !== "" && Routes[controller] && typeof Routes[controller][action] === "function") {
            Routes[controller][action]();
        }
    },

    init: function () {
        let body = document.body;
        let controller = body.getAttribute("data-controller");
        let action = body.getAttribute("data-action");

        Router.exec(controller);
        Router.exec(controller, action);

    }
};


//run this immediately
Router.init();



