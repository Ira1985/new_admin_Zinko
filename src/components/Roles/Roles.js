import React, { Component } from 'react';
import './roles.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import Role, {RoleSchema} from "../../models/Role";
import {roleService} from "../../service/role.service";
import {withTranslation} from "react-i18next";
import RoleEditDialog from "./Edit/RoleEditDialog";

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
                        gridView={true}
                        treeView={false}
                        columns={Role.buildColumns()}
                        editComponent={this.editComponent}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(Roles);
