import React, { Component } from 'react';
import BaseLayout from "../layouts/BaseLayout/BaseLayout";
import './brands.scss';
import Brand from "../../models/Brand";
import {withTranslation} from "react-i18next";

//const plurals = ['брендов', 'бренд', 'бренда'];
const plurals = ['brands.plurals.first', 'brands.plurals.second', 'brands.plurals.third'];

const filters =  Brand.buildFilters();

const toolbarButtons = [
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
        onClick: () => console.log('add button')
    }
];

const checkedButtons = [
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
];

class Brands extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {t} = this.props;
        let  breadcrumbs = [{ "label": t('brands.breadcrumbs.name')}];

        return (
            <BaseLayout breadcrumbs={breadcrumbs}
                        filterItems={filters}
                        plurals={plurals}
                        dopClass={'brands_main'}
                        toolbarButtons={toolbarButtons}
                        checkedButtons={checkedButtons}>

                {'sdfsdfsdgsdgdsgdsg sdgsd gsdghsdfhsdf hdfshdfsh dfh'}
            </BaseLayout>
        );
    }
}

export default withTranslation()(Brands);
