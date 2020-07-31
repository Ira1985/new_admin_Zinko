import React, { Component, lazy, Suspense } from 'react';
import './App.scss';
import Loadable from 'react-loadable';
import {Redirect, Route, Switch, Router} from 'react-router-dom';
import {createBrowserHistory} from "history";

export const history = createBrowserHistory();

export const informer = React.createRef();

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

const Login = Loadable({
    loader: () => import('./components/Login/Login'),
    loading
});

const DefaultLayout = Loadable({
    loader: () => import('./components/layouts/DefaultLayout/DefaultLayout'),
    loading
});

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('cs2_user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />);

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div className='cs-admin'>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/login" name="Страница входа" component={Login} />
                        <PrivateRoute path="/" name="Главная" component={DefaultLayout} />
                    </Switch>
                </Router>
            </div>
        )
    };
}

export default App;
