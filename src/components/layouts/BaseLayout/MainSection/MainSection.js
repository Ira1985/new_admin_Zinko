import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import './mainSection.scss';
import {BreadCrumb} from "primereact/breadcrumb";
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";
import CheckedToolbarSection from "../CheckedToolbarSection/CheckedToolbarSection";
import {Dialog} from "primereact/dialog";
import {pluralize} from "../../../../helpers/utils";
import ApprovalWin from "../../../base/ApprovalWin/ApprovalWin";
import EditWin from "../../../base/EditWin/EditWin";
import PropTypes from "prop-types";
import DataGridView from "../../DataGridView/DataGridView";
import Paging from "../../../../models/base/Paging";
import Sorter from "../../../../models/base/Sorter";

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
            sorter: props.sorterInit? new Sorter().build(props.sorterInit.name, props.sorterInit.directions):new Sorter(),
            paging: props.pagingInit? new Paging().build(props.pagingInit): new Paging()
        };

        this.updateChecked = this.updateChecked.bind(this);
        this.editItem = this.editItem.bind(this);
        this.onCloseEdit = this.onCloseEdit.bind(this);
        this.clearChecked = this.clearChecked.bind(this);
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
            onClick: () => {console.log('add button');},
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
            showCheckedItemsMenu: !prev.showCheckedItemsMenu
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
                new Promise((resolve, reject) => resolve(btn.onClick())).then(
                    res => {
                        console.log('approveApprovalWin - btn.onClick() ', res);
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
                    console.log('approveApprovalWin - button.approval.onApprove() - btn.onClick() ', resA);
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
        this.setState(prev => ({
            showEditWin: !prev.showEditWin
        }))
    }

    onCloseEdit() {
        this.setState(prev=>({
            showEditWin: !prev.showEditWin,
            editedItem: null
        }))
    }

    addItem(init) {
        const {loadOnAddItem, initModelField} = this.props;

        let item = Object.assign( Object.create( Object.getPrototypeOf(this.props.baseModel)), this.props.baseModel, initModelField?initModelField:{}, init?init:{});
        //let item = Object.assign( Object.create( Object.getPrototypeOf(this.props.baseModel)), this.props.baseModel );
        //this.props.baseSchema.isValid(item).then(valid => this.setState({validForms: valid}));
        this.setState(prevState => ({
            editedItem: item,
            showEditWin: !prevState.showEditWin
        }));
        if(loadOnAddItem && (loadOnAddItem instanceof Function))
            loadOnAddItem(item);
    }

    render() {
        const {t, breadcrumbs, dopToolbarButtons, dopCheckedButtons, plurals,
            children, gridView, treeView, apiService, location, columns, editComponent, baseSchema, baseModel} = this.props;
        const {showCheckedItemsMenu, checkedItems, showApprovalWin, approveButton, showEditWin, editedItem} = this.state;

        let toolbarButs = dopToolbarButtons? Array.concat(this.toolbarButtons, dopToolbarButtons): this.toolbarButtons;
        let checkedButs = dopCheckedButtons? Array.concat(this.checkedButtons, dopCheckedButtons): this.checkedButtons;

        return <>
            <div className='main-section'>
                <div className='header'>
                    <Toolbar>
                        <div className="p-toolbar-group-left">
                            <BreadCrumb model={breadcrumbs} home={{label: 'Главная', icon: 'pi pi-home', url: 'dashboard'}} />
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
                    {gridView && <DataGridView minimizeHeight={showCheckedItemsMenu}
                                               apiService={apiService}
                                               location={location}
                                               columns={columns}
                                               updateChecked={this.updateChecked}
                                               editItem={this.editItem}
                                               checkedItems={checkedItems}
                                    ></DataGridView>}
                    {/*{treeView && }*/}
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
                                (checkedItems.size + ' ' + t(pluralize(checkedItems.size, plurals))):'\''+checkedItems.get(1).name)+'\''
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
                    saveItem={() => this.saveItem(editedItem)}
                    baseSchema={baseSchema}
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
    initModelField: PropTypes.object,
    // may be needed after
    //loadOnMountBefore: PropTypes.func,
    //loadOnMount: PropTypes.func,
    //loadOnUpdateValue: PropTypes.func,
    //loadOnAddItem: PropTypes.func,
    //loadOnEditItem: PropTypes.func,
    sorterInit: PropTypes.object,
    pagingInit: PropTypes.object,
    disableEdit: PropTypes.bool
};

export default withTranslation()(MainSection);
