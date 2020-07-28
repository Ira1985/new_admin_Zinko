import React, { Component } from 'react';
import './units.scss';
import BaseLayout from "../layouts/BaseLayout/BaseLayout";
import Unit, {UnitSchema} from "../../models/Unit";
import {unitService} from "../../service/unit.service";
import {withTranslation} from "react-i18next";
import UnitEditDialog from "./Edit/UnitEditDialog";

const plurals = ['units.plurals.first', 'units.plurals.second', 'units.plurals.third'];

class Units extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <UnitEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [{ "label": t('units.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={Unit.buildFilters()}
                        plurals={plurals}
                        dopClass={'units_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={unitService}
                        baseSchema={UnitSchema}
                        baseModel={new Unit()}
                        location={this.props.location}
                        gridView={true}
                        treeView={false}
                        columns={Unit.buildColumns()}
                        editComponent={this.editComponent}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(Units);