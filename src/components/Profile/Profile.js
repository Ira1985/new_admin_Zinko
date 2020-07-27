import React, { Component } from 'react';
import './profile.scss';
import {withTranslation} from "react-i18next";
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {BreadCrumb} from 'primereact/breadcrumb';
import DataGridView from "../layouts/DataGridView/DataGridView";
import {AutoComplete} from "primereact/autocomplete";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from 'primereact/inputtextarea';
import logo from '../../assets/img/Rectangle.png'

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: {},
            departments: [],
        }


    }

    toolbarButtons = [
        {
            label: 'baseLayout.main.buttons.buttonSave',
            className:'button-success',
            onClick: (e, thisEl) => {
                this.addItem();
            }
        }
    ];

    onChangeMethod(e, key) {
        let obj = Object.assign({}, this.state.item);
        obj[key] = e.value;
        this.setState({ item: obj })
    }

    render(){

        const {t, dopToolbarButtons} = this.props;

        const {item, departments} = this.state;

        let toolbarButs = dopToolbarButtons? Array.concat(this.toolbarButtons, dopToolbarButtons): this.toolbarButtons;

        let  breadcrumbs = [{ "label": t('profile.breadcrumbs.name')}];

        return (<div className={'base-layout'}>
            <div className='main-section'>
                <div className='header'>
                    <Toolbar>
                        <div className="p-toolbar-group-left">
                            <BreadCrumb model={breadcrumbs} home={{label: 'Главная', icon: 'pi pi-home', url: 'dashboard'}} />
                        </div>
                        <div className="p-toolbar-group-right">
                            {(toolbarButs && toolbarButs.length > 0) &&
                            toolbarButs.map((button, index) =>
                                <Button key={'toolbar_but_' + index} label={t(button.label)} className={button.className}  onClick={(e) => button.onClick(e, this)} tooltip={button.tooltip}/>
                            )}

                        </div>
                    </Toolbar>
                </div>

                <hr/>

                <div className='base-data-section'>
                    <div className={"profile-main"}>
                        <div className='edit-grid-left'>
                            <div className={'edit-grid-main'}>
                                <div className={'edit-grid-logo'}>
                                    <img className={'account-logo'} src={logo}  alt={''} />
                                </div>
                                <div>
                                    Admin
                                </div>
                            </div>
                            <div className={'edit-grid-password'}>
                                <p>{t("baseLayout.editProfile.password")}</p>
                                <div className='edit-grid-container'>
                                    <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProfile.oldPassword")}</label></div>
                                    <div className="p-col-9" style={{padding:'.5em'}}>
                                        <InputText value={item.familyName} onChange={(e) => this.onChangeMethod(e, 'oldPassword')}/>
                                    </div>
                                </div>
                                <div className='edit-grid-container'>
                                    <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProfile.newPassword")}</label></div>
                                    <div className="p-col-9" style={{padding:'.5em'}}>
                                        <InputText value={item.seriesName} onChange={(e) => this.onChangeMethod(e, 'newPassword')}/>
                                    </div>
                                </div>
                                <div className='edit-grid-container'>
                                    <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProfile.repeatPassword")}</label></div>
                                    <div className="p-col-9" style={{padding:'.5em'}}>
                                        <InputText value={item.modelName} onChange={(e) => this.onChangeMethod(e, 'repeatPassword')}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='edit-grid-right'>
                            <p>{t("baseLayout.editProfile.basic")}</p>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProfile.login")}</label></div>
                                <div className="p-col-9" style={{padding:'.5em'}}>
                                    <InputText value={item.familyName} onChange={(e) => this.onChangeMethod(e, 'login')}/>
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProfile.department")}</label></div>
                                <div className="p-col-9" style={{padding:'.5em'}}>

                                    <AutoComplete value={item.manufacturerName} suggestions={this.state.filteredItems} completeMethod={(e) => this.filterItems(e, departments)} size={30} minLength={1}
                                                  field='name'
                                                  dropdown={true} onChange={(e) => this.onChangeMethod(e, 'department')} />
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProfile.comment")}</label></div>
                                <div className="p-col-9" style={{padding:'.5em'}}>
                                    <InputTextarea rows={5} cols={30} value={item.comment} onChange={(e) => this.onChangeMethod(e, 'comment')}/>
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProfile.name")}</label></div>
                                <div className="p-col-9" style={{padding:'.5em'}}>
                                    <InputText value={item.familyName} onChange={(e) => this.onChangeMethod(e, 'name')}/>
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProfile.secondName")}</label></div>
                                <div className="p-col-9" style={{padding:'.5em'}}>
                                    <InputText value={item.seriesName} onChange={(e) => this.onChangeMethod(e, 'secondName')}/>
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProfile.lastName")}</label></div>
                                <div className="p-col-9" style={{padding:'.5em'}}>
                                    <InputText value={item.modelName} onChange={(e) => this.onChangeMethod(e, 'lastName')}/>
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProfile.code")}</label></div>
                                <div className="p-col-9" style={{padding:'.5em'}}>
                                    <InputText value={item.comment} onChange={(e) => this.onChangeMethod(e, 'code')} disabled={true}/>
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProfile.e-mail")}</label></div>
                                <div className="p-col-9" style={{padding:'.5em'}}>
                                    <InputText value={item.comment} onChange={(e) => this.onChangeMethod(e, 'e-mail')}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default withTranslation()(Profile);