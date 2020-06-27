import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import './baseLayout.scss';
import FilterSection from "./FilterSection/FilterSection";
import MainSection from "./MainSection/MainSection";
import PropTypes from "prop-types";

class BaseLayout extends Component {

    constructor(props) {
        super(props);
    }

    filterLoading = false;
    fields= [

    ];

    render() {
        const {t, filterItems, plurals, dopClass, breadcrumbs} = this.props;
        return <>
                <div className={'base-layout ' + (dopClass?dopClass:'')}>
                    <FilterSection filteringData={this.filterLoading} fields={filterItems}></FilterSection>
                    <MainSection breadcrumbs={breadcrumbs} plurals={plurals}></MainSection>
                </div>
            </>;
    }
}

BaseLayout.propTypes = {
    filterItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    plurals: PropTypes.arrayOf(PropTypes.string),
    dopClass: PropTypes.string,
    breadcrumbs: PropTypes.arrayOf(PropTypes.object)
};

export default withTranslation()(BaseLayout);