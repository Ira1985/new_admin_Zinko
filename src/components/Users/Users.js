import React, { Component } from 'react';
import './users.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import User, {UserSchema} from "../../models/User";
import {userService} from "../../service/user.service";
import {withTranslation} from "react-i18next";
import UserEditDialog from "./Edit/UserEditDialog";
import DataGridView from "../../layouts/DataGridView/DataGridView";

const plurals = ['users.plurals.first', 'users.plurals.second', 'users.plurals.third'];

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <UserEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    mainComponent = (showCheckedItemsMenu, updateChecked, editItem, addItem, deleteItem, checkedItems, clearCheckedDone,
                     reloadListDone, clearChecked, reloadList, filterInit, sorterInit, pagingInit, disableEdit, contexMenuProps) => {
        return (
            <DataGridView minimizeHeight={showCheckedItemsMenu}
                          apiService={userService}
                          location={this.props.location}
                          columns={User.buildColumns()}
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
        let  breadcrumbs = [{ "label": t('users.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={User.buildFilters()}
                        plurals={plurals}
                        dopClass={'users_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={userService}
                        baseSchema={UserSchema}
                        baseModel={new User()}
                        location={this.props.location}
                        gridView={false}
                        treeView={false}
                        columns={User.buildColumns()}
                        editComponent={this.editComponent}
            >
                {this.mainComponent}
            </BaseLayout>
        );
    }
}

export default withTranslation()(Users);
