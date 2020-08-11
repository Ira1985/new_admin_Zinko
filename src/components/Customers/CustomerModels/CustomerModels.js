import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import './customerModels.scss'
import CustomerEditDialog from "../Edit/CustomerEditDialog";
import BaseLayout from "../../../layouts/BaseLayout/BaseLayout";
import CustomerModel from "../../../models/CustomerModel";
import {CustomerSchema} from "../../../models/Customer";
import {customerModelService} from "../../../service/customerModel.service";
import {Button} from "primereact/button";
import {history} from "../../../App";
import SubsGroup from "../../../models/SubsGroup";
import GridColumn from "../../../models/base/GridColumn";
import ActionButton from "../../../models/base/ActionButton";

const plurals = ['customerModels.plurals.first', 'customerModels.plurals.second', 'customerModels.plurals.third'];

class CustomerModels extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue, filter, filterItems) => {
        return (
            <CustomerEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} filter={filter} filterItems={filterItems} />
        );
    }

    /*renderActionColumns(rowData, column) {
        const {t} = this.props;
        return <div className={'column-button'}>
            <Button icon="pi p-empty-button case-ico" onClick={(e) => history.push('/catalog')}/>
            <Button icon="pi p-empty-button plus-ico"/>
            <Button icon="pi p-empty-button times-ico"/>
            <Button icon="pi p-empty-button chain-ico"  onClick={(e) =>{
                history.push('categories/' + rowData.id + '/cat2Attrs')
            }
            }/>
        </div>
    }*/

    buildColumns() {
        let columns = CustomerModel.buildColumns();
        columns.push(new GridColumn().build({field: '', header: '', style: {textAlign:'center'}, actionColumn: true,
            order: 50,
            actionWidth: 120,
            default: true,
            /*widthCoef: 1,*/
            bodyStyle: {textAlign: 'center'},
            /*renderer: (rowData, column) => this.renderActionColumns(rowData, column),*/
            actions: [
                new ActionButton().build({icon: "pi p-empty-button case-ico", onClick: (rowData, column) => {
                        const win = window.open('/catalog', '_blank');
                        if (win != null) {
                            win.focus();
                        }}}),
                new ActionButton().build({icon: "pi p-empty-button times-ico", remove: true})
            ]
        }));

        return columns;
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [
            { "label": t('customerModels.breadcrumbs.name')}
        ];

        let contexMenuProps = {
            showEdit: true,
            showDelete: true,
            showChildAdd: true,
            buttons: [
                {label: t("baseLayout.main.other.edit2"), command: (item) => console.log(item)}
            ]
        };

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={CustomerModel.buildFilters()}
                        plurals={plurals}
                        dopClass={'customerModels_main'}
                /*dopToolbarButtons={toolbarButtons}
                dopCheckedButtons={checkedButtons}*/
                        apiService={customerModelService}
                        baseSchema={CustomerSchema}
                        baseModel={new CustomerModel()}
                        location={this.props.location}
                        gridView={false}
                        treeView={true}
                        columns={this.buildColumns()}
                        editComponent={this.editComponent}
                        contexMenuProps={contexMenuProps}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(CustomerModels);
