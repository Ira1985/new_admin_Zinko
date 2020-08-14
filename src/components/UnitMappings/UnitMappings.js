import React, { Component } from 'react';
import './unitMappings.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import UnitMapping, {UnitMappingSchema} from "../../models/UnitMapping";
import {unitMappingService} from "../../service/unitMapping.service";
import {withTranslation} from "react-i18next";
import UnitMappingEditDialog from "./Edit/UnitMappingEditDialog";
import DataGridView from "../../layouts/DataGridView/DataGridView";

const plurals = ['unitMappings.plurals.first', 'unitMappings.plurals.second', 'unitMappings.plurals.third'];

class UnitMappings extends Component {

    constructor(props) {
        super(props);
        let unitFromId = props.match.params.id;
        let filtersNew = {};
        filtersNew['unitFromId'] = +unitFromId;

        this.state = {
            dopFilter: filtersNew,
            unitFrom: {},
            unitFromId: unitFromId
        };
    }

    loadOnMount = () => {
        return Promise.resolve(this.gettingSubsGroup())
    }

    gettingSubsGroup() {
        const {unitFrom, unitFromId} = this.state;
        if(unitFrom) {
            /* return subsGroupsService.getItem(subsGroupId)
                 .then(
                     response => {
                         this.setState({
                             subsGroup: response.pageItems[0]
                         });
                         return true;
                     },
                     error => {
                         toast.error('Ошибка получения группы подстановок ', toastConfig);
                         return false;
                     });*/
        }
        return Promise.resolve(true);
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <UnitMappingEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    mainComponent = (showCheckedItemsMenu, updateChecked, editItem, addItem, deleteItem, checkedItems, clearCheckedDone,
                     reloadListDone, clearChecked, reloadList, filterInit, sorterInit, pagingInit, disableEdit, contexMenuProps) => {
        return (
            <DataGridView minimizeHeight={showCheckedItemsMenu}
                          apiService={unitMappingService}
                          location={this.props.location}
                          columns={UnitMapping.buildColumns()}
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
        const {dopFilter, unitFromId} = this.state;

        let  breadcrumbs = [{ "label": (t('units.breadcrumbs.name') + ' (' + unitFromId + ')'), url: '/units'},{ "label": t('unitMappings.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={UnitMapping.buildFilters()}
                        plurals={plurals}
                        dopClass={'unitMappings_main'}
                        filterInit={dopFilter}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={unitMappingService}
                        baseSchema={UnitMappingSchema}
                        baseModel={new UnitMapping()}
                        location={this.props.location}
                        gridView={false}
                        treeView={false}
                        columns={UnitMapping.buildColumns()}
                        editComponent={this.editComponent}
            >
                {this.mainComponent}
            </BaseLayout>
        );
    }
}

export default withTranslation()(UnitMappings);
