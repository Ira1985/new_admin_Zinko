import React, { Component } from 'react';
import './subsGroups.scss';
import BaseLayout from "../layouts/BaseLayout/BaseLayout";
import SubsGroup, {SubsGroupSchema} from "../../models/SubsGroup";
import {subsGroupService} from "../../service/subsGroup.service";
import {withTranslation} from "react-i18next";
import {SubsGroupEditDialog} from "./Edit/SubsGroupEditDialog";

const plurals = ['subsGroups.plurals.first', 'subsGroups.plurals.second', 'subsGroups.plurals.third'];

class SubsGroups extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <SubsGroupEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [{ "label": t('subsGroups.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={SubsGroup.buildFilters()}
                        plurals={plurals}
                        dopClass={'subsGroups_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={subsGroupService}
                        baseSchema={SubsGroupSchema}
                        baseModel={new SubsGroup()}
                        location={this.props.location}
                        gridView={true}
                        treeView={false}
                        columns={SubsGroup.buildColumns()}
                        editComponent={this.editComponent}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(SubsGroups);