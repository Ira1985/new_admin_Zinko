import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import "./cat2Attr.scss";
import {categoryNewService} from "../../../service/categoryNew.service";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {ContextMenu} from 'primereact/contextmenu';
import {Toolbar} from "primereact/toolbar";
import {BreadCrumb} from "primereact/breadcrumb";
import {Button} from "primereact/button";
import {ScrollPanel} from "primereact/scrollpanel";
import emptyImg from "../../../assets/img/EmptyImg.png";
import {TabPanel, TabView} from "primereact/tabview";


class Cat2Attrs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expandedRows: [],
            selectedRow: null
        };
        this.menu = [
            {label: props.t("baseLayout.editProduct.history"), command: () => console.log(this.state.selectedRow)},
            {label: props.t("baseLayout.editProduct.edit"), command: () => console.log(this.state.selectedRow)},
            {label: props.t("baseLayout.editProduct.comment"), command: () => console.log(this.state.selectedRow)},
            {label: props.t("baseLayout.editProduct.delete"), command: () => console.log(this.state.selectedRow)}
        ];
        this.headerTemplate = this.headerTemplate.bind(this);
    }

    componentDidMount() {
        const id = window.location.pathname.split('/')[2];
        categoryNewService.getItem(id).then(res => {
            this.setState({item: res.pageItems[0]})
        });
    }

    headerTemplate(data) {
        return data.brand;
    }
    footerTemplate(data, index) {
        return (
            <React.Fragment>
            </React.Fragment>
        );
    }

    render() {
        const {t} = this.props;
        const {item} = this.state;

        let  breadcrumbs = [
            { "label": t('categories.breadcrumbs.name')},
            { "label": t('cat2Attrs.breadcrumbs.name')}
        ];


        return (
            <div className={'base-layout'}>
                <div className='main-section'>
                    <div className='header'>
                        <Toolbar>
                            <div className="p-toolbar-group-left">
                                <BreadCrumb model={breadcrumbs} home={{label: 'Главная', icon: 'pi pi-home', url: 'dashboard'}} />
                            </div>
                            <div className="p-toolbar-group-right">
                                <Button label={t('baseLayout.main.buttons.buttonSave')} className={'button-success'}  onClick={(e) => console.log('')}/>
                            </div>
                        </Toolbar>
                    </div>

                    <hr/>

                    <Button  className={'button-bottom-unload'} icon="pi p-empty-button plus-minus-ico" onClick={(e) => console.log('')}/>
                    <Button label={t('baseLayout.main.buttons.buttonAdd')} className={'button-success'}  onClick={(e) => console.log('')}/>
                    <Button label={t('baseLayout.main.buttons.buttonDel')} className={'button-delete-cancel'}  onClick={(e) => console.log('')}/>

                    <div className='grid-card'>
                        <ContextMenu model={this.menu} ref={el => this.cm = el} onHide={() => this.setState({selectedRow: null})}/>
                        <div className="body-for-main-item">
                            <DataTable
                                value={item}
                                rowGroupMode="subheader"
                                sortField="brand"
                                sortOrder={1}
                                groupField="brand"
                                rowGroupHeaderTemplate={this.headerTemplate}
                                rowGroupFooterTemplate={this.footerTemplate}
                                scrollable={true}
                                responsive={true}
                                autoLayout={true}
                                resizableColumns={true}
                                scrollHeight='calc(100vh - 155px)'
                                contextMenuSelection={this.state.selectedRow}
                                onContextMenuSelectionChange={e => this.setState({selectedRow: e.value})}
                                onContextMenu={e => this.cm.show(e.originalEvent)}
                                expandableRowGroups={true}
                                expandedRows={this.state.expandedRows}
                                onRowToggle={(e) => this.setState({expandedRows:e.data})}>
                                <Column key={'data-table-selection-key'} selectionMode="multiple" style={{width:'50px'}} />
                                <Column field="vin" header={t('cat2Attrs.fields.attribute')} />
                                <Column field="year" header={t('cat2Attrs.fields.required')} />
                                <Column field="color" header={t('cat2Attrs.fields.key')} />
                                <Column field="price" header={t('cat2Attrs.fields.weight')} />
                            </DataTable>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(Cat2Attrs);