import React, { Component } from 'react';
import {InputText} from "primereact/inputtext";
import {Formik, useFormik} from 'formik';
import {Cat2AttrSchema} from "../../../../models/Cat2Attr";
import {withTranslation} from "react-i18next";
import {ProgressSpinner} from "primereact/progressspinner";
import {AutoComplete} from "primereact/autocomplete";
import {attrCategoryService} from "../../../../service/attrCategory.service";
import {attributeService} from "../../../../service/attribute.service";
import {Checkbox} from "primereact/checkbox";
import {InputNumber} from "primereact/inputnumber";

class Cat2AttrEditDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }

    componentDidMount() {
    }

    render() {
        let {t, editedItem, updateValue, loading, filterItems, filter, itemTemplate} = this.props;

        const root = document.getElementById('root');

        return (
            <>
                {loading ?
                    <div className="p-fluid progress-div">
                        <ProgressSpinner/>
                    </div>
                    :
                    <Formik
                        initialValues={editedItem}
                        validationSchema={Cat2AttrSchema}
                    >
                        {props => (
                            <div className="p-grid p-fluid">
                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="groupName">{t("cat2Attrs.fields.groupName")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <AutoComplete name="groupName"
                                                  appendTo={root}
                                                  value={props.values.groupName || ''}
                                                  suggestions={filterItems && filterItems.length ? filterItems :
                                                      [{
                                                          name: 'Empty object',
                                                          emptyLink: '/attrcategories?id=0'
                                                      }]
                                                  }
                                                  itemTemplate={itemTemplate}
                                                  completeMethod={(e) => filter(e, attrCategoryService)}
                                                  size={30}
                                                  minLength={1}
                                                  field='name'
                                                  dropdown={true}
                                                  onChange={(e) => {
                                                      let obj = Object.assign({}, e);
                                                      if(obj.value.hasOwnProperty('name')) {
                                                          obj.target.value = e.value.name;
                                                      }
                                                      props.handleChange(obj);
                                                      updateValue(obj);
                                                      //this.updateProperty('name', e.target.value)
                                                  }}  />
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="attribute">{t("cat2Attrs.fields.attribute")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <AutoComplete name="attribute"
                                                  appendTo={root}
                                                  value={props.values.attribute || ''}
                                                  suggestions={filterItems && filterItems.length ? filterItems :
                                                      [{
                                                          name: 'Empty object',
                                                          emptyLink: '/attributes?id=0'
                                                      }]
                                                  }
                                                  itemTemplate={itemTemplate}
                                                  completeMethod={(e) => filter(e, attributeService)}
                                                  size={30}
                                                  minLength={1}
                                                  field='name'
                                                  dropdown={true}
                                                  onChange={(e) => {
                                                      props.handleChange(e);
                                                      updateValue(e);
                                                      //this.updateProperty('name', e.target.value)
                                                  }} />
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="name">{t("baseEntity.name")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <InputText name="name" onChange={(e) => {
                                        props.handleChange(e);
                                        updateValue(e);
                                        //this.updateProperty('name', e.target.value)
                                    }} value={props.values.name || ''} />
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <Checkbox
                                        name={'required'}
                                        onChange={(e) => {
                                            props.handleChange(e);
                                            updateValue(e);
                                            //this.updateProperty('name', e.target.value)
                                        }}
                                        checked={props.values.required}
                                    ></Checkbox>
                                    {" "}
                                    <label htmlFor="required">{t("cat2Attrs.fields.required.name")}</label>
                                </div>
                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <Checkbox
                                        name={'key'}
                                        onChange={(e) => {
                                            props.handleChange(e);
                                            updateValue(e);
                                            //this.updateProperty('name', e.target.value)
                                        }}
                                        checked={props.values.key}
                                    ></Checkbox>
                                    {" "}
                                    <label htmlFor="key">{t("cat2Attrs.fields.key.name")}</label>
                                </div>
                                <div className="p-col-4" style={{padding: '.75em'}}>
                                </div>

                                <div className="p-col-4" style={{padding: '.75em'}}>
                                    <label htmlFor="weight">{t("cat2Attrs.fields.weight")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <InputNumber name="weight" onChange={(e) => {
                                        props.handleChange(e);
                                        updateValue(e);
                                        //this.updateProperty('name', e.target.value)
                                    }} value={props.values.weight || ''} min={-1} step={1} max={100} />
                                </div>
                            </div>
                        )}
                    </Formik>
                }
            </>
        );
    }

}

export default withTranslation()(Cat2AttrEditDialog);
