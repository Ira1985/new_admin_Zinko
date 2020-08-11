import React, { Component, lazy, Suspense } from 'react';
import {Redirect, Route, Switch, Router} from 'react-router-dom';
import {withTranslation} from "react-i18next";
import NavigationBaseMenu from "../../components/Menus/NavigationBaseMenu/NavigationBaseMenu";
import NavigationTreeMenu from "../../components/Menus/NavigationTreeMenu/NavigationTreeMenu";
//import AccountMenu from "../../Menus/AccountMenu/AccountMenu";
import {routes} from "../../routes";
import {ToastContainer} from "react-toastify";
import {Growl} from "primereact/growl";
import {informer} from "../../App";

class DefaultLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTreeMenu: false,
            hideTreeMenu: false,
            activeAccountMenu: false,
        };
    }

    loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

    showTreeMenu() {
        this.setState(prev => ({
            activeTreeMenu: !prev.activeTreeMenu,
            hideTreeMenu: !prev.hideTreeMenu,
            activeAccountMenu: false
        }));
    }

    showAccountMenu() {
        this.setState(prev => ({
            activeAccountMenu: !prev.activeAccountMenu,
            activeTreeMenu: false,
            hideTreeMenu: false,
        }))
    }

    onHideTreeMenu() {
        this.setState(prev => ({
            activeTreeMenu: !prev.activeTreeMenu,
            hideTreeMenu: !prev.hideTreeMenu
        }));
    }

    render() {

        const {activeTreeMenu, hideTreeMenu, activeAccountMenu} = this.state;

        return (
            <div className='cs-admin-main'>
                <div className="animated">
                    {/*<ToastContainer position="bottom-right" autoClose={2000} style={{zIndex:2000}}/>*/}
                    <Growl ref={informer} position="bottomright" baseZIndex={2000}/>
                </div>
                <Suspense fallback={this.loading()}>
                    <NavigationBaseMenu activeTreeMenu={activeTreeMenu} activeAccountMenu={activeAccountMenu} baseMenuFunc={() => this.showTreeMenu()} showAccountMenu={() => this.showAccountMenu()}/>
                </Suspense>
                <Suspense fallback={this.loading()}>
                    {hideTreeMenu && <NavigationTreeMenu show={activeTreeMenu} onHide={() => this.onHideTreeMenu()}/>}
                    {/*{activeAccountMenu && <AccountMenu show={activeAccountMenu} showAccountMenu={() => this.showAccountMenu()}/>}*/}
                </Suspense>
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
