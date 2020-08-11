import React, { Component } from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from 'primereact/inputtextarea';
import {Formik, useFormik} from 'formik';
import './categoryEdit.scss'
import Category, {CategorySchema} from "../../../models/Category";
import {withTranslation} from "react-i18next";
import {ProgressSpinner} from "primereact/progressspinner";
import {AutoComplete} from "primereact/autocomplete";
import {categoryNewService} from "../../../service/categoryNew.service";

class CategoryEditDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }

    componentDidMount() {
    }

    render() {
        let {t, editedItem, updateValue, loading, filter, filterItems, itemTemplate} = this.props;

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
                        validationSchema={CategorySchema}
                    >
                        {props => (
                            <div className="p-grid p-fluid">

                                { props.values.parent &&
                                    <>
                                        <div className="p-col-4" style={{padding: '.75em'}}>
                                            <label htmlFor="name">{t("categories.fields.parent")}</label>
                                        </div>
                                        <div className="p-col-8" style={{padding: '.5em'}}>
                                            <AutoComplete name="parent"
                                                  readonly={true}
                                                  disabled={true}
                                                  appendTo={root}
                                                  value={props.values.parent || ''}
                                                  suggestions={filterItems && filterItems.length ? filterItems :
                                                      [{
                                                          name: 'Empty object',
                                                          emptyLink: '/categories?id=0'
                                                      }]
                                                  }
                                                  itemTemplate={itemTemplate}
                                                  completeMethod={(e) => filter(e, categoryNewService)}
                                                  size={30}
                                                  minLength={1}
                                                  field='name'
                                                  dropdown={true}
                                                  onChange={(e) => {
                                                      props.handleChange(e);
                                                      updateValue(e);
                                                  }}  />
                                        </div>
                                    </>
                                }


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

                            </div>
                        )}
                    </Formik>
                }
            </>
        );
    }
}

export default withTranslation()(CategoryEditDialog);
