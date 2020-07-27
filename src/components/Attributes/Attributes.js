import React, { Component } from 'react';
import './attributes.scss';
import BaseLayout from "../layouts/BaseLayout/BaseLayout";
import Attribute, {AttributeSchema} from "../../models/Attribute";
import {attributeService} from "../../service/attribute.service";
import {withTranslation} from "react-i18next";
import {AttributeEditDialog} from "./Edit/AttributeEditDialog";

const plurals = ['attributes.plurals.first', 'attributes.plurals.second', 'attributes.plurals.third'];

class Attributes extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <AttributeEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [{ "label": t('attributes.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={Attribute.buildFilters()}
                        plurals={plurals}
                        dopClass={'attributes_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={attributeService}
                        baseSchema={AttributeSchema}
                        baseModel={new Attribute()}
                        location={this.props.location}
                        gridView={true}
                        treeView={false}
                        columns={Attribute.buildColumns()}
                        editComponent={this.editComponent}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(Attributes);