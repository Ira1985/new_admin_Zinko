import React, { Component } from 'react';
import './roles.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import Role, {RoleSchema} from "../../models/Role";
import {roleService} from "../../service/role.service";
import {withTranslation} from "react-i18next";
import RoleEditDialog from "./Edit/RoleEditDialog";
import DataGridView from "../../layouts/DataGridView/DataGridView";

const plurals = ['roles.plurals.first', 'roles.plurals.second', 'roles.plurals.third'];

class Roles extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <RoleEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    mainComponent = (showCheckedItemsMenu, updateChecked, editItem, addItem, deleteItem, checkedItems, clearCheckedDone,
                     reloadListDone, clearChecked, reloadList, filterInit, sorterInit, pagingInit, disableEdit, contexMenuProps) => {
        return (
            <DataGridView minimizeHeight={showCheckedItemsMenu}
                          apiService={roleService}
                          location={this.props.location}
                          columns={Role.buildColumns()}
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
        let  breadcrumbs = [{ "label": t('roles.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={Role.buildFilters()}
                        plurals={plurals}
                        dopClass={'roles_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={roleService}
                        baseSchema={RoleSchema}
                        baseModel={new Role()}
                        location={this.props.location}
                        gridView={false}
                        treeView={false}
                        columns={Role.buildColumns()}
                        editComponent={this.editComponent}
            >
                {this.mainComponent}
            </BaseLayout>
        );
    }
}

export default withTranslation()(Roles);
