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
            approve: {}
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

    baseOnClick(button) {
        if(button.hasOwnProperty('hasApproval') && button.hasApproval) {
            /*
            approval: {
               title: 'baseLayout.main.approvals.removeCheck.title',
                baseText: 'baseLayout.main.approvals.removeCheck.msg'
            }
             */
            let approve = Object.assign({}, button.approval);
            this.setState({
                approve: approve,
                showApprovalWin: true
            });
        } else
            button.onClick();
    }

    closeApprovalWin() {
        this.setState({
            approve: {},
            showApprovalWin: false
        });
    }


    render() {
        const {t, breadcrumbs, toolbarButtons, checkedButtons} = this.props;
        const {showCheckedItemsMenu, checkedItems, showApprovalWin, approve} = this.state;

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
                    <CheckedToolbarSection items={checkedItems} buttons={checkedButtons} show={showCheckedItemsMenu} baseOnClick={(button) => this.baseOnClick(button)}></CheckedToolbarSection>
                </div>
            </div>

            {/*<Dialog header="Header Text" footer={footer} iconsTemplate={myIcon} visible={this.state.visible} style={{width: '50vw'}} modal={true} onHide={this.onHide}>*/}
            { showApprovalWin &&
                <Dialog header={(approve && approve.hasOwnProperty('title'))?t(approve.title):''}
                        visible={showApprovalWin}
                        modal={true}
                        closeOnEscape={true}
                        onHide={() => this.closeApprovalWin()}
                        closable={true}
                        style={{width: '500px'}}>
                    {/*<hr/>*/}
                    <p>{(approve && approve.hasOwnProperty('baseText'))?t(approve.baseText):''}</p>
                </Dialog>
            }

            </>;
    }

}

MainSection.propTypes = {

};


export default withTranslation()(MainSection);
