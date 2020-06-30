import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import './mainSection.scss';
import {BreadCrumb} from "primereact/breadcrumb";
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";
import CheckedToolbarSection from "../CheckedToolbarSection/CheckedToolbarSection";
import {Dialog} from "primereact/dialog";

class MainSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedItems: new Map(),
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

    testShowChecked() {
        this.setState((prev) => ({
            showCheckedItemsMenu: !prev.showCheckedItemsMenu
            }));
    }

    onClickChecked(button) {
        if(button.hasOwnProperty('hasApproval') && button.hasApproval && button.approval) {

            let approveButton = Object.assign({}, button);

            console.log(button);

            this.setState({
                approveButton: approveButton,
                showApprovalWin: true
            });
        } else
            button.onClick();
    }

    closeApprovalWin(approve) {
        if(approve.hasOwnProperty('onCancel'))
            approve.onCancel();
        this.setState({
            approveButton: {},
            showApprovalWin: false
        });
    }

    approveApprovalWin(approveButton) {

        if(approveButton.approval.hasOwnProperty('onApprove'))
            approveButton.approval.onApprove();


        this.setState({
            approveButton: {},
            showApprovalWin: false
        });
    }


    render() {
        const {t, breadcrumbs, toolbarButtons, checkedButtons} = this.props;
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

                <div className='base-data-section'> {`test{&ryry}`}</div>

                <div className={showCheckedItemsMenu? 'checked-toolbar-section show': 'checked-toolbar-section'}>
                    <CheckedToolbarSection items={checkedItems} buttons={checkedButtons} show={showCheckedItemsMenu} baseOnClick={(button) => this.onClickChecked(button)}></CheckedToolbarSection>
                </div>
            </div>

            {/*<Dialog header="Header Text" footer={footer} iconsTemplate={myIcon} visible={this.state.visible} style={{width: '50vw'}} modal={true} onHide={this.onHide}>*/}
            { showApprovalWin &&
                <Dialog header={(approveButton && approveButton.approval && approveButton.approval.hasOwnProperty('title'))?t(approveButton.approval.title):''}
                        visible={showApprovalWin}
                        modal={true}
                        closeOnEscape={true}
                        onHide={() => this.closeApprovalWin(approveButton.approval)}
                        closable={true}
                        style={{width: '500px'}}
                        footer={ (<div>
                            <Button label={t(approveButton.approval.yes)} className="button-success" onClick={() => {}} />
                            <Button label={t(approveButton.approval.cancel)} className="button-delete-cancel" onClick={() => this.closeApprovalWin(approveButton.approval)} />
                        </div>)}
                >

                    {/*<hr/>*/}
                    <p>{(approveButton.approval && approveButton.approval.hasOwnProperty('baseText'))?t(approveButton.approval.baseText):''}</p>
                </Dialog>
            }

            </>;
    }

}

MainSection.propTypes = {

};


export default withTranslation()(MainSection);
