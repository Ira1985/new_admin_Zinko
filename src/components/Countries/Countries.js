import React, { Component } from 'react';
import './countries.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import Country, {CountrySchema} from "../../models/Country";
import {countryService} from "../../service/country.service";
import {withTranslation} from "react-i18next";
import CountryEditDialog from "./Edit/CountryEditDialog";
import DataGridView from "../../layouts/DataGridView/DataGridView";

const plurals = ['countries.plurals.first', 'countries.plurals.second', 'countries.plurals.third'];

class Countries extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <CountryEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    mainComponent = (showCheckedItemsMenu, updateChecked, editItem, addItem, deleteItem, checkedItems, clearCheckedDone,
                     reloadListDone, clearChecked, reloadList, filterInit, sorterInit, pagingInit, disableEdit, contexMenuProps) => {
        return (
            <DataGridView minimizeHeight={showCheckedItemsMenu}
                          apiService={countryService}
                          location={this.props.location}
                          columns={Country.buildColumns()}
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
        let  breadcrumbs = [{ "label": t('countries.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={Country.buildFilters()}
                        plurals={plurals}
                        dopClass={'countries_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={countryService}
                        baseSchema={CountrySchema}
                        baseModel={new Country()}
                        location={this.props.location}
                        gridView={false}
                        treeView={false}
                        columns={Country.buildColumns()}
                        editComponent={this.editComponent}
            >
                {this.mainComponent}
            </BaseLayout>
        );
    }
}

export default withTranslation()(Countries);
