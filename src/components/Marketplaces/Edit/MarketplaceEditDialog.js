import React, { Component } from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from 'primereact/inputtextarea';
import {Formik, useFormik} from 'formik';
import Marketplace, {MarketplaceSchema} from "../../../models/Marketplace";
import {withTranslation} from "react-i18next";
import {ProgressSpinner} from "primereact/progressspinner";

class MarketplaceEditDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }

    componentDidMount() {
    }

    render() {
        let {t, editedItem, updateValue, loading} = this.props;

        return (
            <>
                {loading ?
                    <div className="p-fluid progress-div">
                        <ProgressSpinner/>
                    </div>
                    :
                    <Formik
                        initialValues={editedItem}
                        validationSchema={MarketplaceSchema}
                    >
                        {props => (
                            <div className="p-grid p-fluid">
                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="name">{t("baseEntity.name")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <InputText name="name" onChange={(e) => {
                                        props.handleChange(e);
                                        updateValue(e);
                                        //this.updateProperty('name', e.target.value)
                                    }} value={props.values.name || ''} required/>
                                    {props.errors.name ? (
                                        <div>
                                            <small style={{color: 'red'}}>{t(props.errors.name)}</small>
                                        </div>
                                    ) : null}
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="comment">{t("baseEntity.comment")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <InputTextarea name="comment" onChange={(e) => {
                                        props.handleChange(e);
                                        updateValue(e)
                                        //this.updateProperty('name', e.target.value)
                                    }} value={props.values.comment || ''}/>
                                </div>
                            </div>
                        )}
                    </Formik>
                }
            </>
        );
    }

}

export default withTranslation()(MarketplaceEditDialog);