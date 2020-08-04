import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import "./cat2Attr.scss";
import {categoryNewService} from "../../../service/categoryNew.service";
import {cat2AttrsService} from "../../../service/cat2Attr.service";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {ContextMenu} from 'primereact/contextmenu';
import {Toolbar} from "primereact/toolbar";
import {BreadCrumb} from "primereact/breadcrumb";
import {Button} from "primereact/button";
import {InputSwitch} from 'primereact/inputswitch';
import {ScrollPanel} from "primereact/scrollpanel";
import emptyImg from "../../../assets/img/EmptyImg.png";
import {TabPanel, TabView} from "primereact/tabview";


class Cat2Attrs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expandedRows: [],
            selectedRow: null,
            loading: true
        };
        this.menu = [
            {label: props.t("cat2Attrs.fields.create"), command: () => console.log(this.state.selectedRow)},
            {label: props.t("cat2Attrs.fields.edit"), command: () => console.log(this.state.selectedRow)},
            {label: <>
                    {props.t("cat2Attrs.fields.required.name")}
                    <InputSwitch
                        checked={this.state.selectedRow?this.state.selectedRow.required:false}
                        onChange={(e) => {
                            e.originalEvent.stopPropagation();
                            let elem = Object.assign({}, this.state.selectedRow);
                            console.log("aaaaaaaaaaaaaaaaa", this.state.selectedRow)
                            elem.required = e.value;
                            this.setState({selectedRow: elem})
                        }
                        }
                    />
                    </>
            },
            {label: <>
                    {props.t("cat2Attrs.fields.key.name")}
                    <InputSwitch checked={this.state.value} onChange={(e) => this.setState({value: e.value})} />
                    </>, command: () => console.log(this.state.selectedRow)},
            {label: props.t("cat2Attrs.fields.weight"), command: () => console.log(this.state.selectedRow)}
        ];
        this.headerTemplate = this.headerTemplate.bind(this);
    }

    componentDidMount() {
        const id = window.location.pathname.split('/')[2];
        cat2AttrsService.getDescList(id).then(res => {
            this.setState({item: res.pageItems, loading: false})
        });
    }

    headerTemplate(data) {
        return data.groupName;
    }
    footerTemplate(data, index) {
        return (
            <React.Fragment>
            </React.Fragment>
        );
    }

    render() {
        const {t} = this.props;
        const {item, loading} = this.state;

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
                                sortField="groupName"
                                sortOrder={1}
                                groupField="groupName"
                                rowGroupHeaderTemplate={this.headerTemplate}
                                rowGroupFooterTemplate={this.footerTemplate}
                                scrollable={true}
                                responsive={true}
                                autoLayout={true}
                                resizableColumns={true}
                                loading={loading}
                                scrollHeight='calc(100vh - 155px)'
                                contextMenuSelection={this.state.selectedRow}
                                onContextMenuSelectionChange={e => this.setState({selectedRow: e.value})}
                                onContextMenu={e => this.cm.show(e.originalEvent)}
                                expandableRowGroups={true}
                                expandedRows={this.state.expandedRows}
                                onRowToggle={(e) => this.setState({expandedRows:e.data})}>
                                <Column key={'data-table-selection-key'} selectionMode="multiple" style={{width:'50px'}} />
                                <Column field="attribute.name" header={t('cat2Attrs.fields.attribute')} />
                                <Column
                                    field="required"
                                    header={t('cat2Attrs.fields.required.name')}
                                    body={(rowData => rowData.required ? t("cat2Attrs.fields.required.yes"):t("cat2Attrs.fields.required.no"))}
                                />
                                <Column
                                    field="key"
                                    header={t('cat2Attrs.fields.key.name')}
                                    body={(rowData => rowData.required ? t("cat2Attrs.fields.key.yes"):t("cat2Attrs.fields.key.no"))}
                                />
                                <Column field="weight" header={t('cat2Attrs.fields.weight')} />
                            </DataTable>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(Cat2Attrs);