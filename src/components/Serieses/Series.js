import React, { Component } from 'react';
import './series.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import Serie, {SerieSchema} from "../../models/Serie";
import {seriesService} from "../../service/series.service";
import {withTranslation} from "react-i18next";
import SeriesEditDialog from "./Edit/SeriesEditDialog";
import DataGridView from "../../layouts/DataGridView/DataGridView";

const plurals = ['series.plurals.first', 'series.plurals.second', 'series.plurals.third'];

class Series extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <SeriesEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    mainComponent = (showCheckedItemsMenu, updateChecked, editItem, addItem, deleteItem, checkedItems, clearCheckedDone,
                     reloadListDone, clearChecked, reloadList, filterInit, sorterInit, pagingInit, disableEdit, contexMenuProps) => {
        return (
            <DataGridView minimizeHeight={showCheckedItemsMenu}
                          apiService={seriesService}
                          location={this.props.location}
                          columns={Serie.buildColumns()}
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
        let  breadcrumbs = [{ "label": t('series.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={Serie.buildFilters()}
                        plurals={plurals}
                        dopClass={'series_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={seriesService}
                        baseSchema={SerieSchema}
                        baseModel={new Serie()}
                        location={this.props.location}
                        gridView={false}
                        treeView={false}
                        columns={Serie.buildColumns()}
                        editComponent={this.editComponent}
            >
                {this.mainComponent}
            </BaseLayout>
        );
    }
}

export default withTranslation()(Series);
