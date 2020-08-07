import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import "./cat2Attr.scss";
import {categoryNewService} from "../../../service/categoryNew.service";
import Cat2Attr from "../../../models/Cat2Attr";
import {cat2AttrsService} from "../../../service/cat2Attr.service";
import {Cat2AttrSchema} from "../../../models/Cat2Attr";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {ContextMenu} from 'primereact/contextmenu';
import {Toolbar} from "primereact/toolbar";
import {BreadCrumb} from "primereact/breadcrumb";
import {Button} from "primereact/button";
import {InputSwitch} from 'primereact/inputswitch';
import EditWin from "../../base/EditWin/EditWin";
import Cat2AttrEditDialog from "./Edit/Cat2AttrEditDialog";
import GroupEditDialog from "./Edit/GroupEditDialog";

class Cat2Attrs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expandedRows: [],
            selectedRow: null,
            loading: true,
            contextMenuItem: [],
            showEditWin: false,
            progressSave: false,
            groups: [],
            showGrWin: false,
        };
        this.headerTemplate = this.headerTemplate.bind(this);
        this.buildContextMenu = this.buildContextMenu.bind(this);
        this.onCloseEdit = this.onCloseEdit.bind(this);

        this.groups = [];
    }

    editComponent = (loading, editItem, updateValue, filter, filterItems, itemTemplate) => {
        return (
            <Cat2AttrEditDialog loading={loading} editedItem={this.state.editedItem} updateValue={updateValue} filter={filter} filterItems={filterItems} itemTemplate={itemTemplate} />
        );
    }

    editGroup = (loading, editItem, updateValue, filter, filterItems, itemTemplate) => {
        return (
            <GroupEditDialog loading={loading} editedItem={this.state.editedItem} updateValue={updateValue} filter={filter} filterItems={filterItems} groups={this.groups} />
        );
    }

    componentDidMount() {
        const id = window.location.pathname.split('/')[2];
        cat2AttrsService.getDescList(id).then(res => {
            this.setState({item: res.pageItems, expandedRows: res.pageItems, loading: false})
        });
    }

    headerTemplate(data) {
        let arr = Array.from(this.groups);
        if(!arr.length || !arr.find(item => item.name === data.groupName))
            arr.push({name: data.groupName});
        this.groups = arr;
        //this.setState({groups: arr})
        return data.groupName;
    }
    footerTemplate(data, index) {
        return (
            <React.Fragment>
            </React.Fragment>
        );
    }

    onCloseEdit() {
        this.setState(prev=>({
            showEditWin: false,
            showGrWin: false,
            editedItem: null
        }))
    }

    saveItem(item) {
        this.setState({
            progressSave: false
        });
        let elem = Object.assign({}, this.state.editedItem);
        Object.keys(item).forEach(it => {
            elem[it] = item[it]
        });
        let arr = Array.from(this.state.item);
        arr.map(it => {
            if(it.id === elem.id) {
                Object.keys(item).forEach(it1 => {
                    it[it1] = item[it1]
                });
            }
            return item;
        });
        arr.sort((a, b) => a.weight > b.weight ? -1 : 1);
        let r = arr.filter(item => item.id === elem.id);
        this.setState(prev => ({
            showEditWin: false,
            showGrWin: false,
            item: arr
        }))
    }

    buildContextMenu(rowData) {
        const {t} = this.props;
        return [
            {
                label: t("cat2Attrs.fields.create"),
                key: t("cat2Attrs.fields.create"),
                command: () => {
                    const {selectedRow} = this.state;

                    this.setState((prev) => ({
                        showGrWin: !prev.showGrWin,
                        editedItem: selectedRow
                    }))
                }
            },
            {
                label: t("cat2Attrs.fields.edit"),
                key: t("cat2Attrs.fields.edit"),
                command: (e) => {
                    const {selectedRow} = this.state;

                    this.setState((prev) => ({
                        showEditWin: !prev.showEditWin,
                        editedItem: selectedRow
                    }))
                }
            },
            {label: <>
                    {t("cat2Attrs.fields.required.name")}
                    <InputSwitch
                        checked={rowData?rowData.required:false}
                        onChange={(e) => {
                            e.originalEvent.stopPropagation();
                            let elem = Object.assign({}, this.state.selectedRow);
                            elem.required = e.value;
                            let arr = Array.from(this.state.item);
                            e.originalEvent.target.parentElement.classList.add("p-inputswitch-checked");
                            arr.map(item => {
                                if(item.id === this.state.selectedRow.id)
                                    item.required = e.value;
                                return item
                            })
                            this.setState({item: arr})
                        }
                        }
                    />
                </>,
                key: t("cat2Attrs.fields.required.name")
            },
            {label: <>
                    {t("cat2Attrs.fields.key.name")}
                    <InputSwitch
                        checked={this.state.value}
                        onChange={(e) =>{
                            this.setState({value: e.value});
                            e.originalEvent.stopPropagation();
                        }}
                    />
                </>,
                key: t("cat2Attrs.fields.key.name"),
                command: (e) => e.originalEvent.stopPropagation()},
            {label: <>
                    {t("cat2Attrs.fields.weight")}
                    <div>
                        <Button
                            icon={"pi pi-plus"}
                            onClick={(e) => {
                                e.stopPropagation();
                                let arr = Array.from(this.state.item);
                                arr.map(item => {
                                    if(item.id === this.state.selectedRow.id)
                                        item.weight++;
                                    return item
                                });
                                arr.sort((a, b) => a.weight > b.weight ? -1 : 1);
                                this.setState({item: arr})
                            }}
                        />
                        <Button
                            icon={"pi pi-minus"}
                            onClick={(e) => {
                                e.stopPropagation();
                                let arr = Array.from(this.state.item);
                                arr.map(item => {
                                    if(item.id === this.state.selectedRow.id)
                                        item.weight--;
                                    return item
                                });
                                arr.sort((a, b) => a.weight > b.weight ? -1 : 1);
                                this.setState({item: arr})
                            }}
                        />
                    </div>
                </>, key: t("cat2Attrs.fields.weight"), command: () => console.log(this.state.selectedRow)}
        ];
    }

    render() {
        const {t} = this.props;
        const {item, loading, selectedRow, contextMenuItem, showEditWin, progressSave, showGrWin} = this.state;

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

                    <Button
                        className={'button-bottom-unload'}
                        icon="pi p-empty-button plus-minus-ico"
                        onClick={(e) => {
                            const {expandedRows} = this.state;
                            if(expandedRows.length !== item.length)
                                this.setState({expandedRows: item})
                            else
                                this.setState({expandedRows: []})
                        }}
                    />
                    <Button label={t('baseLayout.main.buttons.buttonAdd')} className={'button-success'}  onClick={(e) => this.setState((prev) => ({
                        showEditWin: !prev.showEditWin,
                        editedItem: new Cat2Attr()
                    }))}/>
                    <Button label={t('baseLayout.main.buttons.buttonDel')} className={'button-delete-cancel'}  onClick={(e) => console.log('')}/>

                    <div className='grid-card'>
                        <ContextMenu model={contextMenuItem} ref={el => this.cm = el} onHide={() => this.setState({selectedRow: null})}/>
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
                                onContextMenuSelectionChange={e => this.setState({selectedRow: e.value, contextMenuItem: this.buildContextMenu(this.state.selectedRow)})}
                                onContextMenu={e => this.cm.show(e.originalEvent)}
                                expandableRowGroups={true}
                                expandedRows={this.state.expandedRows}
                                onRowToggle={(e) => {
                                    this.setState({expandedRows:e.data})
                                }}>
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
                                    body={(rowData => rowData.key ? t("cat2Attrs.fields.key.yes"):t("cat2Attrs.fields.key.no"))}
                                />
                                <Column field="weight" header={t('cat2Attrs.fields.weight')} />
                            </DataTable>

                        </div>
                    </div>
                </div>
                {(showEditWin || showGrWin) &&
                <EditWin
                    style={{width:'620px'}}
                    show={showEditWin || showGrWin}
                    onClose={this.onCloseEdit}
                    editItem={{}}
                    editComponent={showEditWin ? this.editComponent : this.editGroup}
                    saveItem={(item) => this.saveItem(item)}
                    baseSchema={Cat2AttrSchema}
                    apiService={cat2AttrsService}
                    baseModel={new Cat2Attr()}
                    loadable={true}
                    progressSave={progressSave}
                ></EditWin>}
            </div>
        )
    }
}

export default withTranslation()(Cat2Attrs);