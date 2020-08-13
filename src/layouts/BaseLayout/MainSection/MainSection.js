import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import './mainSection.scss';
import {BreadCrumb} from "primereact/breadcrumb";
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";
import CheckedToolbarSection from "../CheckedToolbarSection/CheckedToolbarSection";
import {pluralize} from "../../../helpers/utils";
import ApprovalWin from "../../../components/base/ApprovalWin/ApprovalWin";
import EditWin from "../../../components/base/EditWin/EditWin";
import PropTypes from "prop-types";
import Loadable from 'react-loadable';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// DataGridView
const DataGridView = Loadable({
    loader: () => import('../../DataGridView/DataGridView'),
    loading
});

// DataGridView
const DataTreeView = Loadable({
    loader: () => import('../../DataTreeView/DataTreeView'),
    loading
});

class MainSection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editedItem: null,
            checkedItems: new Map(),
            showCheckedItemsMenu: false,
            showApprovalWin: false,
            showEditWin: false,
            approveButton: {},
            progressSave: false,
            progressCheckedToolBtn: new Map(),
            progressDelete: false,
            clearChecked: false,
            reloadList: false
        };

        this.updateChecked = this.updateChecked.bind(this);
        this.editItem = this.editItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onCloseEdit = this.onCloseEdit.bind(this);
        this.clearChecked = this.clearChecked.bind(this);
        this.deleteCheckedItems = this.deleteCheckedItems.bind(this);
        this.onClickCheckedToolbar = this.onClickCheckedToolbar.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    toolbarButtons = [
        {
            label: 'baseLayout.main.buttons.buttonButch',
            className:'button-dop',
            onClick: () => console.log('dop button'),
            isDropDown: true,
            menu: []
        },
        {
            label: 'baseLayout.main.buttons.buttonAdd',
            className:'button-success',
            onClick: (e, thisEl) => {
                this.addItem();
            }
        }
    ];
    checkedButtons = [
        {
            label: 'baseLayout.main.buttons.buttonUnload',
            className:'button-bottom-unload',
            onClick: () => {console.log('unload button');},
            hasApproval: true,
            type: 'checked',
            approval: {
                showCount: true,
                title: 'baseLayout.main.approvals.unloadCheck.title',
                baseText: 'baseLayout.main.approvals.unloadCheck.msg',
                yes: "baseLayout.main.approvals.unloadCheck.yes",
                cancel: "baseLayout.main.approvals.unloadCheck.cancel",
                onCancel: () => console.log('unload onCancel'),
                onApprove: () => {console.log('unload onApprove');}
            }
        },
        {
            label: 'baseLayout.main.buttons.buttonDel',
            className:'button-delete-cancel',
            onClick: (btn) => this.deleteCheckedItems(btn),
            hasApproval: true,
            type: 'checked',
            approval: {
                showCount: true,
                title: 'baseLayout.main.approvals.removeCheck.title',
                baseText: 'baseLayout.main.approvals.removeCheck.msg',
                yes: "baseLayout.main.approvals.removeCheck.yes",
                cancel: "baseLayout.main.approvals.removeCheck.cancel",
                onCancel: () => console.log('buttonDel onCancel'),
                onApprove: () => {console.log('buttonDel onApprove');}
            }
        }
    ]

    componentDidMount() {
        const {location, loadOnMountBefore, loadOnMount} = this.props;
        let id;
        let name;
        let params = location.search.substring(1);
        if(params) {
            let vars = params.split("&");
            vars.map((elem, index) => {
                if(elem.includes('id')) {
                    id = +elem.slice(3);
                } else if(elem.includes('name')) {
                    name = decodeURI(elem.slice(5));
                }
            });
        }

        if(loadOnMountBefore && loadOnMountBefore instanceof Function) {
            loadOnMountBefore()
                .then(
                    response => {
                        if(response) {
                            this.checkForParams(id, name);
                            if(loadOnMount && loadOnMount instanceof Function) {
                                loadOnMount();
                            }
                        }
                    }
                );
        } else {
            this.checkForParams(id, name);
            if(loadOnMount && loadOnMount instanceof Function) {
                loadOnMount();
            }
        }
    }

    checkForParams(id, name) {
        if(id == 0) {
            this.addItem(name?{name: name}:null);
        } else if(id > 0)
            this.editItem({id: id});
    }

    editItem(item) {
        this.setState((prev) => ({
            editedItem: item,
            showEditWin: !prev.showEditWin
        }))
    }

    clearChecked() {
        this.setState((prev) => ({
            checkedItems: new Map(),
            showCheckedItemsMenu: !prev.showCheckedItemsMenu,
            clearChecked: true
        }));
    }

    updateChecked(checkedElem) {
        this.setState((prev) => ({
            checkedItems: checkedElem,
            showCheckedItemsMenu: checkedElem.size ? true : false
        }));
    }

    onClickCheckedToolbar(button) {
        if(button.hasOwnProperty('hasApproval')
            && button.hasApproval && button.approval) {
            let approveButton = Object.assign({}, button);
            this.setState({
                approveButton: approveButton,
                showApprovalWin: true
            });
        } else
            this.approveApprovalWin(button);
    }

    closeApprovalWin(approve) {
        if(approve.hasOwnProperty('onCancel')
            && approve.onCancel instanceof Function)
            approve.onCancel();
        this.setState({
            approveButton: {},
            showApprovalWin: false
        });
    }

    approveApprovalWin(button, checkOrFilter) {
        let that = this;

        const buttonClick = (btn) => {
            if(btn.onClick && btn.onClick instanceof Function) {
                new Promise((resolve, reject) => resolve(btn.onClick(button))).then(
                    res => {
                        that.setState({
                            approveButton: {},
                            showApprovalWin: false
                        });

                    },
                    error => {
                        console.log('error', error);
                    }
                );
            } else
                that.setState({
                    approveButton: {},
                    showApprovalWin: false
                });
        };

        if(button.approval.hasOwnProperty('onApprove')
            && button.approval.onApprove instanceof Function) {
            new Promise((resolve, reject) => {resolve(button.approval.onApprove())}).then(
                resA => {
                    buttonClick(button);
                },
                errorA => {
                    console.log('errorA', errorA);
                }
            );
        } else
            buttonClick(button);
    }

    saveItem(item) {
        const {apiService} = this.props;
        this.setState({
            progressSave: true
        });
        apiService.saveItem(item)
            .then(
                response => {
                    this.setState(prevState => ({
                        editItem: this.props.baseModel,
                        showEditWin: !prevState.showEditWin,
                        progressSave: false,
                        reloadList: true
                    }));
                    //this.getList(filters,sorter,paging, true);
                },
                error => {
                    this.setState({
                        progressSave: false
                    });
                }
            );
        /*this.setState(prev => ({
            showEditWin: !prev.showEditWin
        }))*/
    }

    onCloseEdit() {
        this.setState(prev=>({
            showEditWin: !prev.showEditWin,
            editedItem: null
        }))
    }

    addItem(init) {
        const {loadOnAddItem, modelFieldInit} = this.props;

        let item = Object.assign( Object.create( Object.getPrototypeOf(this.props.baseModel)), this.props.baseModel, modelFieldInit?modelFieldInit:{}, init?init:{});
        //let item = Object.assign( Object.create( Object.getPrototypeOf(this.props.baseModel)), this.props.baseModel );
        //this.props.baseSchema.isValid(item).then(valid => this.setState({validForms: valid}));
        this.setState(prevState => ({
            editedItem: item,
            showEditWin: !prevState.showEditWin
        }));
        if(loadOnAddItem && (loadOnAddItem instanceof Function))
            loadOnAddItem(item);
    }

    clearCheckedDone() {
        this.setState({
            clearChecked: false
        });
    }

    reloadListDone() {
        this.setState({
            reloadList: false
        });
    }

    deleteCheckedItems() {
        const {apiService} = this.props;
        const {checkedItems, progressCheckedToolBtn} = this.state;

        //console.log('deleteCheckedItems', checkedItems);
        if (checkedItems && checkedItems.size > 0) {
            //btn.inProgress = true;
            //progressCheckedToolBtn
            this.setState({
                progressDelete: true
            });
            //let ids = Array.from(checkedItems).join(",");
            apiService.removeByList(Array.from(checkedItems.keys()))
                .then(
                    response => {
                            //btn.inProgress = false;
                            if(response) {
                                this.setState({
                                    checkedItems: new Map(),
                                    clearChecked: true,
                                    progressDelete: false,
                                    reloadList: true
                                });
                                 //this.getList(filters, sorter, paging, true);
                            } else
                                this.setState(prevState => ({
                                    progressDelete: false}));
                        },
                    error => {
                        this.setState(prevState => ({
                            progressDelete: false
                        }));
                    }
                );
        }
    }

    deleteItem(item) {
        const {apiService} = this.props;
        if(item && item.id) {
            const approveDelete = () => {
                apiService.remove(item.id)
                    .then(
                        response => {
                            //btn.inProgress = false;
                            if (response) {
                                this.setState({
                                    checkedItems: new Map(),
                                    clearChecked: true,
                                    progressDelete: false,
                                    reloadList: true
                                });
                                //this.getList(filters, sorter, paging, true);
                            } else
                                this.setState(prevState => ({
                                    progressDelete: false
                                }));
                        },
                        error => {
                            this.setState(prevState => ({
                                progressDelete: false
                            }));
                        }
                    );
            };

            const button = {
                label: 'baseLayout.main.buttons.buttonDel',
                className:'button-delete-cancel',
                onClick: this.deleteCheckedItems,
                hasApproval: true,
                type: 'checked',
                approval: {
                showCount: true,
                    title: 'baseLayout.main.approvals.removeCheck.title',
                    baseText: 'baseLayout.main.approvals.removeCheck.msg',
                    yes: "baseLayout.main.approvals.removeCheck.yes",
                    cancel: "baseLayout.main.approvals.removeCheck.cancel"
                    /*onCancel: () => console.log('buttonDel onCancel'),
                    onApprove: () => {console.log('buttonDel onApprove');}*/
                }
            };
            //this.approveApprovalWin(button);
            this.onClickCheckedToolbar(button);
        }
    }

    render() {
        const {t, breadcrumbs, dopToolbarButtons, dopCheckedButtons, plurals,
            children, gridView, treeView, apiService, location, columns, editComponent, baseSchema, baseModel, disableEdit,
            filterInit,sorterInit, pagingInit, contexMenuProps} = this.props;
        const {showCheckedItemsMenu, checkedItems, showApprovalWin, approveButton, showEditWin, editedItem, progressSave,
            clearChecked, reloadList} = this.state;

        let toolbarButs = dopToolbarButtons? Array.concat(this.toolbarButtons, dopToolbarButtons): this.toolbarButtons;
        let checkedButs = dopCheckedButtons? Array.concat(this.checkedButtons, dopCheckedButtons): this.checkedButtons;

        return <>
            <div className='main-section'>
                <div className='header'>
                    <Toolbar>
                        <div className="p-toolbar-group-left">
                            <BreadCrumb model={breadcrumbs} home={{label: 'Главная', icon: 'pi pi-home', url: '/'}} />
                        </div>
                        <div className="p-toolbar-group-right">
                            {(toolbarButs && toolbarButs.length > 0) &&
                                toolbarButs.map((button, index) =>
                                    <Button key={'toolbar_but_' + index} label={t(button.label)} className={button.className}  onClick={(e) => button.onClick(e, this)} tooltip={button.tooltip}/>
                                )}

                        </div>
                    </Toolbar>
                </div>

                <hr/>

                <div className='base-data-section'>
                    {/*{children}*/}
                    {/*gridView(showCheckedItemsMenu, this.updateChecked,
                        this.editItem, this.addItem, this.deleteItem, checkedItems,
                        this.clearCheckedDone, this.reloadListDone, clearChecked, reloadList, contexMenuProps)*/}
                    {gridView && <DataGridView minimizeHeight={showCheckedItemsMenu}
                                               apiService={apiService}
                                               location={location}
                                               columns={columns}
                                               updateChecked={this.updateChecked}
                                               editItem={this.editItem}
                                               addItem={this.addItem}
                                               deleteItems={this.deleteItem}
                                               checkedItems={checkedItems}
                                               clearCheckedDone={() => this.clearCheckedDone()}
                                               reloadListDone={() => this.reloadListDone()}
                                               clearChecked={clearChecked}
                                               reloadList={reloadList}
                                               filterInit={filterInit}
                                               sorterInit={sorterInit}
                                               pagingInit={pagingInit}
                                               disableEdit={disableEdit}
                                               contexMenuProps={contexMenuProps}
                                    ></DataGridView>}
                    {treeView && <DataTreeView minimizeHeight={showCheckedItemsMenu}
                                               apiService={apiService}
                                               location={location}
                                               columns={columns}
                                               updateChecked={this.updateChecked}
                                               editItem={this.editItem}
                                               addItem={this.addItem}
                                               deleteItems={this.deleteItem}
                                               checkedItems={checkedItems}
                                               clearCheckedDone={() => this.clearCheckedDone()}
                                               reloadListDone={() => this.reloadListDone()}
                                               clearChecked={clearChecked}
                                               reloadList={reloadList}
                                               filterInit={filterInit}
                                               sorterInit={sorterInit}
                                               pagingInit={pagingInit}
                                               disableEdit={disableEdit}
                                               contexMenuProps={contexMenuProps}
                    ></DataTreeView>}
                </div>

                <div className={showCheckedItemsMenu? 'checked-toolbar-section show': 'checked-toolbar-section'}>
                    <CheckedToolbarSection items={checkedItems}
                                           buttons={checkedButs}
                                           show={showCheckedItemsMenu}
                                           baseOnClick={(button) => this.onClickCheckedToolbar(button)}
                                           clearChecked={this.clearChecked}>
                    </CheckedToolbarSection>
                </div>
            </div>

            { showApprovalWin &&
                <ApprovalWin
                    style={{width: '500px'}}
                    baseText={(approveButton.approval && approveButton.approval.hasOwnProperty('baseText')) ?
                            (t(approveButton.approval.baseText) + '  ' + (approveButton.approval.showCount?(checkedItems.size > 1 ?
                                (checkedItems.size + ' ' + t(pluralize(checkedItems.size, plurals))):'\''+checkedItems.get(checkedItems.keys().next().value).name)+'\''
                                : ''))
                        :''}
                    header={(approveButton && approveButton.approval && approveButton.approval.hasOwnProperty('title'))?t(approveButton.approval.title):''}
                    button={approveButton}
                    show={showApprovalWin}
                    onClose={() => this.closeApprovalWin(approveButton.approval, approveButton.type)}
                    onApprove={() => this.approveApprovalWin(approveButton, approveButton.type)}
                ></ApprovalWin>}

            {showEditWin &&
                <EditWin
                    style={{width:'620px'}}
                    show={showEditWin}
                    onClose={() => this.onCloseEdit()}
                    editItem={editedItem}
                    editComponent={editComponent}
                    saveItem={(item) => this.saveItem(item)}
                    baseSchema={baseSchema}
                    apiService={apiService}
                    baseModel={baseModel}
                    loadable={true}
                    progressSave={progressSave}
                ></EditWin>}
            </>;
    }
}

