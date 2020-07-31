import React, { Component } from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from 'primereact/inputtextarea';
import './customerTab.scss';
import {withTranslation} from "react-i18next";
import {Button} from "primereact/button";
import {FileUpload} from "primereact/fileupload";

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
                    <label htmlFor="requirementsDesc">{t("customers.fields.requirementsDesc")}</label>
                </div>
                <div className="p-col-9" style={{padding: '.5em'}}>
                    <InputTextarea name="requirementsDesc" onChange={(e) => {
                        formikHandler(e);
                        updateValue(e)
                        //this.updateProperty('name', e.target.value)
                    }} value={formikItem.requirementsDesc || ''}/>
                </div>

                <div className="p-col-3" style={{padding: '.75em'}}>
                    <label htmlFor="requirementsFileLink">{t("customers.fields.requirementsFileLink")}</label>
                </div>
                <div className="p-col-9">
                    <FileUpload
                        //mode="basic"
                        accept="application/pdf,application/msword,application/vnd.ms-excel,application/vnd.google-earth.kml+xml,text/plain"
                        maxFileSize={1000000}
                        onUpload={this.onUpload}
                        chooseLabel=''
                        uploadLabel=''
                        cancelLabel=''
                        customUpload={true}
                    />
                </div>
            </div>
        );
    }
}

export default withTranslation()(CustomerEditRequirement);