import React, { Component } from 'react';
import './models.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import Model, {ModelSchema} from "../../models/Model";
import {modelService} from "../../service/model.service";
import {withTranslation} from "react-i18next";
import ModelEditDialog from "./Edit/ModelEditDialog";

const plurals = ['models.plurals.first', 'models.plurals.second', 'models.plurals.third'];

class Models extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <ModelEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [{ "label": t('models.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={Model.buildFilters()}
                        plurals={plurals}
                        dopClass={'models_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={modelService}
                        baseSchema={ModelSchema}
                        baseModel={new Model()}
                        location={this.props.location}
                        gridView={true}
                        treeView={false}
                        columns={Model.buildColumns()}
                        editComponent={this.editComponent}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(Models);
