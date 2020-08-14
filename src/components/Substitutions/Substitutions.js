import React, { Component } from 'react';
import './substitutions.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import Substitution, {SubstitutionSchema} from "../../models/Substitution";
import {substitutionService} from "../../service/substitution.service";
import {withTranslation} from "react-i18next";
import SubstitutionEditDialog from "./Edit/SubstitutionEditDialog";
import DataGridView from "../../layouts/DataGridView/DataGridView";

const plurals = ['substitutions.plurals.first', 'substitutions.plurals.second', 'substitutions.plurals.third'];

class Substitutions extends Component {

    constructor(props) {
        super(props);
        let subsId = this.props.match.params.id;
        let filtersNew = {};
        filtersNew['subsGroupId'] = +subsId;

        this.state = {
            dopFilter: filtersNew,
            subsGroup: {},
            subsGroupId: subsId
        };
    }

    loadOnMount = () => {
        return Promise.resolve(this.gettingSubsGroup())
    }

    gettingSubsGroup() {
        const {subsGroup, subsGroupId} = this.state;
        if(subsGroupId) {
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
            <SubstitutionEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    mainComponent = (showCheckedItemsMenu, updateChecked, editItem, addItem, deleteItem, checkedItems, clearCheckedDone,
                     reloadListDone, clearChecked, reloadList, filterInit, sorterInit, pagingInit, disableEdit, contexMenuProps) => {
        return (
            <DataGridView minimizeHeight={showCheckedItemsMenu}
                          apiService={substitutionService}
                          location={this.props.location}
                          columns={Substitution.buildColumns()}
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
        const {dopFilter, subsGroupId} = this.state;
        let  breadcrumbs = [{ "label": (t('subsGroups.breadcrumbs.name') + ' (' + subsGroupId + ')'), url: '/subsGroups'},{ "label": t('substitutions.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={Substitution.buildFilters()}
                        plurals={plurals}
                        dopClass={'substitutions_main'}
                        filterInit={dopFilter}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={substitutionService}
                        baseSchema={SubstitutionSchema}
                        baseModel={new Substitution()}
                        location={this.props.location}
                        gridView={false}
                        treeView={false}
                        columns={Substitution.buildColumns()}
                        editComponent={this.editComponent}
            >
                {this.mainComponent}
            </BaseLayout>
        );
    }
}

export default withTranslation()(Substitutions);
