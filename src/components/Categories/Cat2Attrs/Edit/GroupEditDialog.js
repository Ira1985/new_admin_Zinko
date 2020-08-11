import React, { Component } from 'react';
import {Formik, useFormik} from 'formik';
import {Cat2AttrSchema} from "../../../../models/Cat2Attr";
import {withTranslation} from "react-i18next";
import {ProgressSpinner} from "primereact/progressspinner";
import {AutoComplete} from "primereact/autocomplete";

class Cat2AttrEditDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }

    componentDidMount() {
    }

    render() {
        let {t, editedItem, updateValue, loading, filterItems, filter, groups} = this.props;

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
                                                  suggestions={filterItems}
                                                  completeMethod={(e) => filter(e, null, () => Array.from(groups))}
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
                            </div>
                        )}
                    </Formik>
                }
            </>
        );
    }

}

export default withTranslation()(Cat2AttrEditDialog);
