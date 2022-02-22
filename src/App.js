import "./App.css";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>PWA Test Application All New</h1>
                <p>App Version: v{localStorage.getItem('AppVersion')}</p>
            </header>
        </div>
    );
}

export default App;
