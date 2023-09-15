import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { pwaTrackingListeners } from "./pwaEventListeners";
import { compareAppVersion } from "./util";

const isBrowser = typeof window !== "undefined";

if (isBrowser) {
    pwaTrackingListeners();
}

compareAppVersion();

let newWorker;

function showUpdateBar() {
    let snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
}

// The click event on the pop up notification
document.getElementById("reload").addEventListener("click", function () {
    newWorker.postMessage({ action: "skipWaiting" });
});

if (isBrowser && "serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
            registration.update();
        }
    });
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register(process.env.PUBLIC_URL + "/service-worker.js")
            .then((reg) => {
                console.log("Service worker registered");

                reg.addEventListener("updatefound", () => {
                    // A wild service worker has appeared in reg.installing!
                    newWorker = reg.installing;

                    newWorker.addEventListener("statechange", () => {
                        // Has network.state changed?
                        switch (newWorker.state) {
                            case "installed":
                                if (navigator.serviceWorker.controller) {
                                    // new update available
                                    showUpdateBar();
                                }
                                // No update available
                                break;
                        }
                    });
                });
            })
            .catch((err) => {
                console.log("Service worker registration failed", err);
            });
    });

    let refreshing;
    navigator.serviceWorker.addEventListener("controllerchange", function () {
        if (refreshing) return;
        window.location.reload();
        refreshing = true;
    });
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
