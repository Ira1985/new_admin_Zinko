import React, { Component } from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from 'primereact/inputtextarea';
import {Formik, useFormik} from 'formik';
import {Cat2AttrSchema} from "../../../../models/Cat2Attr";
import {withTranslation} from "react-i18next";
import {ProgressSpinner} from "primereact/progressspinner";
import {AutoComplete} from "primereact/autocomplete";
import {attrCategoryService} from "../../../../service/attrCategory.service";

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
                                    <label htmlFor="attrCategory">{t("attributes.fields.attrCategory")}</label>
                                </div>
                                <div className="p-col-8" style={{padding: '.5em'}}>
                                    <AutoComplete name="attrCategory"
                                                  value={props.values.attrCategory || ''}
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
                                                      props.handleChange(e);
                                                      updateValue(e);
                                                      //this.updateProperty('name', e.target.value)
                                                  }}  />
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
                            </div>
                        )}
                    </Formik>
                }
            </>
        );
    }

}

export default withTranslation()(Cat2AttrEditDialog);