MainSection.propTypes = {
    gridView: PropTypes.bool,
    treeView: PropTypes.bool,
    breadcrumbs: PropTypes.arrayOf(PropTypes.object),
    dopToolbarButtons: PropTypes.arrayOf(PropTypes.object),
    dopCheckedButtons: PropTypes.arrayOf(PropTypes.object),
    hideCreateButton: PropTypes.bool,
    hideButchButton: PropTypes.bool,
    hideToolbarDeleteButton: PropTypes.bool,
    hideToolbarUnloadButton: PropTypes.bool,
    plurals: PropTypes.arrayOf(PropTypes.string).isRequired,
    apiService: PropTypes.any.isRequired,
    baseModel: PropTypes.object.isRequired,
    baseSchema: PropTypes.object.isRequired,
    location: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    modelFieldInit: PropTypes.object,
    filterInit: PropTypes.object,
    loadOnMount: PropTypes.func,
    // may be needed after
    //loadOnMountBefore: PropTypes.func,
    //loadOnMount: PropTypes.func,
    //loadOnUpdateValue: PropTypes.func,
    //loadOnAddItem: PropTypes.func,
    //loadOnEditItem: PropTypes.func,
    sorterInit: PropTypes.object,
    pagingInit: PropTypes.object,
    disableEdit: PropTypes.bool,
    contexMenuProps: PropTypes.object
};

export default withTranslation()(MainSection);
