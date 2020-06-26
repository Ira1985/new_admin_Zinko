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
        const {t, filterItems} = this.props;
        return <>
                <div className='base-layout'>
                    <FilterSection filteringData={this.filterLoading} fields={filterItems}></FilterSection>
                    <MainSection></MainSection>
                </div>
            </>;
    }

}

BaseLayout.propTypes = {
    filterItems: PropTypes.arrayOf(PropTypes.object).isRequired
};


export default withTranslation()(BaseLayout);