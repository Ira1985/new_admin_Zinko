import React, { Component } from 'react';
import './department.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import Department, {DepartmentSchema} from "../../models/Department";
import {departmentService} from "../../service/department.service";
import {withTranslation} from "react-i18next";
import DepartmentEditDialog from "./Edit/DepartmentEditDialog";
import DataGridView from "../../layouts/DataGridView/DataGridView";

const plurals = ['departments.plurals.first', 'departments.plurals.second', 'departments.plurals.third'];

class Departments extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <DepartmentEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    mainComponent = (showCheckedItemsMenu, updateChecked, editItem, addItem, deleteItem, checkedItems, clearCheckedDone,
                     reloadListDone, clearChecked, reloadList, filterInit, sorterInit, pagingInit, disableEdit, contexMenuProps) => {
        return (
            <DataGridView minimizeHeight={showCheckedItemsMenu}
                          apiService={departmentService}
                          location={this.props.location}
                          columns={Department.buildColumns()}
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
        let  breadcrumbs = [{ "label": t('departments.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={Department.buildFilters()}
                        plurals={plurals}
                        dopClass={'departments_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={departmentService}
                        baseSchema={DepartmentSchema}
                        baseModel={new Department()}
                        location={this.props.location}
                        gridView={false}
                        treeView={false}
                        columns={Department.buildColumns()}
                        editComponent={this.editComponent}
            >
                {this.mainComponent}
            </BaseLayout>
        );
    }
}

export default withTranslation()(Departments);
