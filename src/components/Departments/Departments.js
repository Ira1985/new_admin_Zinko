import React, { Component } from 'react';
import './department.scss';
import BaseLayout from "../layouts/BaseLayout/BaseLayout";
import Department, {DepartmentSchema} from "../../models/Department";
import {departmentService} from "../../service/department.service";
import {withTranslation} from "react-i18next";
import {DepartmentEditDialog} from "./Edit/DepartmentEditDialog";

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
                        gridView={true}
                        treeView={false}
                        columns={Department.buildColumns()}
                        editComponent={this.editComponent}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(Departments);