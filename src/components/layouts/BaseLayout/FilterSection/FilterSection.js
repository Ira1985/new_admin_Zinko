import React, { Component } from 'react';
import {withTranslation} from "react-i18next";
import './filterSection.scss';
import {SelectButton} from "primereact/selectbutton";
import {Button} from "primereact/button";
import {Sidebar} from "primereact/sidebar";
import {InputText} from 'primereact/inputtext';
import {Calendar} from 'primereact/calendar';
import {InputNumber} from 'primereact/inputnumber';
import {Inplace,InplaceDisplay,InplaceContent} from 'primereact/inplace';
import {InputTextarea} from 'primereact/inputtextarea';
import {MultiSelect} from 'primereact/multiselect';
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
            operations: [],
            textValues: [],
            dateValues: [],
            numValues: [],
            listValues: []
        };

        this.onOperationChange = this.onOperationChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onNumChange = this.onNumChange.bind(this);
        this.onListChange = this.onListChange.bind(this);
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

    onTextChange(e) {
        let {textValues} = this.state;
        let textValue = textValues.slice(0);
        textValue[e.target.name] = e.value;
        this.setState({textValues: textValue});
    }

    onDateChange(e) {
        let {dateValues} = this.state;
        let dateValue = dateValues.slice(0);
        dateValue[e.target.name] = e.value;
        this.setState({dateValues: dateValue});
    }

    onNumChange(e) {
        let {numValues} = this.state;
        let numValue = numValues.slice(0);
        numValue[e.target.name] = e.value;
        this.setState({numValues: numValue});
    }

    onListChange(e) {
        let {listValues} = this.state;
        let listValue = listValues.slice(0);
        listValue[e.target.name] = e.value;
        this.setState({listValues: listValue});
    }

    render() {
        const {t, filteringData} = this.props;
        const {showHide, addFilterBar, loading, operations, textValues, dateValues, numValues, listValues, fields} = this.state;

        const ru = {
            firstDayOfWeek: 1,
            dayNamesMin: [t("baseLayout.main.other.dayNamesMin.sunday"), t("baseLayout.main.other.dayNamesMin.monday"), t("baseLayout.main.other.dayNamesMin.tuesday"), t("baseLayout.main.other.dayNamesMin.wednesday"), t("baseLayout.main.other.dayNamesMin.thursday"), t("baseLayout.main.other.dayNamesMin.friday"), t("baseLayout.main.other.dayNamesMin.saturday")],
            monthNames: [t("baseLayout.main.other.monthNames.january"), t("baseLayout.main.other.monthNames.february"), t("baseLayout.main.other.monthNames.march"), t("baseLayout.main.other.monthNames.april"), t("baseLayout.main.other.monthNames.may"), t("baseLayout.main.other.monthNames.june"), t("baseLayout.main.other.monthNames.july"), t("baseLayout.main.other.monthNames.august"), t("baseLayout.main.other.monthNames.september"), t("baseLayout.main.other.monthNames.october"), t("baseLayout.main.other.monthNames.november"), t("baseLayout.main.other.monthNames.december")],
        };

        const values = [
            {label: 'Values1', value: 'Values1'},
            {label: 'Values2', value: 'Values2'},
            {label: 'Values3', value: 'Values3'},
            {label: 'Values4', value: 'Values4'},
            {label: 'Values5', value: 'Values5'},
            {label: 'Values6', value: 'Values6'},
            {label: 'Values7', value: 'Values7'},
            {label: 'Values8', value: 'Values8'},
            {label: 'Values9', value: 'Values9'}
        ];
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
                            <div className='scroll-panel-button'>
                                <Button label={t("baseLayout.filterBlock.buttonFilter")} className={"button-bottom-unload"}  onClick={(e) => console.log('aaaaaaa', fields)}/>
                            </div>
                            <ScrollPanel className='scroll-panel'>
                                {fields && fields.map((field, index) => {
                                    let arr = field.operations.map(operation => t(getAFilterOperation(operation)))
                                    return field.required ?
                                        <div>
                                            <div className="p-label">
                                                <span>{t(field.title)}</span>
                                                <Dropdown value={operations[index]} name={index} options={arr} onChange={this.onOperationChange} style={{width: '12em'}}/>
                                            </div>
                                            {
                                                field.type === 'TEXT' ?
                                                    <InputText name={index} value={textValues[index]} onChange={this.onTextChange} /> :
                                                    field.type === 'DATE' ?
                                                        <Calendar name={index} value={dateValues[index]} onChange={this.onDateChange} selectionMode={operations[index] === t("baseLayout.filterBlock.operations.between") ? "range" : "single"} locale={ru} dateFormat="dd/mm/yy"  /> :
                                                        field.type === 'NUMBER' ?
                                                            <InputNumber name={index} value={numValues} onChange={this.onNumChange} mode="decimal" minFractionDigits={2} /> :
                                                            field.type === 'IDS' ?
                                                                <Inplace>
                                                                    <InplaceDisplay>
                                                                        <InputText name={index} value={textValues[index]} onChange={this.onTextChange} />
                                                                    </InplaceDisplay>
                                                                    <InplaceContent>
                                                                        <InputTextarea rows={5} cols={30} value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
                                                                        <div>
                                                                            <Button label={t("baseLayout.filterBlock.buttonApply")} className={"button-success"}/>
                                                                        </div>
                                                                    </InplaceContent>
                                                                </Inplace> :
                                                                field.type === 'MULTI' || field.type === 'LIST' || field.type === 'SELECT' ?
                                                                    <MultiSelect name={index} value={listValues[index]} options={values} onChange={this.onListChange} style={{minWidth:'15em'}} /> :
                                                                    null
                                            }
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
