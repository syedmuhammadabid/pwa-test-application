import "./App.css";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>PWA Test Application</h1>
                <p>App Version: v{localStorage.getItem("AppVersion")}</p>
                <div id="snackbar">
                    A new version of this app is available. Click{" "}
                    <a id="reload">here</a> to update.
                </div>
            </header>
        </div>
    );
}

export default App;
