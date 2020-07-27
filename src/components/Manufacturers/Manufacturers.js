import React, { Component } from 'react';
import './manufacturers.scss';
import BaseLayout from "../layouts/BaseLayout/BaseLayout";
import Manufacturer , {ManufacturerSchema} from "../../models/Manufacturer";
import {manufacturerService} from "../../service/manufacturer.service";
import {withTranslation} from "react-i18next";
import {ManufacturerEditDialog} from "./Edit/ManufacturerEditDialog";

const plurals = ['manufacturers.plurals.first', 'manufacturers.plurals.second', 'manufacturers.plurals.third'];

class Manufacturers extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <ManufacturerEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [{ "label": t('manufacturers.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={Manufacturer.buildFilters()}
                        plurals={plurals}
                        dopClass={'manufacturers_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={manufacturerService}
                        baseSchema={ManufacturerSchema}
                        baseModel={new Manufacturer()}
                        location={this.props.location}
                        gridView={true}
                        treeView={false}
                        columns={Manufacturer.buildColumns()}
                        editComponent={this.editComponent}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(Manufacturers);
