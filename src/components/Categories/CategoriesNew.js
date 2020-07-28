import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import './categoriesNew.scss'
import CountryEditDialog from "../Countries/Edit/CountryEditDialog";
import BaseLayout from "../layouts/BaseLayout/BaseLayout";
import Category, {CategorySchema} from "../../models/Category";
import {categoryNewService} from "../../service/categoryNew.service";

const plurals = ['models.plurals.first', 'models.plurals.second', 'models.plurals.third'];

class CategoriesNew extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <CountryEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [{ "label": t('countries.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={Category.buildFilters()}
                        plurals={plurals}
                        dopClass={'countries_main'}
                        /*dopToolbarButtons={toolbarButtons}
                        dopCheckedButtons={checkedButtons}*/
                        apiService={categoryNewService}
                        baseSchema={CategorySchema}
                        baseModel={new Category()}
                        location={this.props.location}
                        gridView={false}
                        treeView={true}
                        columns={Category.buildColumns()}
                        editComponent={this.editComponent}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(CategoriesNew);
