import React, { Component } from 'react';
import './users.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import User, {UserSchema} from "../../models/User";
import {userService} from "../../service/user.service";
import {withTranslation} from "react-i18next";
import UserEditDialog from "./Edit/UserEditDialog";

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
                        gridView={true}
                        treeView={false}
                        columns={User.buildColumns()}
                        editComponent={this.editComponent}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(Users);
