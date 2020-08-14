import React, { Component } from 'react';
import './models.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import Model, {ModelSchema} from "../../models/Model";
import {modelService} from "../../service/model.service";
import {withTranslation} from "react-i18next";
import ModelEditDialog from "./Edit/ModelEditDialog";
import DataGridView from "../../layouts/DataGridView/DataGridView";

const plurals = ['models.plurals.first', 'models.plurals.second', 'models.plurals.third'];

class Models extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <ModelEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    mainComponent = (showCheckedItemsMenu, updateChecked, editItem, addItem, deleteItem, checkedItems, clearCheckedDone,
                     reloadListDone, clearChecked, reloadList, filterInit, sorterInit, pagingInit, disableEdit, contexMenuProps) => {
        return (
            <DataGridView minimizeHeight={showCheckedItemsMenu}
                          apiService={modelService}
                          location={this.props.location}
                          columns={Model.buildColumns()}
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
        let  breadcrumbs = [{ "label": t('models.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={Model.buildFilters()}
                        plurals={plurals}
                        dopClass={'models_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={modelService}
                        baseSchema={ModelSchema}
                        baseModel={new Model()}
                        location={this.props.location}
                        gridView={false}
                        treeView={false}
                        columns={Model.buildColumns()}
                        editComponent={this.editComponent}
            >
                {this.mainComponent}
            </BaseLayout>
        );
    }
}

export default withTranslation()(Models);
