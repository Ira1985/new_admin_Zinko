import React, { Component } from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from 'primereact/inputtextarea';
import {Formik, useFormik} from 'formik';
import ExportTemplate, {ExportTemplateSchema, getTemplateType, renderExportTemplateType} from "../../../models/ExportTemplate";
import {withTranslation} from "react-i18next";
import {ProgressSpinner} from "primereact/progressspinner";
import {AutoComplete} from "primereact/autocomplete";
import {categoryService} from "../../../service/category.service";
import {customerService} from "../../../service/customer.service";
import {Checkbox} from "primereact/checkbox";

class ExportTemplateEditDialog extends Component {

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
                        validationSchema={ExportTemplateSchema}
                    >
                        {props => (
                            <div className="p-grid p-fluid">
                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="name">{t("baseEntity.name")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <InputText id="name" onChange={(e) => {
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
                                    <InputTextarea id="comment" onChange={(e) => {
                                        props.handleChange(e);
                                        updateValue(e)
                                        //this.updateProperty('name', e.target.value)
                                    }} value={props.values.comment || ''}/>
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="description">{t("exportTemplates.fields.description")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <InputTextarea id="description" onChange={(e) => {
                                        props.handleChange(e);
                                        updateValue(e)
                                        //this.updateProperty('name', e.target.value)
                                    }} value={props.values.description || ''}/>
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="type">{t("exportTemplates.fields.type")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <AutoComplete name="type"
                                                  value={getTemplateType(props.values.type) || ''}
                                                  field='name'
                                                  suggestions={filterItems}
                                                  completeMethod={(e) => filter(e, null, renderExportTemplateType)}
                                                  size={30}
                                                  minLength={1}
                                                  dropdown={true}
                                                  onChange={(e) => {
                                                      props.handleChange(e);
                                                      updateValue(e);
                                                      //this.updateProperty('name', e.target.value)
                                                  }} />
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="category">{t("exportTemplates.fields.category")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <AutoComplete name="category"
                                                  value={props.values.category || ''}
                                                  suggestions={filterItems}
                                                  completeMethod={(e) => filter(e, categoryService)}
                                                  size={30}
                                                  minLength={1}
                                                  field='name'
                                                  dropdown={true}
                                                  onChange={(e) => {
                                                      props.handleChange(e);
                                                      updateValue(e);
                                                      //this.updateProperty('name', e.target.value)
                                                  }}  />
                                    {props.errors.category ? (
                                        <div>
                                            <small style={{color: 'red'}}>{t(props.errors.category)}</small>
                                        </div>
                                    ) : null}
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="customerCategory">{t("exportTemplates.fields.customerCategory")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <AutoComplete name="customerCategory"
                                                  value={props.values.customerCategory || ''}
                                                  suggestions={filterItems}
                                        //completeMethod={(e) => filter(e, customerCategoriesService)}
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
                                    <label htmlFor="customer">{t("exportTemplates.fields.customer")}</label>
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
                                                  }} required />
                                    {props.errors.customer ? (
                                        <div>
                                            <small style={{color: 'red'}}>{t(props.errors.customer)}</small>
                                        </div>
                                    ) : null}
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>

                                </div>
                                <div className="p-col-4" style={{padding: '.5em'}}>
                                    <Checkbox
                                        name={'useBaseGroup'}
                                        onChange={(e) => {
                                            props.handleChange(e);
                                            updateValue(e);
                                            //this.updateProperty('name', e.target.value)
                                        }}
                                        checked={props.values.useBaseGroup}
                                    ></Checkbox>
                                    {" "}
                                    <label htmlFor="useBaseGroup">{t("exportTemplates.fields.useBaseGroup")}</label>
                                </div>
                                <div className="p-col-4" style={{padding: '.5em'}}>
                                    <Checkbox
                                        name={'changePlain'}
                                        onChange={(e) => {
                                            props.handleChange(e);
                                            updateValue(e);
                                            //this.updateProperty('name', e.target.value)
                                        }}
                                        checked={props.values.changePlain}
                                    ></Checkbox>
                                    {" "}
                                    <label htmlFor="changePlain">{t("exportTemplates.fields.changePlain")}</label>
                                </div>
                            </div>
                        )}
                    </Formik>
                }
            </>
        );
    }

}

export default withTranslation()(ExportTemplateEditDialog);