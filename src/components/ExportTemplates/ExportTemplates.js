import React, { Component } from 'react';
import './exportTemplates.scss';
import BaseLayout from "../layouts/BaseLayout/BaseLayout";
import ExportTemplate, {ExportTemplateSchema} from "../../models/ExportTemplate";
import {exportTemplateService} from "../../service/exportTemplate.service";
import {withTranslation} from "react-i18next";
import ExportTemplateEditDialog from "./Edit/ExportTemplateEditDialog";

const plurals = ['exportTemplates.plurals.first', 'exportTemplates.plurals.second', 'exportTemplates.plurals.third'];

class ExportTemplates extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue) => {
        return (
            <ExportTemplateEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} />
        );
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [{ "label": t('exportTemplates.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={ExportTemplate.buildFilters()}
                        plurals={plurals}
                        dopClass={'exportTemplates_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={exportTemplateService}
                        baseSchema={ExportTemplateSchema}
                        baseModel={new ExportTemplate()}
                        location={this.props.location}
                        gridView={true}
                        treeView={false}
                        columns={ExportTemplate.buildColumns()}
                        editComponent={this.editComponent}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(ExportTemplates);