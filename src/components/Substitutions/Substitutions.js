import React, { Component } from 'react';
import './substitutions.scss';
import BaseLayout from "../layouts/BaseLayout/BaseLayout";
import Substitution, {SubstitutionSchema} from "../../models/Substitution";
import {substitutionService} from "../../service/substitution.service";
import {withTranslation} from "react-i18next";
import {SubstitutionEditDialog} from "./Edit/SubstitutionEditDialog";

const plurals = ['substitutions.plurals.first', 'substitutions.plurals.second', 'substitutions.plurals.third'];

class Substitutions extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <SubstitutionEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [{ "label": t('substitutions.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={Substitution.buildFilters()}
                        plurals={plurals}
                        dopClass={'substitutions_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={substitutionService}
                        baseSchema={SubstitutionSchema}
                        baseModel={new Substitution()}
                        location={this.props.location}
                        gridView={true}
                        treeView={false}
                        columns={Substitution.buildColumns()}
                        editComponent={this.editComponent}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(Substitutions);