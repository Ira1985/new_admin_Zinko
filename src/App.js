import React, { Component } from 'react';
import './App.scss';
//import 'primereact/resources/themes/nova-dark/theme.css';
//import 'primereact/resources/primereact.min.css';
//import 'primeicons/primeicons.css';
//import "primeflex/primeflex.css"
import {Tree} from 'primereact/tree';
import {Redirect, Route, Switch, Router} from 'react-router-dom';
import {createBrowserHistory} from "history";
import { MenuService } from "./service/menu.service";
import { routes } from "./routes";


import logo from '../src/assets/img/Rectangle.png';
import NavigationBaseMenu from "./components/Menus/NavigationBaseMenu/NavigationBaseMenu";
import NavigationTreeMenu from "./components/Menus/NavigationTreeMenu/NavigationTreeMenu";

export const history = createBrowserHistory();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: null
        }
        this.menu = new MenuService();
    }

    componentDidMount() {
        this.getTokenData("Admin", "1111").then(res => {
        });
        this.setState({nodes: this.menu.getMenu()})
    }

    getTokenData(login, password) {
        let obj = {
            username: login,
            password: password
        }
        return fetch('http://212.24.48.52:8080/content/auth', {
            method: 'POST',
            //credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                }
                return Promise.reject();
            }).then(res => {
                sessionStorage.setItem('tokenData', res.token);
            });
    }

    render() {
        return (
            <div className='cs-admin-main'>

                <NavigationBaseMenu />

                <NavigationTreeMenu />

                <Router history={history}>
                    <Switch>
                        {routes.map((route, idx) => {
                            return route.component ? (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={props => (
                                        <route.component {...props} />
                                    )}/>
                            ) : (null);
                        })}
                        <Redirect from="/" to="/dashboard"/>
                    </Switch>
                </Router>
            </div>
        )
    };
}

export default App;
