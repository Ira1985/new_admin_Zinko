import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import './login.scss'
import back from '../../assets/img/szabo-viktor-rM_NWTFYUb4-unsplash.png'
import {Button} from "primereact/button";
import {InputText} from 'primereact/inputtext';
import {history} from "../../App";
import {accountService} from "../../service/account.service";

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

    login() {
        const {username, password} = this.state;
        accountService.login(username, password).then(
            response => {

                console.log('login comp',response);

                if(response) {
                    history.push('/');
                }
            },
            error => {}
        );
    }

    render() {

        const {t} = this.props;
        const { username, password } = this.state;

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
                    <Button label={t('loginLayout.buttonLogIn')} className={'button-bottom-unload'}  onClick={(e) => this.login()} tooltip={''}/>
                    <div className="p-inputgroup-last">
                        <div>{t("loginLayout.forgotPassword")}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(Login);
