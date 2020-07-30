import React, { Component } from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from 'primereact/inputtextarea';
import {Formik, useFormik} from 'formik';
import Attribute, {AttributeSchema, getValueType, getAttrType, getLinkSourceType, getAttrSystemSource, getQuantType, renderAttrType, renderValueType, renderLinkSourceType, renderAttrSystemSource, renderQuantType} from "../../../models/Attribute";
import {withTranslation} from "react-i18next";
import {ProgressSpinner} from "primereact/progressspinner";
import {AutoComplete} from "primereact/autocomplete";
import {InputNumber} from 'primereact/inputnumber';
import {Checkbox} from 'primereact/checkbox';
import {attrCategoryService} from "../../../service/attrCategory.service";
import {unitService} from "../../../service/unit.service";
import {subsGroupService} from "../../../service/subsGroup.service";

class AttributeEditDialog extends Component {

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
                        validationSchema={AttributeSchema}
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
                                    <label htmlFor="attrCategory">{t("attributes.fields.attrCategory")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <AutoComplete name="attrCategory"
                                                  value={props.values.attrCategory || ''}
                                                  suggestions={filterItems}
                                                  completeMethod={(e) => filter(e, attrCategoryService)}
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
                                    <label htmlFor="attrType">{t("attributes.fields.attrCategory")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <AutoComplete name="attrType"
                                                  value={getAttrType(props.values.attrType) || ''}
                                                  field='name'
                                                  suggestions={filterItems}
                                                  completeMethod={(e) => filter(e, null, renderAttrType)}
                                                  size={30}
                                                  minLength={1}
                                                  dropdown={true}
                                                  onChange={(e) => {
                                                      props.handleChange(e);
                                                      updateValue(e);
                                                      //this.updateProperty('name', e.target.value)
                                                  }} required />
                                    {props.errors.attrType ? (
                                        <div>
                                            <small style={{color: 'red'}}>{t(props.errors.attrType)}</small>
                                        </div>
                                    ) : null}
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="valueType">{t("attributes.fields.valueType")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <AutoComplete name="valueType"
                                                  value={getValueType(props.values.valueType) || ''}
                                                  field='name'
                                                  suggestions={filterItems}
                                                  completeMethod={(e) => filter(e, null, renderValueType)}
                                                  size={30}
                                                  minLength={1}
                                                  dropdown={true}
                                                  onChange={(e) => {
                                                    props.handleChange(e);
                                                    updateValue(e);
                                                    //this.updateProperty('name', e.target.value)
                                                  }} required />
                                    {props.errors.valueType ? (
                                        <div>
                                            <small style={{color: 'red'}}>{t(props.errors.valueType)}</small>
                                        </div>
                                    ) : null}
                                </div>

                                <div className="p-col-1" style={{padding: '.75em'}}>
                                    <label htmlFor="unit">{t("attributes.fields.unit")}</label>
                                </div>
                                <div className="p-col-3" style={{padding: '.5em'}}>
                                    <AutoComplete name="unit"
                                                  value={props.values.unit || ''}
                                                  suggestions={filterItems}
                                                  completeMethod={(e) => filter(e, unitService)}
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
                                <div className="p-col-2" style={{padding: '.75em'}}>
                                    <label htmlFor="roundUp">{t("attributes.fields.roundUp")}</label>
                                </div>
                                <div className="p-col-2" style={{padding: '.5em'}}>
                                    <InputNumber name="roundUp" onChange={(e) => {
                                        props.handleChange(e);
                                        updateValue(e);
                                        //this.updateProperty('name', e.target.value)
                                    }} value={props.values.roundUp || ''} min={-1} step={1} max={100} />
                                </div>
                                <div className="p-col-2" style={{padding: '.75em'}}>
                                    <label htmlFor="length">{t("attributes.fields.length")}</label>
                                </div>
                                <div className="p-col-2" style={{padding: '.5em'}}>
                                    <InputNumber name="length" onChange={(e) => {
                                        props.handleChange(e);
                                        updateValue(e);
                                        //this.updateProperty('name', e.target.value)
                                    }} value={props.values.length || ''} min={-1} step={1} />
                                </div>

                                <div className="p-col-2" style={{padding: '.75em'}}>
                                    <label htmlFor="subsGroup">{t("attributes.fields.subsGroup")}</label>
                                </div>
                                <div className="p-col-4" style={{padding: '.5em'}}>
                                    <AutoComplete name="subsGroup"
                                                  value={props.values.subsGroup || ''}
                                                  suggestions={filterItems}
                                                  completeMethod={(e) => filter(e, subsGroupService)}
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
                                <div className="p-col-2" style={{padding: '.75em'}}>
                                    <label htmlFor="sourceType">{t("attributes.fields.sourceType")}</label>
                                </div>
                                <div className="p-col-4" style={{padding: '.5em'}}>
                                    <AutoComplete name="sourceType"
                                                  value={getLinkSourceType(props.values.sourceType) || ''}
                                                  field='name'
                                                  suggestions={filterItems}
                                                  completeMethod={(e) => filter(e, null, renderLinkSourceType)}
                                                  size={30}
                                                  minLength={1}
                                                  dropdown={true}
                                                  onChange={(e) => {
                                                      props.handleChange(e);
                                                      updateValue(e);
                                                      //this.updateProperty('name', e.target.value)
                                                  }}  />
                                </div>

                                <div className="p-col-12" style={{padding: '.75em'}}>
                                    <Checkbox
                                        name={'hasQuantities'}
                                        onChange={(e) => {
                                            props.handleChange(e);
                                            updateValue(e);
                                            //this.updateProperty('name', e.target.value)
                                        }}
                                        checked={props.values.hasQuantities}
                                    ></Checkbox>
                                    {" "}
                                    <label htmlFor="hasQuantities">{t("attributes.fields.hasQuantities")}</label>
                                </div>

                                <div className="p-col-2" style={{padding: '.75em'}}>
                                    <label htmlFor="quantType">{t("attributes.fields.quantType")}</label>
                                </div>
                                <div className="p-col-4" style={{padding: '.5em'}}>
                                    <AutoComplete name="quantType"
                                                  value={getQuantType(props.values.quantType) || ''}
                                                  field='name'
                                                  suggestions={filterItems}
                                                  completeMethod={(e) => filter(e, null, renderQuantType)}
                                                  size={30}
                                                  minLength={1}
                                                  dropdown={true}
                                                  onChange={(e) => {
                                                      props.handleChange(e);
                                                      updateValue(e);
                                                      //this.updateProperty('name', e.target.value)
                                                  }}  />
                                </div>
                                <div className="p-col-2" style={{padding: '.75em'}}>
                                    <label htmlFor="systemSource">{t("attributes.fields.systemSource")}</label>
                                </div>
                                <div className="p-col-4" style={{padding: '.5em'}}>
                                    <AutoComplete name="systemSource"
                                                  value={getAttrSystemSource(props.values.systemSource) || ''}
                                                  field='name'
                                                  suggestions={filterItems}
                                                  completeMethod={(e) => filter(e, null, renderAttrSystemSource)}
                                                  size={30}
                                                  minLength={1}
                                                  dropdown={true}
                                                  onChange={(e) => {
                                                      props.handleChange(e);
                                                      updateValue(e);
                                                      //this.updateProperty('name', e.target.value)
                                                  }}  />
                                </div>
                            </div>
                        )}
                    </Formik>
                }
            </>
        );
    }
}

export default withTranslation()(AttributeEditDialog);