import React, { Component } from 'react';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import './brands.scss';
import Brand, {BrandSchema} from "../../models/Brand";
import {withTranslation} from "react-i18next";
import {brandService} from "../../service/brand.service";
import BrandEditDialog from "./Edit/BrandEditDialog";
import PropTypes from "prop-types";

const plurals = ['brands.plurals.first', 'brands.plurals.second', 'brands.plurals.third'];

class Brands extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <BrandEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [{ "label": t('brands.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={Brand.buildFilters()}
                        plurals={plurals}
                        dopClass={'brands_main'}
                        /*dopToolbarButtons={toolbarButtons}
                        dopCheckedButtons={checkedButtons}*/
                        apiService={brandService}
                        baseSchema={BrandSchema}
                        baseModel={new Brand()}
                        location={this.props.location}
                        gridView={true}
                        treeView={false}
                        columns={Brand.buildColumns()}
                        editComponent={this.editComponent}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(Brands);
