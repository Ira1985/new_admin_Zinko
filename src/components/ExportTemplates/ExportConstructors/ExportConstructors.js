import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import './exportConstructors.scss'
import CategoryEditDialog from "../../Categories/Edit/CategoryEditDialog";
import BaseLayout from "../../../layouts/BaseLayout/BaseLayout";
import ExportConstructor, {ExportConstructorSchema} from "../../../models/ExportConstructor";
import {exportConstructorService} from "../../../service/exportConstructor.service";
import {Button} from "primereact/button";
import GridColumn from "../../../models/base/GridColumn";
import ActionButton from "../../../models/base/ActionButton";
import DataNotLazyTree from "../../../layouts/DataNotLazyTree/DataNotLazyTree";

const plurals = ['models.plurals.first', 'models.plurals.second', 'models.plurals.third'];

class ExportConstructors extends Component {

    constructor(props) {
        super(props);
        let exportTemplatesId = this.props.match.params.id;
        this.state = {
            etId: exportTemplatesId
        };
    }

    editComponent = (loading, editItem, updateValue, filter, filterItems) => {
        return (
            <CategoryEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} filter={filter} filterItems={filterItems} />
        );
    }

    /*renderActionColumns(rowData, column) {
        const {t} = this.props;
        return <div className={'column-button'}>
            <Button icon="pi p-empty-button case-ico" onClick={(e) => history.push('/catalog')}/>
            <Button icon="pi p-empty-button plus-ico"/>
            <Button icon="pi p-empty-button times-ico"/>
            <Button icon="pi p-empty-button chain-ico"  onClick={(e) =>{
                history.push('categories/' + rowData.id + '/cat2Attrs')
            }
            }/>
        </div>
    }*/

    buildColumns() {
        let columns = ExportConstructor.buildColumns();
        columns.push(new GridColumn().build({field: '', header: '', style: {textAlign:'center'}, actionColumn: true,
            order: 50,
            actionWidth: 120,
            default: true,
            /*widthCoef: 1,*/
            bodyStyle: {textAlign: 'center'},
            /*renderer: (rowData, column) => this.renderActionColumns(rowData, column),*/
            actions: [
                new ActionButton().build({icon: "pi pi-filter", tooltip:'exportConstructors.actions.filter', onClick: (rowData, column) => {console.log("filter")}}),
            ]
        }));

        return columns;
    }

    mainComponent = (showCheckedItemsMenu, updateChecked, editItem, addItem, deleteItem, checkedItems, clearCheckedDone,
                     reloadListDone, clearChecked, reloadList, filterInit, sorterInit, pagingInit, disableEdit, contexMenuProps, reloadReason, changedList) => {
        return (
            <DataNotLazyTree minimizeHeight={showCheckedItemsMenu}
                          apiService={exportConstructorService}
                          location={this.props.location}
                          etId={this.props.match.params.id}
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
                          reloadReason={reloadReason}
                          changedList={changedList}
            ></DataNotLazyTree>
        )
    }

    render() {
        const {t} = this.props;
        let {etId} = this.state;
        let  breadcrumbs = [{ "label": (t('exportTemplates.breadcrumbs.name') + ' (' + etId + ')'), url: '/exportTemplates'},{ "label": t('exportConstructors.breadcrumbs.name')}];

        let contexMenuProps = {
            showEdit: true,
            showDelete: true,
            showChildAdd: true,
            buttons: [
                /*{label: "categories.actions.edit", command: (item) => console.log(item)}*/
            ]
        };

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={ExportConstructor.buildFilters()}
                        plurals={plurals}
                        dopClass={'countries_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={exportConstructorService}
                        baseSchema={ExportConstructorSchema}
                        baseModel={new ExportConstructor()}
                        location={this.props.location}
                        gridView={false}
                        treeView={false}
                        columns={this.buildColumns()}
                        editComponent={this.editComponent}
                        contexMenuProps={contexMenuProps}
            >
                {this.mainComponent}
            </BaseLayout>
        );
    }
}

export default withTranslation()(ExportConstructors);