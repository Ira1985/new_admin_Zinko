import React, { Component } from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from 'primereact/inputtextarea';
import {Formik, useFormik} from 'formik';
import Brand, {BrandSchema} from "../../../models/Brand";
import {withTranslation} from "react-i18next";

export class BrandEditDialog extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {t, editedItem, updateValue} = this.props;

        return (
            <Formik
                initialValues={editedItem}
                validationSchema={BrandSchema}
            >
                {props => (
                    <div className="p-grid p-fluid">
                        <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="name">{t("baseEntity.name")}</label></div>
                        <div className="p-col-8" style={{padding:'.5em'}}>
                            <InputText id="name" onChange={(e) => {
                                props.handleChange(e);
                                updateValue(e);
                                //this.updateProperty('name', e.target.value)
                            }} value={props.values.name || ''} required/>
                            {props.errors.name ? (
                                <div><small style={{color: 'red'}}>{t(props.errors.name)}</small></div>
                            ) : null}
                        </div>

                        <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="comment">{t("baseEntity.comment")}</label></div>
                        <div className="p-col-8" style={{padding:'.5em'}}>
                            <InputTextarea id="comment" onChange={(e) => {
                                props.handleChange(e);
                                updateValue(e)
                                //this.updateProperty('name', e.target.value)
                            }} value={props.values.comment || ''}/>
                        </div>

                        <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="description">{t("baseEntity.description")}</label></div>
                        <div className="p-col-8" style={{padding:'.5em'}}>
                            <InputTextarea id="description" onChange={(e) => {
                                props.handleChange(e);
                                updateValue(e);
                                //this.updateProperty('name', e.target.value)
                            }} value={props.values.description || ''}/>
                        </div>

                        <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="code">{t("baseEntity.code")}</label></div>
                        <div className="p-col-8" style={{padding:'.5em'}}>
                            <InputText id="code" onChange={(e) => {
                                props.handleChange(e);
                                updateValue(e);
                                //this.updateProperty('name', e.target.value)
                            }} value={props.values.code || ''} disabled/>
                        </div>
                    </div>
                )}
            </Formik>
        );
    }

}

export default withTranslation()(BrandEditDialog);