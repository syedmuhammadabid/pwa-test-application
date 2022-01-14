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

if (isBrowser && "serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
            registration.update();
        }
    });
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(() => {
                console.log("Service worker registered");
            })
            .catch((err) => {
                console.log("Service worker registration failed", err);
            });
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
