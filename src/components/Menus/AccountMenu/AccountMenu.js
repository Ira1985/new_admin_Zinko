import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import "./accountMenu.scss";
import {Button} from "primereact/button";
import {ScrollPanel} from "primereact/scrollpanel";
import {Menu} from 'primereact/menu';

class AccountMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { t, show, showAccountMenu } = this.props;

        let mainMenu = [
            {label: t("accountMenu.tasks"), icon: 'pi pi-fw pi-plus'},
            {label: t("accountMenu.sendMessage"), icon: 'pi pi-fw pi-trash'},
            {label: t("accountMenu.editProfile"), icon: 'pi pi-fw pi-check', url: "/profile"}
        ];

        let exitMenu = [
            {label: t("accountMenu.exit"), icon: 'pi pi-fw pi-compass'},
        ];

        return (
            <>
                {/*<div className='navigation-tree-menu'>*/}
                <div className={show?'account-menu show':'account-menu'}>
                    <div className='header'>
                    <span className='buttons'>
                        <Button className='open-hide-button p-empty-button mini-filter-block' icon="button-close" onClick={showAccountMenu} tooltip={t('baseLayout.filterBlock.tooltips.showHideBlock')} tooltipOptions={{position: 'right'}} />
                    </span>
                    </div>
                    <hr/>
                    {/*<Sidebar visible={show} position="left" baseZIndex={0} dismissable={false}  showCloseIcon={false} closeOnEscape={false} className='navigation-tree-menu' onHide={onHide}>*/}
                    <ScrollPanel className='scroll-panel'>
                        <Menu model={mainMenu} />
                        <hr/>
                        <Menu model={exitMenu} />
                    </ScrollPanel>
                    {/*</Sidebar>*/}
                </div>
            </>
        )
    }

}

export default withTranslation()(AccountMenu);