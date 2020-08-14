import React, { Component } from 'react';
import './attributes.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import Attribute, {AttributeSchema} from "../../models/Attribute";
import {attributeService} from "../../service/attribute.service";
import {withTranslation} from "react-i18next";
import AttributeEditDialog from "./Edit/AttributeEditDialog";
import DataGridView from "../../layouts/DataGridView/DataGridView";

const plurals = ['attributes.plurals.first', 'attributes.plurals.second', 'attributes.plurals.third'];

class Attributes extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue, filter, filterItems, itemTemplate) => {
        return (
            <AttributeEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} filter={filter} filterItems={filterItems} itemTemplate={itemTemplate} />
        );
    };

    mainComponent = (showCheckedItemsMenu, updateChecked, editItem, addItem, deleteItem, checkedItems, clearCheckedDone,
                     reloadListDone, clearChecked, reloadList, filterInit, sorterInit, pagingInit, disableEdit, contexMenuProps) => {
        return (
            <DataGridView minimizeHeight={showCheckedItemsMenu}
                          apiService={attributeService}
                          location={this.props.location}
                          columns={Attribute.buildColumns()}
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
        let  breadcrumbs = [{ "label": t('attributes.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={Attribute.buildFilters()}
                        plurals={plurals}
                        dopClass={'attributes_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={attributeService}
                        baseSchema={AttributeSchema}
                        baseModel={new Attribute()}
                        location={this.props.location}
                        gridView={false}
                        treeView={false}
                        columns={Attribute.buildColumns()}
                        editComponent={this.editComponent}
            >
                {this.mainComponent}
            </BaseLayout>
        );
    }
}

export default withTranslation()(Attributes);
