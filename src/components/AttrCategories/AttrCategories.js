import React, { Component } from 'react';
import './attrCategories.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import AttrCategory, {AttrCategorySchema} from "../../models/AttrCategory";
import {attrCategoryService} from "../../service/attrCategory.service";
import {withTranslation} from "react-i18next";
import AttrCategoryEditDialog from "./Edit/AttrCategoryEditDialog";

const plurals = ['attrCategories.plurals.first', 'attrCategories.plurals.second', 'attrCategories.plurals.third'];

class AttrCategories extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <AttrCategoryEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [{ "label": t('attrCategories.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={AttrCategory.buildFilters()}
                        plurals={plurals}
                        dopClass={'attrCategories_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={attrCategoryService}
                        baseSchema={AttrCategorySchema}
                        baseModel={new AttrCategory()}
                        location={this.props.location}
                        gridView={true}
                        treeView={false}
                        columns={AttrCategory.buildColumns()}
                        editComponent={this.editComponent}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(AttrCategories);
