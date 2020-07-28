import React, { Component } from 'react';
import './subsGroups.scss';
import BaseLayout from "../layouts/BaseLayout/BaseLayout";
import SubsGroup, {SubsGroupSchema} from "../../models/SubsGroup";
import {subsGroupService} from "../../service/subsGroup.service";
import {withTranslation} from "react-i18next";
import SubsGroupEditDialog from "./Edit/SubsGroupEditDialog";
import Attribute from "../../models/Attribute";
import GridColumn from "../../models/base/GridColumn";
import {Button} from "primereact/button";
import history from "./../../App";

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

    renderActionColumns(rowData, column) {
        const {t} = this.props;
        return <div className={'column-button'}>
            <Button icon="pi p-empty-button chain-ico" onClick={() => {
                history.push('/subs_groups/' + rowData.id + '/subs');
            }} tooltip={t('subsGroups.fields.showSubs')}/>
        </div>
    }

    buildColumns() {
        let columns = SubsGroup.buildColumns();
        columns.push(new GridColumn().build({field: '', header: '', style: {textAlign:'center'}, actionColumn: true,
            order: 50,
            actionWidth: 40,
            default: true,
            /*widthCoef: 1,*/
            bodyStyle: {textAlign: 'center'},
            renderer: (rowData, column) => this.renderActionColumns(rowData, column)}));

        return columns;
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
                        columns={this.buildColumns()}
                        editComponent={this.editComponent}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(SubsGroups);