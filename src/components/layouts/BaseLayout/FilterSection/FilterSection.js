import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import './filterSection.scss';
import {SelectButton} from "primereact/selectbutton";
import {Button} from "primereact/button";

class FilterSection extends Component {

    constructor(props) {
        super(props);
        this.filterBlockRef = React.createRef();
        this.filterMainRef = React.createRef();
        this.filterButtonCloseRef = React.createRef();

        this.state = {
            showHide: true
        };
    }

    showHideFilter() {
        if(this.filterBlockRef.current) {
            let block = this.filterBlockRef.current;
            let main = this.filterMainRef.current;
            //let button = this.filterButtonCloseRef.current;

            if(block.classList.contains('small')) {
                block.classList.remove('small');
                if(main)
                    main.style.display = 'block';
            } else {
                block.classList.add('small');
                if(main)
                    main.style.display = 'none';
            }
        }
        this.setState((prev) => ({
            showHide: !prev.showHide
        }));
    }

    render() {
        const {t} = this.props;
        const {showHide} = this.state;
        return <>
            <div ref={this.filterBlockRef} className='filter-section'>
                <div className='header'>
                    {showHide && <Button className='open-hide-button p-empty-button mini-filter-block' icon="button-close" onClick={() => this.showHideFilter()} tooltip={t('baseLayout.filterBlock.tooltips.showHideBlock')} tooltipOptions={{position: 'right'}} />}
                    {!showHide && <Button className='open-hide-button p-empty-button maxi-filter-block' icon="button-open" onClick={() => this.showHideFilter()} tooltip={t('baseLayout.filterBlock.tooltips.showHideBlock')} tooltipOptions={{position: 'right'}} />}
                    {/*<a onClick={() => this.showHideFilter()}>
                        <i  ref={this.filterButtonCloseRef} className='button-collapse'></i>
                    </a>*/}
                </div>
                <hr/>
                <div ref={this.filterMainRef} className='filter-main'></div>
            </div>
            </>;
    }

}

FilterSection.propTypes = {

};


export default withTranslation()(FilterSection);