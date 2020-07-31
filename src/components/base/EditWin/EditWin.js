import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {Button} from "primereact/button";
import {pluralize} from "../../../helpers/utils";
import {Dialog} from "primereact/dialog";
import PropTypes from "prop-types";
import './editWin.scss';
import LoadingButton from "../LoadingButton/LoadingButton";

class EditWin extends Component {

    constructor(props){
        super(props);
        this.state = {
            item: props.editItem,
            filterItems: null,
            validForms: false,
            loading: true,
            newName: ""
        };
        this.updateValue = this.updateValue.bind(this);
        this.filterItems = this.filterItems.bind(this);
        this.itemTemplate = this.itemTemplate.bind(this);
    }

    componentDidMount() {
        const {item} = this.state;
        const {baseSchema, editItem, apiService, onClose} = this.props;

        if(editItem && editItem.id > 0) {
            apiService.getItem(editItem.id)
                .then(
                    response => {
                        if(response) {
                            let elem = Object.assign( Object.create( Object.getPrototypeOf(this.props.baseModel)), this.props.baseModel).build(response.pageItems[0]);
                            baseSchema.isValid(elem).then(valid => this.setState({validForms: valid}));
                            this.setState(prevState => ({
                                item: elem,
                                loading: false
                            }));
                            /*if(loadOnEditItem && loadOnEditItem instanceof Function)
                                loadOnEditItem(elem);*/
                        }else {
                            this.setState(prevState => ({
                                loading: false
                            }));
                            onClose();
                        }
                    },/**/
                    error => {
                        this.setState(prevState => ({
                            loadingItem: false
                        }));
                        onClose();
                    }
                );
        }
        else {
            this.setState({
                loading: false,
                item: editItem
            });
        }
    }

    updateValue(e) {
        const {baseSchema} = this.props;
        const {item} = this.state;
        let name = e.target.name;
        //let value = e.target.value.nameForRemember?e.target.value.nameForRemember:e.target.checked?e.target.checked:e.target.value;
        let value = e.target.checked?e.target.checked:e.target.value?e.target.value.nameForRemember?e.target.value.nameForRemember:e.target.value:false;
        let direct = false;
        let val;
        let elem = Object.assign({}, item);
        elem[name] = value;
        console.log(elem)
        baseSchema.isValid(elem).then(validForms => {
            this.setState({
                validForms: validForms,
                item: elem
            })
        })
    }

    filterItems(event, data, render) {
        if(data) {
            data.getCombo(event.query).then(res => {
                data = res.pageItems;
                let results;

                if (event.query.length === 0) {
                    results = [...data];
                }
                else {
                    results = data.filter((item) => {
                        return item.name.toLowerCase().startsWith(event.query.toLowerCase());
                    });
                }
                if(!results.length)
                    this.itemTemplate({name: ''})
                this.setState({ filterItems: results, newName: event.query });
            })
        } else
            this.setState({ filterItems: render() });
    }

    itemTemplate(item) {
        const {t} = this.props;
        const {newName} = this.state;
        let elem = null;
        if(item.name === "Empty object") {
            elem = <Button label={t("baseLayout.main.buttons.buttonAddNew")} className={'button-dop'} onClick={() => this.onEmpty(item)}/>
            item.name = newName
        } else
            elem = (<div className="p-clearfix">
                        <div >{item.name}</div>
                    </div>)
        return elem;
    }

    onEmpty(item){
        const {onEmptyLink,value} = this.props;
        const {newName} = this.state;
        let textValue = newName?newName:'';
        if(item.emptyLink) {
            let win = window.open(item.emptyLink + '&name='+textValue, '_blank');
            win.focus();
        }

    }

    saveItem() {
        const {saveItem} = this.props;
        const {item} = this.state;
        saveItem(item);
    }

    render() {
        const {t, show, style, onClose, editComponent, className, progressSave, saveItem} = this.props;
        const {validForms, item, loading, filterItems} = this.state;
        return (
            <Dialog
                className={'main-edit-win ' + className}
                header={item.id?t('baseLayout.main.other.edit'):t('baseLayout.main.other.add')}
                visible={show}
                modal={true}
                closeOnEscape={true}
                onHide={() => onClose()}
                closable={true}
                style={style}
                footer={
                    (<div>
                    {/*<Button disabled={!validForms} label={t('baseLayout.main.buttons.buttonAdd')} className="button-success" onClick={() => saveItem()} />*/}
                    <LoadingButton
                        loading={progressSave}
                        onClick={() => this.saveItem()}
                        disabled={!validForms || loading || progressSave}
                        /*disabled={!validForms}*/
                        label={'baseLayout.main.buttons.buttonAdd'}
                        /*color: PropTypes.string,
                        style: PropTypes.object.isRequired,*/
                        className={"button-success"}
                    />

                    <Button label={t('baseLayout.main.buttons.buttonCancel')} className="button-delete-cancel" onClick={() => onClose()} />
                </div>)}
            >
                {editComponent(loading, item, this.updateValue, this.filterItems, filterItems, this.itemTemplate)}
            </Dialog>
        );
    }
}


EditWin.propTypes = {
    show: PropTypes.bool.isRequired,
    style: PropTypes.any,
    onClose: PropTypes.func.isRequired,
    editItem: PropTypes.object.isRequired,
    editComponent: PropTypes.any.isRequired,
    saveItem:PropTypes.func.isRequired,
    apiService: PropTypes.any.isRequired,
    baseModel: PropTypes.object.isRequired,
    baseSchema: PropTypes.object.isRequired,
    loadable: PropTypes.bool.isRequired,
    progressSave: PropTypes.bool
};

export default withTranslation()(EditWin);
