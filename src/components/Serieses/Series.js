import React, { Component } from 'react';
import './series.scss';
import BaseLayout from "../layouts/BaseLayout/BaseLayout";
import Serie, {SerieSchema} from "../../models/Serie";
import {seriesService} from "../../service/series.service";
import {withTranslation} from "react-i18next";
import SeriesEditDialog from "./Edit/SeriesEditDialog";

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
                        gridView={true}
                        treeView={false}
                        columns={Serie.buildColumns()}
                        editComponent={this.editComponent}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(Series);
