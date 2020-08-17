import React, { Component } from 'react';
import './profile.scss';
import {withTranslation} from "react-i18next";
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {BreadCrumb} from 'primereact/breadcrumb';
import DataGridView from "../../layouts/DataGridView/DataGridView";
import {AutoComplete} from "primereact/autocomplete";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from 'primereact/inputtextarea';
import logo from '../../assets/img/Rectangle.png'
import {departmentService} from "../../service/department.service";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: {}
        }

        this.itemTemplate = this.itemTemplate.bind(this);
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("cs2_user"));
        this.setState({item: user.identity})
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

    itemTemplate(item) {
        const {t} = this.props;
        const {newName} = this.state;
        let elem = null;
        if(item.name === "Empty object") {
            elem = <Button label={t("baseLayout.main.buttons.buttonAddNew")} className={'button-dop'} onClick={() => this.onEmpty(item)}/>
            item.name = newName
        } else
            elem = (<div className="p-clearfix">
                <div >{item.name}</div>
            </div>)
        return elem;
    }

    onEmpty(item){
        const {onEmptyLink,value} = this.props;
        const {newName} = this.state;
        let textValue = newName?newName:'';
        if(item.emptyLink) {
            let win = window.open(item.emptyLink + '&name='+textValue, '_blank');
            win.focus();
        }

    }

    filterItems(event, api, render) {
        if(api) {
            api.getCombo(event.query).then(res => {
                let data = res.pageItems;
                let results;

                if (event.query.length === 0) {
                    results = [...data];
                } else {
                    results = data.filter((item) => {
                        return item.name.toLowerCase().startsWith(event.query.toLowerCase());
                    });
                }
                if(!results.length)
                    this.itemTemplate({name: ''})
                this.setState({ filterItems: results, newName: event.query });
            })
        } else
            this.setState({ filterItems: render() });
    }

    onChangeMethod(e, key) {
        let obj = Object.assign({}, this.state.item);
        obj[key] = e.target.value;
        this.setState({ item: obj })
    }

    render(){

        const {t, dopToolbarButtons} = this.props;

        const {item} = this.state;

        let toolbarButs = dopToolbarButtons? Array.concat(this.toolbarButtons, dopToolbarButtons): this.toolbarButtons;

        let  breadcrumbs = [{ "label": t('profile.breadcrumbs.name')}];

        // bugfix for show dialog
        const root = document.getElementById('root');

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
                                    <img className={'account-logo'} src={item.avatar ? 'http://185.95.22.17/statics/' + item.avatar : logo}  alt={''} />
                                    <Button className={'delete-logo'} icon="pi pi-check" />
                                </div>
                                <div className={'edit-grid-info'}>
                                    <p>{item.fullName}</p>
                                    <span>{item.comment}</span>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>{t('baseLayout.editProfile.created')}:</td>
                                            <td>01.01.2020</td>
                                        </tr>
                                        <tr>
                                            <td>{t('baseLayout.editProfile.updated')}:</td>
                                            <td>01.01.2020</td>
                                        </tr>
                                        <tr>
                                            <td>{t('baseLayout.editProfile.lastLogetIn')}:</td>
                                            <td>{item.lastLogin}</td>
                                        </tr>
                                        </tbody>
                                    </table>
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
                                    <InputText value={item.username || ''} onChange={(e) => this.onChangeMethod(e, 'username')}/>
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProfile.department")}</label></div>
                                <div className="p-col-9" style={{padding:'.5em'}}>

                                    <AutoComplete appendTo={root}
                                                  value={item.department || ''}
                                                  suggestions={this.state.filterItems && this.state.filterItems.length ? this.state.filterItems :
                                                      [{
                                                          name: 'Empty object',
                                                          emptyLink: '/departments?id=0'
                                                      }]
                                                  }
                                                  itemTemplate={this.itemTemplate}
                                                  completeMethod={(e) => this.filterItems(e, departmentService)}
                                                  size={30}
                                                  minLength={1}
                                                  field='name'
                                                  dropdown={true}
                                                  onChange={(e) => this.onChangeMethod(e, 'department')} />
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProfile.comment")}</label></div>
                                <div className="p-col-9" style={{padding:'.5em'}}>
                                    <InputTextarea rows={5} cols={30} value={item.comment || ''} onChange={(e) => this.onChangeMethod(e, 'comment')}/>
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProfile.name")}</label></div>
                                <div className="p-col-9" style={{padding:'.5em'}}>
                                    <InputText value={item.firstName || ''} onChange={(e) => this.onChangeMethod(e, 'firstName')}/>
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProfile.secondName")}</label></div>
                                <div className="p-col-9" style={{padding:'.5em'}}>
                                    <InputText value={item.middleName || ''} onChange={(e) => this.onChangeMethod(e, 'middleName')}/>
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProfile.lastName")}</label></div>
                                <div className="p-col-9" style={{padding:'.5em'}}>
                                    <InputText value={item.lastName || ''} onChange={(e) => this.onChangeMethod(e, 'lastName')}/>
                                </div>
                            </div>
                            <div className='edit-grid-container'>
                                <div className="p-col-2" style={{padding:'.75em'}}><label htmlFor="vin">{t("baseLayout.editProfile.e-mail")}</label></div>
                                <div className="p-col-9" style={{padding:'.5em'}}>
                                    <InputText value={item.email || ''} onChange={(e) => this.onChangeMethod(e, 'email')}/>
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
