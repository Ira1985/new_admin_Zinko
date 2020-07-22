import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import './filterSection.scss';
import {SelectButton} from "primereact/selectbutton";
import {Button} from "primereact/button";
import {Sidebar} from "primereact/sidebar";
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {ScrollPanel} from "primereact/scrollpanel";
import {Checkbox} from "primereact/checkbox";
import {getAFilterOperation} from "../../../../models/base/FilterItem";
import PropTypes from "prop-types";

class FilterSection extends Component {

    constructor(props) {
        super(props);
        this.filterBlockRef = React.createRef();
        this.filterMainRef = React.createRef();
        this.addFilterBar = React.createRef();
        this.filterBaseItems = React.createRef();
        this.filterFild = props.fields;

        this.state = {
            fields:  this.filterFild,
            showHide: true,
            addFilterBar: false,
            loading:true,
            operations: []
        };

        this.onOperationChange = this.onOperationChange.bind(this);
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

    onOperationChange(e) {
        let {operations} = this.state;
        let operation = operations.slice(0);
        operation[e.target.name] = e.value;
        this.setState({operations: operation});
    }

    render() {
        const {t, filteringData} = this.props;
        const {showHide, addFilterBar, loading, operations, fields} = this.state;
        return <>
            <div ref={this.filterBlockRef} className='filter-section'>
                <div className='header'>
                    <span className='buttons'>
                        {showHide && <Button className='open-hide-button p-empty-button mini-filter-block' icon="button-close" onClick={() => this.showHideFilter()} tooltip={t('baseLayout.filterBlock.tooltips.showHideBlock')} tooltipOptions={{position: 'right'}} />}
                        {!showHide && <Button className='open-hide-button p-empty-button maxi-filter-block' icon="button-open" onClick={() => this.showHideFilter()} tooltip={t('baseLayout.filterBlock.tooltips.showHideBlock')} tooltipOptions={{position: 'right'}} />}
                    </span>
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
                                <div className='scroll-panel-button'>
                                    <Button label={t("baseLayout.filterBlock.buttonFilter")} className={"button-bottom-unload"}  onClick={(e) => console.log('aaaaaaa', fields)}/>
                                </div>
                                {fields && fields.map((field, index) => {
                                    let arr = field.operations.map(operation => t(getAFilterOperation(operation)))
                                    return field.required ?
                                        <div>
                                            <div className="p-label">
                                                <span>{t(field.title)}</span>
                                                <Dropdown value={operations[index]} name={index} options={arr} onChange={this.onOperationChange} style={{width: '12em'}}/>
                                            </div>
                                            <InputText id="in" value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
                                        </div>
                                        : null
                                })}
                            </ScrollPanel>
                        </div>
                        <div ref={this.addFilterBar} className='filter-add-bar'>
                            <ScrollPanel className='scroll-panel'>
                                   <div className={'filter-scroll-panel'}>
                                       {fields && fields.map((field, index) => {
                                           return field.required ?
                                               <div className={"p-title-checked"}>
                                                   <Checkbox checked={true} value={index} onChange={(e) => {
                                                       let obj = fields.slice(0);
                                                       obj[e.value].required = false;
                                                       this.setState({fields: obj})
                                                   }
                                                   } />
                                                   <div className={"p-title-text"}>
                                                       <span>{t(field.title)}</span>
                                                   </div>
                                               </div>
                                               : null
                                       })}
                                       {fields.find(field => field.required === true) && fields.find(field => field.required === false) && <hr/>}
                                       {fields && fields.map((field, index) => {
                                           return !field.required ?
                                               <div className={"p-title-unchecked"}>
                                                   <Checkbox checked={false} value={index} onChange={(e) => {
                                                       let obj = fields.slice(0);
                                                       obj[e.value].required = true;
                                                       this.setState({fields: obj})
                                                   }} />
                                                   <div className={"p-title-text"}>
                                                       <span>{t(field.title)}</span>
                                                   </div>
                                               </div>
                                               : null
                                       })}
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
    filteringData: PropTypes.bool, // show then click filter and data loading
    fields: PropTypes.arrayOf(PropTypes.object) // items for build filters
};

/****
 * Fields:
 *  {
 *      title:'',
 *      type:'text|number|select|multiSelect|checkbox',
 *      filterField:'',
 *      defaultVal:'',
 *      required:'',
 *      operations: []
 *  }
 *
 *
 */


export default withTranslation()(FilterSection);
