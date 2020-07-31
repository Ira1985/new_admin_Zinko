import React, { Component } from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from 'primereact/inputtextarea';
import './customerTab.scss'
import {withTranslation} from "react-i18next";
import {ProgressSpinner} from "primereact/progressspinner";
import {AutoComplete} from "primereact/autocomplete";
import {InputNumber} from 'primereact/inputnumber';
import {Checkbox} from 'primereact/checkbox';

import {TabView,TabPanel} from 'primereact/tabview';
import {getCustomerType, renderCustomerType} from "../../../../models/Customer";
import {customerService} from "../../../../service/customer.service";
import {userService} from "../../../../service/user.service";
import {Button} from "primereact/button";
import emptyImg from "../../../../assets/img/EmptyImg.png"

class CustomerEditMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }

    componentDidMount() {
    }

    render() {
        let {t, editedItem, updateValue, formikItem, formikError, formikHandler, filterItems, filter} = this.props;

        return (
            <div className='main-tab-container'>
                <div className='image-container'>
                    <div className="image-image-container">
                        <img id="uploadAvatarFile-img" key={editedItem.id}
                             src={editedItem.avatar ? 'http://185.95.22.17/statics/' + editedItem.avatar : 'http://212.24.48.52/statics/defaults/no-image2.jpg'}
                             alt={''}/>
                    </div>
                    <div className="toolbar-image-container">
                        <Button className={'but-customers grid-toolbar-unload'} icon="pi p-empty-button grid-unload-ico" tooltip={t('baseLayout.main.buttons.tooltips.buttonUnload')} tooltipOptions={{position: 'left'}} />
                        <Button className={'but-customers grid-toolbar-del'} icon="pi p-empty-button grid-import-ico" tooltip={t('baseLayout.main.buttons.tooltips.buttonImport')} tooltipOptions={{position: 'left'}} />
                    </div>
                </div>
                <div className="p-grid p-fluid">

                    <div className="p-col-4" style={{padding: '.75em'}}>
                        <label htmlFor="name">{t("baseEntity.name")}</label>
                    </div>
                    <div className="p-col-8" style={{padding: '.5em'}}>
                        <InputText id="name" onChange={(e) => {
                            formikHandler(e);
                            updateValue(e);
                            //this.updateProperty('name', e.target.value)
                        }} value={formikItem.name || ''} required/>
                        {formikError.name ? (
                            <div>
                                <small style={{color: 'red'}}>{t(formikError.name)}</small>
                            </div>
                        ) : null}
                    </div>

                    <div className="p-col-4" style={{padding: '.75em'}}>
                        <label htmlFor="comment">{t("baseEntity.comment")}</label>
                    </div>
                    <div className="p-col-8" style={{padding: '.5em'}}>
                        <InputTextarea id="comment" onChange={(e) => {
                            formikHandler(e);
                            updateValue(e)
                            //this.updateProperty('name', e.target.value)
                        }} value={formikItem.comment || ''}/>
                    </div>

                    <div className="p-col-4" style={{padding: '.75em'}}>
                        <label htmlFor="description">{t("customers.fields.description")}</label>
                    </div>
                    <div className="p-col-8" style={{padding: '.5em'}}>
                        <InputTextarea id="description" onChange={(e) => {
                            formikHandler(e);
                            updateValue(e)
                            //this.updateProperty('name', e.target.value)
                        }} value={formikItem.description || ''}/>
                    </div>

                    <div className="p-col-4" style={{padding: '.75em'}}>
                        <label htmlFor="type">{t("customers.fields.type")}</label>
                    </div>
                    <div className="p-col-8" style={{padding: '.5em'}}>
                        <AutoComplete name="type"
                                      value={getCustomerType(formikItem.type) || ''}
                                      field='name'
                                      suggestions={filterItems}
                                      completeMethod={(e) => filter(e, null, renderCustomerType)}
                                      size={30}
                                      minLength={1}
                                      dropdown={true}
                                      onChange={(e) => {
                                          formikHandler(e);
                                          updateValue(e);
                                          //this.updateProperty('name', e.target.value)
                                      }}  />
                    </div>

                    <div className="p-col-4">
                        <label htmlFor="parent">{t("customers.fields..parent")}</label>
                    </div>
                    <div className="p-col-8">
                        <AutoComplete name="parent"
                                      value={formikItem.parent || ''}
                                      suggestions={filterItems}
                                      completeMethod={(e) => filter(e, customerService)}
                                      size={30}
                                      minLength={1}
                                      field='name'
                                      dropdown={true}
                                      onChange={(e) => {
                                          formikHandler(e);
                                          updateValue(e);
                                          //this.updateProperty('name', e.target.value)
                                      }}  />
                    </div>

                    <div className="p-col-4">
                        <label htmlFor="owner">{t("customers.fields..owner")}</label>
                    </div>
                    <div className="p-col-8">
                        <AutoComplete name="owner"
                                      value={formikItem.owner || ''}
                                      suggestions={filterItems}
                                      completeMethod={(e) => filter(e, userService)}
                                      size={30}
                                      minLength={1}
                                      field='name'
                                      dropdown={true}
                                      onChange={(e) => {
                                          formikHandler(e);
                                          updateValue(e);
                                          //this.updateProperty('name', e.target.value)
                                      }}  />
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(CustomerEditMain);