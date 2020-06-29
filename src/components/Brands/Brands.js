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
        onClick: () => console.log('dop button'),
        hasApproval: true,
        approval: {
            title: 'baseLayout.main.approvals.unloadCheck.title',
            baseText: 'baseLayout.main.approvals.unloadCheck.msg'
        }
    },
    {
        label: 'baseLayout.main.buttons.buttonDel',
        className:'button-delete',
        onClick: () => console.log('add button'),
        hasApproval: true,
        approval: {
            title: 'baseLayout.main.approvals.removeCheck.title',
            baseText: 'baseLayout.main.approvals.removeCheck.msg'
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
                        checkedButtons={checkedButtons}></BaseLayout>
        );
    }
}

export default withTranslation()(Brands);
