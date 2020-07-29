import React, { Component } from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from 'primereact/inputtextarea';
import './customerTab.scss';
import {withTranslation} from "react-i18next";
import {Button} from "primereact/button";

class CustomerEditRequirement extends Component {

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
            <div className="p-grid p-fluid">
                <div className="p-col-3" style={{padding: '.75em'}}>
                    <label htmlFor="requirementsDesc">{t("baseLayout.editCustomer.requirementsDesc")}</label>
                </div>
                <div className="p-col-9" style={{padding: '.5em'}}>
                    <InputTextarea name="requirementsDesc" onChange={(e) => {
                        formikHandler(e);
                        updateValue(e)
                        //this.updateProperty('name', e.target.value)
                    }} value={formikItem.requirementsDesc || ''}/>
                </div>

                <div className="p-col-3" style={{padding: '.75em'}}>
                    <label htmlFor="requirementsFileLink">{t("baseLayout.editCustomer.requirementsFileLink")}</label>
                </div>
                <div className="p-col-7" >
                    <div className="p-inputgroup">
                        <InputText name="requirementsFileLink" onChange={(e) => {
                            formikHandler(e);
                            updateValue(e);
                            //this.updateProperty('name', e.target.value)
                        }} value={formikItem.requirementsFileLink || ''} placeholder="Ссылка" />
                        <Button icon="pi pi-times" className="p-button-danger" onClick={(e)=>this.clearOneContent()}/>
                    </div>
                </div>
                <div className="p-col-1">
                    <Button className={'but-customers grid-toolbar-unload'} icon="pi p-empty-button grid-unload-ico" tooltip={t('baseLayout.main.buttons.tooltips.buttonUnload')} tooltipOptions={{position: 'left'}} />
                </div>
                <div className="p-col-1">
                    <Button className={'but-customers grid-toolbar-import'} icon="pi p-empty-button grid-import-ico" tooltip={t('baseLayout.main.buttons.tooltips.buttonImport')} tooltipOptions={{position: 'left'}} />
                </div>
            </div>
        );
    }
}

export default withTranslation()(CustomerEditRequirement);