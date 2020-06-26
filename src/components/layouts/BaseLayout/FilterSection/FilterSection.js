import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import './filterSection.scss';
import {SelectButton} from "primereact/selectbutton";
import {Button} from "primereact/button";
import {Sidebar} from "primereact/sidebar";
import {ScrollPanel} from "primereact/scrollpanel";

class FilterSection extends Component {

    constructor(props) {
        super(props);
        this.filterBlockRef = React.createRef();
        this.filterMainRef = React.createRef();
        this.addFilterBar = React.createRef();
        this.filterBaseItems = React.createRef();

        this.state = {
            showHide: true,
            addFilterBar: false
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

    showAddFilterBar() {

        if(this.addFilterBar.current) {
            if(this.addFilterBar.current.classList.contains('show')) {
                this.addFilterBar.current.classList.remove('show');
                this.filterBaseItems.current.classList.remove('hide');
            } else {
                this.filterBaseItems.current.classList.add('hide');
                this.addFilterBar.current.classList.add('show');
            }
        }

        this.setState((prev) => ({
            addFilterBar: !prev.addFilterBar
        }));
    }

    render() {
        const {t} = this.props;
        const {showHide, addFilterBar} = this.state;
        return <>
            <div ref={this.filterBlockRef} className='filter-section'>
                <div className='header'>
                    {showHide && <Button className='open-hide-button p-empty-button mini-filter-block' icon="button-close" onClick={() => this.showHideFilter()} tooltip={t('baseLayout.filterBlock.tooltips.showHideBlock')} tooltipOptions={{position: 'right'}} />}
                    {!showHide && <Button className='open-hide-button p-empty-button maxi-filter-block' icon="button-open" onClick={() => this.showHideFilter()} tooltip={t('baseLayout.filterBlock.tooltips.showHideBlock')} tooltipOptions={{position: 'right'}} />}
                </div>
                <hr/>
                <div ref={this.filterMainRef} className='filter-main'>
                    <div className='sec-header'>
                        <span className='filter-sec-title'>{t('baseLayout.filterBlock.baseTitle')}</span>
                        <span className='clear'><Button className='filter-sec-button clear p-empty-button' icon="filter-clear-ico" onClick={() => this.showHideFilter()} tooltip={t('baseLayout.filterBlock.tooltips.clearFilter')} tooltipOptions={{position: 'right'}} /></span>
                        <span className='add'><Button className='filter-sec-button add p-empty-button' icon="filter-add-ico" onClick={() => this.showAddFilterBar()} tooltip={t('baseLayout.filterBlock.tooltips.addFilter')} tooltipOptions={{position: 'right'}} /></span>
                    </div>
                    <hr/>
                    <div className='filter-items-main'>
                        <div ref={this.filterBaseItems} className='filter-items'>
                            <ScrollPanel className='scroll-panel'>

                            </ScrollPanel>
                        </div>
                        <div ref={this.addFilterBar} className='filter-add-bar'>
                            <ScrollPanel className='scroll-panel'>
                                   <div>
                                       dsfdsfds
                                       f
                                       dsf
                                       ds
                                       f

                                   </div>
                            </ScrollPanel>
                        </div>
                    </div>
                </div>
            </div>
            </>;
    }

}

FilterSection.propTypes = {

};


export default withTranslation()(FilterSection);
