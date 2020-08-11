import React, { Component } from 'react';
import './units.scss';
import BaseLayout from "../../layouts/BaseLayout/BaseLayout";
import Unit, {UnitSchema} from "../../models/Unit";
import {unitService} from "../../service/unit.service";
import {withTranslation} from "react-i18next";
import UnitEditDialog from "./Edit/UnitEditDialog";
import {Button} from "primereact/button";
import {history} from "../../App";
import SubsGroup from "../../models/SubsGroup";
import GridColumn from "../../models/base/GridColumn";

const plurals = ['units.plurals.first', 'units.plurals.second', 'units.plurals.third'];

class Units extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderActionColumns(rowData, column) {
        const {t} = this.props;
        return <div className={'column-button'}>
            <Button icon="pi p-empty-button chain-ico" onClick={() => {
                history.push('/units/' + rowData.id + '/mapping');
            }} tooltip={t('units.fields.showMapping')} />
        </div>
    }

    buildColumns() {
        let columns = SubsGroup.buildColumns();
        columns.push(new GridColumn().build({field: '', header: '', style: {textAlign:'center'}, actionColumn: true,
            order: 50,
            actionWidth: 40,
            default: true,
            /*widthCoef: 1,*/
            bodyStyle: {textAlign: 'center'},
            renderer: (rowData, column) => this.renderActionColumns(rowData, column)}));

        return columns;
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
                        columns={this.buildColumns()}
                        editComponent={this.editComponent}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(Units);
