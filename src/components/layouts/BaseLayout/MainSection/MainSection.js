import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import './mainSection.scss';

class MainSection extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {t} = this.props;
        return <>
            <div className='main-section'>
                <div className='header'></div>
                <hr/>
            </div>
            </>;
    }

}

MainSection.propTypes = {

};


export default withTranslation()(MainSection);