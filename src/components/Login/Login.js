import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import './login.scss'
import back from '../../assets/img/szabo-viktor-rM_NWTFYUb4-unsplash.png'
import {Button} from "primereact/button";
import {InputText} from 'primereact/inputtext';
import {history} from "../../App";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
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

        const {t, breadcrumbs, toolbarButtons, checkedButtons, plurals,
            children, gridView, treeView, apiService, location, columns} = this.props;

        const { username, password } = this.state;

        const button = {
            label: 'loginLayout.buttonLogIn',
            className:'button-bottom-unload',
            onClick: () => {
                this.getTokenData(this.state.username, this.state.password);
                history.push('/dashboard');
            },
        }

        return (
            <div className={'admin-login-block'}>
                <div className={'admin-login-background'} style={{backgroundImage: `url(${back})`, backgroundSize: '100%'}}></div>
                <div className={'admin-login-form'}>
                    <div className="p-inputgroup-text">
                        <p className={'big'}>{t("loginLayout.enter")}</p>
                    </div>
                    <div className="p-inputgroup-text">
                        <p className={'small'}>{t("loginLayout.enterSmall")}</p>
                    </div>
                    <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                        <InputText type="text" placeholder={t("loginLayout.username")} name="username" value={username} onChange={this.handleChange} />
                    </div>
                    <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                        <InputText type="password" placeholder={t("loginLayout.password")} name="password" value={password} onChange={this.handleChange} />
                    </div>
                    <Button label={t(button.label)} className={button.className}  onClick={(e) => button.onClick()} tooltip={button.tooltip}/>
                    <div className="p-inputgroup-last">
                        <div>{t("loginLayout.forgotPassword")}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(Login);