import React, { Component } from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from 'primereact/inputtextarea';
import {Formik, useFormik} from 'formik';
import User, {UserSchema} from "../../../models/User";
import {withTranslation} from "react-i18next";
import {ProgressSpinner} from "primereact/progressspinner";

class UserEditDialog extends Component {

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
                        validationSchema={UserSchema}
                    >
                        {props => (
                            <div className="p-grid p-fluid">
                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="name">{t("editProfile.login")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <InputText id="userName" onChange={(e) => {
                                        props.handleChange(e);
                                        updateValue(e);
                                        //this.updateProperty('name', e.target.value)
                                    }} value={props.values.userName || ''} required/>
                                    {props.errors.userName ? (
                                        <div>
                                            <small style={{color: 'red'}}>{t(props.errors.userName)}</small>
                                        </div>
                                    ) : null}
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="name">{t("editProfile.department")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <InputText id="department" onChange={(e) => {
                                        props.handleChange(e);
                                        updateValue(e);
                                        //this.updateProperty('name', e.target.value)
                                    }} value={props.values.department || ''} required/>
                                    {props.errors.department ? (
                                        <div>
                                            <small style={{color: 'red'}}>{t(props.errors.department)}</small>
                                        </div>
                                    ) : null}
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="name">{t("editProfile.password")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <InputText id="password" onChange={(e) => {
                                        props.handleChange(e);
                                        updateValue(e);
                                        //this.updateProperty('name', e.target.value)
                                    }} value={props.values.password || ''}/>
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="name">{t("editProfile.repeatPassword")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <InputText id="repeatPassword" onChange={(e) => {
                                        props.handleChange(e);
                                        updateValue(e);
                                        //this.updateProperty('name', e.target.value)
                                    }} value={props.values.password || ''}/>
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="comment">{t("baseEntity.comment")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <InputTextarea id="comment" onChange={(e) => {
                                        props.handleChange(e);
                                        updateValue(e)
                                        //this.updateProperty('name', e.target.value)
                                    }} value={props.values.comment || ''}/>
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="name">{t("editProfile.name")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <InputText id="firstName" onChange={(e) => {
                                        props.handleChange(e);
                                        updateValue(e);
                                        //this.updateProperty('name', e.target.value)
                                    }} value={props.values.firstName || ''} required/>
                                    {props.errors.firstName ? (
                                        <div>
                                            <small style={{color: 'red'}}>{t(props.errors.firstName)}</small>
                                        </div>
                                    ) : null}
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="name">{t("editProfile.secondName")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <InputText id="middleName" onChange={(e) => {
                                        props.handleChange(e);
                                        updateValue(e);
                                        //this.updateProperty('name', e.target.value)
                                    }} value={props.values.middleName || ''}/>
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="name">{t("editProfile.lastName")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <InputText id="lastName" onChange={(e) => {
                                        props.handleChange(e);
                                        updateValue(e);
                                        //this.updateProperty('name', e.target.value)
                                    }} value={props.values.lastName || ''} required/>
                                    {props.errors.lastName ? (
                                        <div>
                                            <small style={{color: 'red'}}>{t(props.errors.lastName)}</small>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        )}
                    </Formik>
                }
            </>
        );
    }

}

export default withTranslation()(UserEditDialog);