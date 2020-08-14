import React, { Component } from 'react';
import './families.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import Family, {FamilySchema} from "../../models/Family";
import {familyService} from "../../service/family.service";
import {withTranslation} from "react-i18next";
import FamilyEditDialog from "./Edit/FamilyEditDialog";
import DataGridView from "../../layouts/DataGridView/DataGridView";

const plurals = ['families.plurals.first', 'families.plurals.second', 'families.plurals.third'];

class Families extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <FamilyEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    mainComponent = (showCheckedItemsMenu, updateChecked, editItem, addItem, deleteItem, checkedItems, clearCheckedDone,
                     reloadListDone, clearChecked, reloadList, filterInit, sorterInit, pagingInit, disableEdit, contexMenuProps) => {
        return (
            <DataGridView minimizeHeight={showCheckedItemsMenu}
                          apiService={familyService}
                          location={this.props.location}
                          columns={Family.buildColumns()}
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
        let  breadcrumbs = [{ "label": t('families.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={Family.buildFilters()}
                        plurals={plurals}
                        dopClass={'families_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={familyService}
                        baseSchema={FamilySchema}
                        baseModel={new Family()}
                        location={this.props.location}
                        gridView={false}
                        treeView={false}
                        columns={Family.buildColumns()}
                        editComponent={this.editComponent}
            >
                {this.mainComponent}
            </BaseLayout>
        );
    }
}

export default withTranslation()(Families);
