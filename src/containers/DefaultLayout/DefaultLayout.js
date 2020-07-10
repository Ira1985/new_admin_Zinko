import React, { Component, lazy, Suspense } from 'react';
import {Redirect, Route, Switch, Router} from 'react-router-dom';
import {withTranslation} from "react-i18next";
import NavigationBaseMenu from "../../components/Menus/NavigationBaseMenu/NavigationBaseMenu";
import NavigationTreeMenu from "../../components/Menus/NavigationTreeMenu/NavigationTreeMenu";
import {routes} from "../../routes";

class DefaultLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTreeMenu: true,
            hideTreeMenu: true,
        };
    }

    loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

    showTreeMenu() {
        this.setState(prev => ({
            activeTreeMenu: !prev.activeTreeMenu,
            hideTreeMenu: !prev.hideTreeMenu
        }));
    }

    onHideTreeMenu() {
        this.setState(prev => ({
            activeTreeMenu: !prev.activeTreeMenu,
            hideTreeMenu: !prev.hideTreeMenu
        }));
    }

    render() {

        const {activeTreeMenu, hideTreeMenu} = this.state;

        return (
            <div className='cs-admin-main'>
                <Suspense fallback={this.loading()}>
                    <NavigationBaseMenu activeTreeMenu={activeTreeMenu} baseMenuFunc={() => this.showTreeMenu()}/>
                </Suspense>
                {hideTreeMenu && <Suspense fallback={this.loading()}>
                    <NavigationTreeMenu show={activeTreeMenu} onHide={() => this.onHideTreeMenu()}/>
                </Suspense>}
                <div className='main-block'>
                        <Suspense fallback={this.loading()}>
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
                        </Suspense>
                </div>
            </div>

        );
    }
}

export default withTranslation()(DefaultLayout);