import React, { Component } from 'react';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import './marketplaces.scss';
import Marketplace, {MarketplaceSchema} from "../../../models/Marketplace";
import {withTranslation} from "react-i18next";
import {marketplaceService} from "../../../service/marketplace.service";
import MarketplaceEditDialog from "./Edit/MarketplaceEditDialog";
import DataGridView from "../../layouts/DataGridView/DataGridView";
import PropTypes from "prop-types";

const plurals = ['marketplaces.plurals.first', 'marketplaces.plurals.second', 'marketplaces.plurals.third'];

class Marketplaces extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <MarketplaceEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    mainComponent = (showCheckedItemsMenu, updateChecked, editItem, addItem, deleteItem, checkedItems, clearCheckedDone,
                     reloadListDone, clearChecked, reloadList, filterInit, sorterInit, pagingInit, disableEdit, contexMenuProps) => {
        return (
            <DataGridView minimizeHeight={showCheckedItemsMenu}
                          apiService={marketplaceService}
                          location={this.props.location}
                          columns={Marketplace.buildColumns()}
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
        let  breadcrumbs = [{ "label": t('marketplaces.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={Marketplace.buildFilters()}
                        plurals={plurals}
                        dopClass={'marketplaces_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={marketplaceService}
                        baseSchema={MarketplaceSchema}
                        baseModel={new Marketplace()}
                        location={this.props.location}
                //gridView={this.mainComponent}
                        gridView={false}
                        treeView={false}
                        columns={Marketplace.buildColumns()}
                        editComponent={this.editComponent}
            >
                {this.mainComponent}
            </BaseLayout>
        );
    }
}

export default withTranslation()(Marketplaces);