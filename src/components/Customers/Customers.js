import React, { Component } from 'react';
import './customers.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import Customer, {CustomerSchema} from "../../models/Customer";
import {customerService} from "../../service/customer.service";
import {withTranslation} from "react-i18next";
import CustomerEditDialog from "./Edit/CustomerEditDialog";

const plurals = ['customers.plurals.first', 'customers.plurals.second', 'customers.plurals.third'];

class Customers extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue, filter, filterItems) => {
        return (
            <CustomerEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} filter={filter} filterItems={filterItems} />
        );
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [{ "label": t('customers.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={Customer.buildFilters()}
                        plurals={plurals}
                        dopClass={'customers_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={customerService}
                        baseSchema={CustomerSchema}
                        baseModel={new Customer()}
                        location={this.props.location}
                        gridView={true}
                        treeView={false}
                        columns={Customer.buildColumns()}
                        editComponent={this.editComponent}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(Customers);
