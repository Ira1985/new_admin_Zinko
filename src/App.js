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
import Login from "./components/Login/Login";

export const history = createBrowserHistory();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTreeMenu: false,
            hideTreeMenu: false
        };
    }

    componentDidMount() {
        //this.getTokenData("Admin", "1111").then(res => {
        //});
        //this.setState({nodes: this.menu.getMenu()})
        if(history.location.pathname === '/dashboard') {
            this.setState({activeTreeMenu: true})
        }
    }

    showTreeMenu() {
        this.setState(prev => ({
            activeTreeMenu: !prev.activeTreeMenu
        }));
    }

    onHideTreeMenu() {
        this.setState(prev => ({
            activeTreeMenu: !prev.activeTreeMenu
        }));
    }

    render() {
        const {activeTreeMenu, hideTreeMenu} = this.state;
        const token = sessionStorage.tokenData;
        return (
            <div className='cs-admin'>
                {
                    token === 'false' ? <div className='cs-admin-login'>
                        <Router history={history}>
                            <Switch>
                                <Route exact path="/login" name="Страница входа" component={Login} />
                                <Redirect from="/" to="/dashboard"/>
                            </Switch>
                        </Router>
                    </div> : <div className='cs-admin-main'>
                        <NavigationBaseMenu activeTreeMenu={activeTreeMenu} baseMenuFunc={() => this.showTreeMenu()}/>
                        <NavigationTreeMenu show={activeTreeMenu} onHide={() => this.onHideTreeMenu()}/>
                        <div className='main-block'>
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
                    </div>
                }
            </div>
        )
    };
}

export default App;
