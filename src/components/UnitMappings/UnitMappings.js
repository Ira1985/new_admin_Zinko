import React, { Component } from 'react';
import './unitMappings.scss';
import BaseLayout from "../layouts/BaseLayout/BaseLayout";
import UnitMapping, {UnitMappingSchema} from "../../models/UnitMapping";
import {unitMappingService} from "../../service/unitMapping.service";
import {withTranslation} from "react-i18next";
import {UnitMappingEditDialog} from "./Edit/UnitMappingEditDialog";

const plurals = ['unitMappings.plurals.first', 'unitMappings.plurals.second', 'unitMappings.plurals.third'];

class UnitMappings extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <UnitMappingEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [{ "label": t('unitMappings.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={UnitMapping.buildFilters()}
                        plurals={plurals}
                        dopClass={'unitMappings_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={unitMappingService}
                        baseSchema={UnitMappingSchema}
                        baseModel={new UnitMapping()}
                        location={this.props.location}
                        gridView={true}
                        treeView={false}
                        columns={UnitMapping.buildColumns()}
                        editComponent={this.editComponent}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(UnitMappings);