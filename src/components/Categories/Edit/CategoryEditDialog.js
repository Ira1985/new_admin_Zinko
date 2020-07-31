import React, { Component } from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from 'primereact/inputtextarea';
import {Formik, useFormik} from 'formik';
import './categoryEdit.scss'
import Category, {CategorySchema} from "../../../models/Category";
import {withTranslation} from "react-i18next";
import {ProgressSpinner} from "primereact/progressspinner";
import {AutoComplete} from "primereact/autocomplete";
import {InputSwitch} from 'primereact/inputswitch';
import {Checkbox} from 'primereact/checkbox';
import {customerService} from "../../../service/customer.service";

class CategoryEditDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }

    componentDidMount() {
    }

    render() {
        let {t, editedItem, updateValue, loading, filter, filterItems} = this.props;

        return (
            <>
                {loading ?
                    <div className="p-fluid progress-div">
                        <ProgressSpinner/>
                    </div>
                    :
                    <Formik
                        initialValues={editedItem}
                        validationSchema={CategorySchema}
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

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="description">{t("categories.fields.description")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <InputTextarea name="description" onChange={(e) => {
                                        props.handleChange(e);
                                        updateValue(e)
                                        //this.updateProperty('name', e.target.value)
                                    }} value={props.values.description || ''}/>
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="customer">{t("categories.fields.customer")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <AutoComplete name="customer"
                                                  value={props.values.customer || ''}
                                                  suggestions={filterItems}
                                                  completeMethod={(e) => filter(e, customerService)}
                                                  size={30}
                                                  minLength={1}
                                                  field='name'
                                                  dropdown={true}
                                                  onChange={(e) => {
                                                      props.handleChange(e);
                                                      updateValue(e);
                                                      //this.updateProperty('name', e.target.value)
                                                  }}  />
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="layout">{t("categories.fields.layout")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <InputSwitch
                                        name={'layout'}
                                        onChange={(e) => {
                                            props.handleChange(e);
                                            updateValue(e);
                                            //this.updateProperty('name', e.target.value)
                                        }}
                                        checked={props.values.layout}
                                    />
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="forMatchingAnalog">{t("categories.fields.forMatchingAnalog")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <InputSwitch
                                        name={'forMatchingAnalog'}
                                        onChange={(e) => {
                                            props.handleChange(e);
                                            updateValue(e);
                                            //this.updateProperty('name', e.target.value)
                                        }}
                                        checked={props.values.forMatchingAnalog}
                                    />
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="foreignMarket">{t("categories.fields.foreignMarket")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <InputSwitch
                                        name={'foreignMarket'}
                                        onChange={(e) => {
                                            props.handleChange(e);
                                            updateValue(e);
                                            //this.updateProperty('name', e.target.value)
                                        }}
                                        checked={props.values.foreignMarket}
                                    />
                                </div>
                            </div>
                        )}
                    </Formik>
                }
            </>
        );
    }
}

export default withTranslation()(CategoryEditDialog);