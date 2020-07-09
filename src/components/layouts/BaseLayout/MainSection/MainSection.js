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

class MainSection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editedItem: null,
            checkedItems: new Map(),
            showCheckedItemsMenu: false,
            showApprovalWin: false,
            showEditWin: false,
            approveButton: {}
        };

        this.updateChecked = this.updateChecked.bind(this)
        this.getEditItem = this.getEditItem.bind(this)
        this.onCloseEdit = this.onCloseEdit.bind(this)
    }

    setChecked(items) {
        this.setState({
            checkedItems: items
        });
    }

    getEditItem(item) {
        this.setState((prev) => ({
            editedItem: item,
            showEditWin: !prev.showEditWin
        }))
    }

    clearChecked() {
        this.setState({
            checkedItems: new Map()
        });
    }

    //test
    testShowChecked() {
        this.setState((prev) => ({
            //showCheckedItemsMenu: !prev.showCheckedItemsMenu
            }));
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
        console.log(item)
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

    render() {
        const {t, breadcrumbs, toolbarButtons, checkedButtons, plurals,
            children, gridView, treeView, apiService, location, columns, editComponent, baseSchema, baseModel} = this.props;
        const {showCheckedItemsMenu, checkedItems, showApprovalWin, approveButton, showEditWin, editedItem} = this.state;

        return <>
            <div className='main-section'>
                <div className='header'>
                    <Toolbar>
                        <div className="p-toolbar-group-left">
                            <BreadCrumb model={breadcrumbs} home={{label: 'Главная', icon: 'pi pi-home', url: 'dashboard'}} />
                        </div>
                        <div className="p-toolbar-group-right">
                            {(toolbarButtons && toolbarButtons.length > 0) &&
                                toolbarButtons.map((button, index) =>
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
                                               getEditItem={this.getEditItem}
                                               checkedItems={checkedItems}
                                    ></DataGridView>}
                    {/*{treeView && }*/}
                </div>

                <div className={showCheckedItemsMenu? 'checked-toolbar-section show': 'checked-toolbar-section'}>
                    <CheckedToolbarSection items={checkedItems}
                                           buttons={checkedButtons}
                                           show={showCheckedItemsMenu}
                                           baseOnClick={(button) => this.onClickCheckedToolbar(button)}
                                           clearChecked={() => this.clearChecked()}>
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
                ></ApprovalWin>
            }

            {
                showEditWin &&
                <EditWin
                    style={{width: '500px'}}
                    show={showEditWin}
                    onClose={() => this.onCloseEdit()}
                    editItem={editedItem}
                    editComponent={editComponent}
                    saveItem={() => this.saveItem(editedItem)}
                    baseSchema={baseSchema}
                ></EditWin>
            }

            </>;
    }

}

MainSection.propTypes = {
    gridView: PropTypes.bool,
    treeView: PropTypes.bool,
    breadcrumbs: PropTypes.arrayOf(PropTypes.object),
    toolbarButtons: PropTypes.arrayOf(PropTypes.object),
    checkedButtons: PropTypes.arrayOf(PropTypes.object),
    plurals: PropTypes.arrayOf(PropTypes.string),
    apiService: PropTypes.any,
    location: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.object)
};

export default withTranslation()(MainSection);
