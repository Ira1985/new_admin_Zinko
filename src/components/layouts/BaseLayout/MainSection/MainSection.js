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
import PropTypes from "prop-types";

class MainSection extends Component {

    constructor(props) {
        super(props);
        let mp = new Map();
        mp.set(1, {name:'test'});
        mp.set(2, {name:'test'});
        mp.set(3, {name:'test'});
        mp.set(4, {name:'test'});
        mp.set(5, {name:'test'});

        this.state = {
            checkedItems: mp,
            showCheckedItemsMenu: false,
            showApprovalWin: false,
            approveButton: {}
        };
    }

    setChecked(items) {
        this.setState({
            checkedItems: items
        });
    }

    clearChecked() {
        this.setState({
            checkedItems: new Map()
        });
    }

    //test
    testShowChecked() {
        this.setState((prev) => ({
            showCheckedItemsMenu: !prev.showCheckedItemsMenu
            }));
    }

    clearChecked() {
        this.setState((prev) => ({
            checkedItems: new Map(),
            showCheckedItemsMenu: !prev.showCheckedItemsMenu
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

    render() {
        const {t, breadcrumbs, toolbarButtons, checkedButtons, plurals, children, gridView, treeView} = this.props;
        const {showCheckedItemsMenu, checkedItems, showApprovalWin, approveButton} = this.state;

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
                                    <Button key={'toolbar_but_' + index} label={t(button.label)} className={button.className}  onClick={(e) => this.testShowChecked()} tooltip={button.tooltip}/>
                                )}
                        </div>
                    </Toolbar>
                </div>

                <hr/>

                <div className='base-data-section'>
                    {children}
                    {/*{gridView && }*/}
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

            </>;
    }

}

MainSection.propTypes = {
    gridView: PropTypes.bool,
    treeView: PropTypes.bool,
    breadcrumbs: PropTypes.object,
    toolbarButtons: PropTypes.arrayOf(PropTypes.object),
    checkedButtons: PropTypes.arrayOf(PropTypes.object),
    plurals: PropTypes.arrayOf(PropTypes.string),

};

export default withTranslation()(MainSection);
