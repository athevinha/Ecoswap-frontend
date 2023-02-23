import './App.css';
import { Web3ReactProvider } from '@web3-react/core';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Web3 from 'web3';
import Application from './pages/Application';
import PoolPage from './pages/PoolPage';
import Main from './pages/Main';

function App() {

    function getLibrary(provider: any) {
        return new Web3(provider);
    }

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/app">
                        <Application />
                    </Route>
                    <Route exact path="/pool/:pair">
                        <PoolPage />
                    </Route>
                    <Route exact path="/">
                        <Main />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Web3ReactProvider>
    )
}

export default App;
