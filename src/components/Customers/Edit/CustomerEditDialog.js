import React, { Component } from 'react';
import {Formik, useFormik} from 'formik';
import Customer, {CustomerSchema} from "../../../models/Customer";
import {withTranslation} from "react-i18next";
import {ProgressSpinner} from "primereact/progressspinner";
import {TabPanel, TabView} from "primereact/tabview";
import CustomerEditMain from "./EditTabs/CustomerEditMain";
import CustomerEditContact from "./EditTabs/CustomerEditContact";
import CustomerEditSetting from "./EditTabs/CustomerEditSetting";
import CustomerEditRequirement from "./EditTabs/CustomerEditRequirement";

class CustomerEditDialog extends Component {

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
                        validationSchema={CustomerSchema}
                    >
                        {props => (
                            <TabView renderActiveOnly={false}>
                                <TabPanel header={t("baseLayout.editCustomer.basic")}>
                                    <CustomerEditMain
                                        editedItem={editedItem}
                                        formikItem={props.values}
                                        formikError={props.errors}
                                        updateValue={(e) => updateValue(e)}
                                        formikHandler={(e) => props.handleChange(e)}
                                        filter={filter}
                                        filterItems={filterItems}
                                    />
                                </TabPanel>
                                <TabPanel header={t("baseLayout.editCustomer.contact")}>
                                    <CustomerEditContact
                                        editedItem={editedItem}
                                        formikItem={props.values}
                                        formikError={props.errors}
                                        updateValue={(e) => updateValue(e)}
                                        formikHandler={(e) => props.handleChange(e)}
                                    />
                                </TabPanel>
                                <TabPanel header={t("baseLayout.editCustomer.setting")}>
                                    <CustomerEditSetting
                                        editedItem={editedItem}
                                        formikItem={props.values}
                                        formikError={props.errors}
                                        updateValue={(e) => updateValue(e)}
                                        formikHandler={(e) => props.handleChange(e)}
                                        filter={filter}
                                        filterItems={filterItems}
                                    />
                                </TabPanel>
                                <TabPanel header={t("baseLayout.editCustomer.demand")}>
                                    <CustomerEditRequirement
                                        editedItem={editedItem}
                                        formikItem={props.values}
                                        formikError={props.errors}
                                        updateValue={(e) => updateValue(e)}
                                        formikHandler={(e) => props.handleChange(e)}
                                    />
                                </TabPanel>
                            </TabView>
                        )}
                    </Formik>
                }
            </>
        );
    }

}

export default withTranslation()(CustomerEditDialog);