import React, { Component } from 'react';
import './messages.scss';
import {withTranslation} from "react-i18next";
import FilterSection from "../../layouts/BaseLayout/FilterSection/FilterSection";
import Message from "../../models/message/Message";
import {Toolbar} from "primereact/toolbar";
import {BreadCrumb} from "primereact/breadcrumb";
import {Button} from "primereact/button";
import CheckedToolbarSection from "../../layouts/BaseLayout/CheckedToolbarSection/CheckedToolbarSection";
import DataGridView from "../../layouts/DataGridView/DataGridView";
import {messageService} from "../../service/message.service";
import {history} from "../../App";
import GridColumn from "../../models/base/GridColumn";

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCheckedItemsMenu: false,
            checkedItems: new Map(),
        };

        this.updateChecked = this.updateChecked.bind(this);
        this.clearChecked = this.clearChecked.bind(this);
    }

    filterLoading = false;

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

    clearChecked() {
        this.setState((prev) => ({
            checkedItems: new Map(),
            showCheckedItemsMenu: !prev.showCheckedItemsMenu,
            clearChecked: true
        }));
    }

    clearCheckedDone() {
        this.setState({
            clearChecked: false
        });
    }

    updateChecked(checkedElem) {
        this.setState((prev) => ({
            checkedItems: checkedElem,
            showCheckedItemsMenu: checkedElem.size ? true : false
        }));
    }

    renderActionColumns(rowData, column) {
        const {t} = this.props;
        return <div className={'column-button'}>
            <Button icon="pi pi-check" onClick={() => {
                history.push('/subsGroups/' + rowData.id + '/values');
            }} tooltip={t('subsGroups.fields.showSubs')}/>
            <Button icon="pi p-empty-button times-ico" onClick={() => {
                console.log("delete message");
            }} tooltip={t('subsGroups.fields.showSubs')}/>
        </div>
    }

    buildColumns() {
        let columns = Message.buildColumns();
        columns.push(new GridColumn().build({field: '', header: '', style: {textAlign:'center'}, actionColumn: true,
            order: 50,
            actionWidth: 40,
            default: true,
            /*widthCoef: 1,*/
            bodyStyle: {textAlign: 'center'},
            renderer: (rowData, column) => this.renderActionColumns(rowData, column)}));

        return columns;
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [{ "label": t('messages.breadcrumbs.name')}];

        const {showCheckedItemsMenu, checkedItems, showApprovalWin, approveButton, showEditWin, editedItem, progressSave,
            clearChecked, reloadList} = this.state;
        const {modelFieldInit, sorterInit, pagingInit, disableEdit, filterInit, dopCheckedButtons} = this.props;

        let checkedButs = dopCheckedButtons? Array.prototype.concat(this.checkedButtons, dopCheckedButtons): this.checkedButtons;

        return <>
            <div className={'base-layout'}>
                <FilterSection filteringData={this.filterLoading} fields={Message.buildFilters()}></FilterSection>

                <div className='message-main-section'>
                    <div className='header'>
                        <Toolbar>
                            <div className="p-toolbar-group-left">
                                <BreadCrumb model={breadcrumbs} home={{label: 'Главная', icon: 'pi pi-home', url: '/'}} />
                            </div>
                            <div className="p-toolbar-group-right">

                                    <Button key={'toolbar_but_'} label={t('messages.button')} className={'button-dop'}  onClick={(e) => console.log("send message")} tooltip={t('messages.button')}/>

                            </div>
                        </Toolbar>
                    </div>

                    <hr/>

                    <div className='base-data-section'>
                        <DataGridView minimizeHeight={showCheckedItemsMenu}
                                                   apiService={messageService}
                                                   location={this.props.location}
                                                   columns={this.buildColumns()}
                                                   updateChecked={this.updateChecked}
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
                        ></DataGridView>
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
            </div>
        </>
    }
}

export default withTranslation()(Messages);