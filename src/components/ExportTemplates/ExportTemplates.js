import React, { Component } from 'react';
import './exportTemplates.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import ExportTemplate, {ExportTemplateSchema} from "../../models/ExportTemplate";
import {exportTemplateService} from "../../service/exportTemplate.service";
import {withTranslation} from "react-i18next";
import ExportTemplateEditDialog from "./Edit/ExportTemplateEditDialog";
import DataGridView from "../../layouts/DataGridView/DataGridView";
import {Button} from "primereact/button";
import {history} from "../../App";
import GridColumn from "../../models/base/GridColumn";

const plurals = ['exportTemplates.plurals.first', 'exportTemplates.plurals.second', 'exportTemplates.plurals.third'];

class ExportTemplates extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue, filter, filterItems, itemTemplate) => {
        return (
            <ExportTemplateEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} filter={filter} filterItems={filterItems} itemTemplate={itemTemplate} />
        );
    }

    renderActionColumns(rowData, column) {
        const {t} = this.props;
        return <div className={'column-button'}>
            <Button icon="pi p-empty-button list-ico" onClick={() => {
                history.push('/exportTemplates/' + rowData.id + '/constructor');
            }} tooltip={t('exportTemplates.fields.exportConstructor')} tooltipOptions={{position: 'left'}}/>
            <Button icon="pi p-empty-button chain-ico" onClick={() => {
                console.log("link");
            }} tooltip={t('exportTemplates.fields.link')} tooltipOptions={{position: 'left'}}/>
        </div>
    }

    buildColumns() {
        let columns = ExportTemplate.buildColumns();
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
                          apiService={exportTemplateService}
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
        let  breadcrumbs = [{ "label": t('exportTemplates.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={ExportTemplate.buildFilters()}
                        plurals={plurals}
                        dopClass={'exportTemplates_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={exportTemplateService}
                        baseSchema={ExportTemplateSchema}
                        baseModel={new ExportTemplate()}
                        location={this.props.location}
                        gridView={false}
                        treeView={false}
                        columns={ExportTemplate.buildColumns()}
                        editComponent={this.editComponent}
            >
                {this.mainComponent}
            </BaseLayout>
        );
    }
}

export default withTranslation()(ExportTemplates);
