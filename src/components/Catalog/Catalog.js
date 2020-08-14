import React, { Component } from 'react';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import './catalog.scss';
import Product from "../../models/Product";
import {withTranslation} from "react-i18next";
import {catalogService} from "../../service/catalog.service";
import DataPanelView from "../../layouts/DataPanelView/DataPanelView";
import PropTypes from "prop-types";

const plurals = ['catalog.plurals.first', 'catalog.plurals.second', 'catalog.plurals.third'];

class Catalog extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    mainComponent = (showCheckedItemsMenu, updateChecked, editItem, addItem, deleteItem, checkedItems, clearCheckedDone,
                     reloadListDone, clearChecked, reloadList, filterInit, sorterInit, pagingInit, disableEdit, contexMenuProps) => {
        return (
            <DataPanelView minimizeHeight={showCheckedItemsMenu}
                           apiService={catalogService}
                           location={this.props.location}
                           columns={Product.buildColumns()}
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
            ></DataPanelView>
        )
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [{ "label": t('catalog.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={Product.buildFilters()}
                        plurals={plurals}
                        dopClass={'catalog_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={catalogService}
                        baseModel={new Product()}
                        location={this.props.location}
                //gridView={this.mainComponent}
                        gridView={false}
                        treeView={false}
                        columns={Product.buildColumns()}
            >
                {this.mainComponent}
            </BaseLayout>
        );
    }
}

export default withTranslation()(Catalog);
