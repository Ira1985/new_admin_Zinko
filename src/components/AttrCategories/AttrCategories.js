import React, { Component } from 'react';
import './attrCategories.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import AttrCategory, {AttrCategorySchema} from "../../models/AttrCategory";
import {attrCategoryService} from "../../service/attrCategory.service";
import {withTranslation} from "react-i18next";
import AttrCategoryEditDialog from "./Edit/AttrCategoryEditDialog";
import DataGridView from "../../layouts/DataGridView/DataGridView";

const plurals = ['attrCategories.plurals.first', 'attrCategories.plurals.second', 'attrCategories.plurals.third'];

class AttrCategories extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <AttrCategoryEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    };

    mainComponent = (showCheckedItemsMenu, updateChecked, editItem, addItem, deleteItem, checkedItems, clearCheckedDone,
                     reloadListDone, clearChecked, reloadList, filterInit, sorterInit, pagingInit, disableEdit, contexMenuProps) => {
        return (
            <DataGridView minimizeHeight={showCheckedItemsMenu}
                          apiService={attrCategoryService}
                          location={this.props.location}
                          columns={AttrCategory.buildColumns()}
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
        let  breadcrumbs = [{ "label": t('attrCategories.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={AttrCategory.buildFilters()}
                        plurals={plurals}
                        dopClass={'attrCategories_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={attrCategoryService}
                        baseSchema={AttrCategorySchema}
                        baseModel={new AttrCategory()}
                        location={this.props.location}
                        gridView={false}
                        treeView={false}
                        columns={AttrCategory.buildColumns()}
                        editComponent={this.editComponent}
            >
                {this.mainComponent}
            </BaseLayout>
        );
    }
}

export default withTranslation()(AttrCategories);
