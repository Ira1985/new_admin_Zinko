import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import './categoriesNew.scss'
import CategoryEditDialog from "./Edit/CategoryEditDialog";
import BaseLayout from "../layouts/BaseLayout/BaseLayout";
import Category, {CategorySchema} from "../../models/Category";
import {categoryNewService} from "../../service/categoryNew.service";
import {Button} from "primereact/button";
import {history} from "../../App";
import SubsGroup from "../../models/SubsGroup";
import GridColumn from "../../models/base/GridColumn";

const plurals = ['models.plurals.first', 'models.plurals.second', 'models.plurals.third'];

class CategoriesNew extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    editComponent = (loading, editItem, updateValue, filter, filterItems) => {
        return (
            <CategoryEditDialog loading={loading} editedItem={editItem} updateValue={updateValue} filter={filter} filterItems={filterItems} />
        );
    }

    renderActionColumns(rowData, column) {
        const {t} = this.props;
        return <div className={'column-button'}>
            {/*<Button icon="pi p-empty-button chain-ico" onClick={() => {
                history.push('/subsGroups/' + rowData.id + '/values');
            }} tooltip={t('subsGroups.fields.showSubs')}/>*/}
            <Button icon="pi p-empty-button case-ico" onClick={(e) => history.push('/catalog')}/>
            <Button icon="pi p-empty-button plus-ico"/>
            <Button icon="pi p-empty-button times-ico"/>
            <Button icon="pi p-empty-button chain-ico"  onClick={(e) =>{
                history.push('categories/' + rowData.id + '/cat2Attrs')
            }
            }/>
        </div>
    }

    buildColumns() {
        let columns = SubsGroup.buildColumns();
        columns.push(new GridColumn().build({field: '', header: '', style: {textAlign:'center'}, actionColumn: true,
            order: 50,
            actionWidth: 120,
            default: true,
            /*widthCoef: 1,*/
            bodyStyle: {textAlign: 'center'},
            renderer: (rowData, column) => this.renderActionColumns(rowData, column)}));

        return columns;
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [{ "label": t('categories.breadcrumbs.name')}];

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
                        columns={this.buildColumns()}
                        editComponent={this.editComponent}
                        contexMenuProps={contexMenuProps}
            >
            </BaseLayout>
        );
    }
}

export default withTranslation()(CategoriesNew);
