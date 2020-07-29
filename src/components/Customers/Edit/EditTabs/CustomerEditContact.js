import React, { Component } from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from 'primereact/inputtextarea';
import {InputMask} from 'primereact/inputmask';
import {withTranslation} from "react-i18next";


class CustomerEditContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }

    componentDidMount() {
    }

    render() {
        let {t, editedItem, updateValue, formikItem, formikError, formikHandler} = this.props;

        return (
            <div className="p-grid p-fluid">
                <div className="p-col-4" style={{padding: '.75em'}}>
                    <label htmlFor="contact">{t("baseLayout.editCustomer.contact")}</label>
                </div>
                <div className="p-col-8" style={{padding: '.5em'}}>
                    <InputTextarea name="contact" onChange={(e) => {
                        formikHandler(e);
                        updateValue(e)
                        //this.updateProperty('name', e.target.value)
                    }} value={formikItem.contact || ''}/>
                </div>

                <div className="p-col-4" style={{padding: '.75em'}}>
                    <label htmlFor="phone">{t("baseLayout.editCustomer.phone")}</label>
                </div>
                <div className="p-col-8" style={{padding: '.5em'}}>
                    <InputMask mask="(999) 999-9999" name="phone" onChange={(e) => {
                        formikHandler(e);
                        updateValue(e)
                        //this.updateProperty('name', e.target.value)
                    }} value={formikItem.phone || ''} />
                </div>

                <div className="p-col-4" style={{padding: '.75em'}}>
                    <label htmlFor="email">{t("baseLayout.editCustomer.email")}</label>
                </div>
                <div className="p-col-8" style={{padding: '.5em'}}>
                    <InputText name="email" onChange={(e) => {
                        formikHandler(e);
                        updateValue(e)
                        //this.updateProperty('name', e.target.value)
                    }} value={formikItem.email || ''}/>
                </div>

                <div className="p-col-4" style={{padding: '.75em'}}>
                    <label htmlFor="link">{t("baseLayout.editCustomer.link")}</label>
                </div>
                <div className="p-col-8" style={{padding: '.5em'}}>
                    <InputText name="link" onChange={(e) => {
                        formikHandler(e);
                        updateValue(e)
                        //this.updateProperty('name', e.target.value)
                    }} value={formikItem.link || ''}/>
                </div>
            </div>
        );
    }
}

export default withTranslation()(CustomerEditContact);