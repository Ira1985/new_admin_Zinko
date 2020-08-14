import React, { Component } from 'react';
import './customers.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import Customer, {CustomerSchema} from "../../models/Customer";
import {customerService} from "../../service/customer.service";
import {withTranslation} from "react-i18next";
import CustomerEditDialog from "./Edit/CustomerEditDialog";
import DataGridView from "../../layouts/DataGridView/DataGridView";

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

    mainComponent = (showCheckedItemsMenu, updateChecked, editItem, addItem, deleteItem, checkedItems, clearCheckedDone,
                     reloadListDone, clearChecked, reloadList, filterInit, sorterInit, pagingInit, disableEdit, contexMenuProps) => {
        return (
            <DataGridView minimizeHeight={showCheckedItemsMenu}
                          apiService={customerService}
                          location={this.props.location}
                          columns={Customer.buildColumns()}
                          updateChecked={updateChecked}
                          editItem={editItem}
                          addItem={addItem}
                          deleteItems={deleteItem}
                          checkedItems={checkedItems}
                          clearCheckedDone={() => clearCheckedDone()}
                          reloadListDone={() => reloadListDone()}
                          clearChecked={clearChecked}
                          reloadList={reloadList}
                          filterInit={filterInit}
                          sorterInit={sorterInit}
                          pagingInit={pagingInit}
                          disableEdit={disableEdit}
                          contexMenuProps={contexMenuProps}
            ></DataGridView>
        )
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
                        gridView={false}
                        treeView={false}
                        columns={Customer.buildColumns()}
                        editComponent={this.editComponent}
            >
                {this.mainComponent}
            </BaseLayout>
        );
    }
}

export default withTranslation()(Customers);
