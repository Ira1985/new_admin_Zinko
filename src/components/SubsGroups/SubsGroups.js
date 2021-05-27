import React, { Component } from 'react';
import './subsGroups.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import SubsGroup, {SubsGroupSchema} from "../../models/SubsGroup";
import {subsGroupService} from "../../service/subsGroup.service";
import {withTranslation} from "react-i18next";
import SubsGroupEditDialog from "./Edit/SubsGroupEditDialog";
import Attribute from "../../models/Attribute";
import GridColumn from "../../models/base/GridColumn";
import {Button} from "primereact/button";
import {history} from "./../../App";
import DataGridView from "../../layouts/DataGridView/DataGridView";

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
                history.push('/subsGroups/' + rowData.id + '/values');
            }} tooltip={t('subsGroups.fields.showSubs')} tooltipOptions={{position: 'left'}}/>
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

    mainComponent = (showCheckedItemsMenu, updateChecked, editItem, addItem, deleteItem, checkedItems, clearCheckedDone,
                     reloadListDone, clearChecked, reloadList, filterInit, sorterInit, pagingInit, disableEdit, contexMenuProps) => {
        return (
            <DataGridView minimizeHeight={showCheckedItemsMenu}
                          apiService={subsGroupService}
                          location={this.props.location}
                          columns={this.buildColumns()}
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
                        gridView={false}
                        treeView={false}
                        columns={this.buildColumns()}
                        editComponent={this.editComponent}
            >
                {this.mainComponent}
            </BaseLayout>
        );
    }
}

export default withTranslation()(SubsGroups);
