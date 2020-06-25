import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import './baseLayout.scss';
import FilterSection from "./FilterSection/FilterSection";
import MainSection from "./MainSection/MainSection";

class BaseLayout extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {t} = this.props;
        return <>
                <div className='base-layout'>
                    <FilterSection></FilterSection>
                    <MainSection></MainSection>
                </div>
            </>;
    }

}

BaseLayout.propTypes = {

};


export default withTranslation()(BaseLayout);