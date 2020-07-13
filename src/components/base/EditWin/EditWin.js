import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {Button} from "primereact/button";
import {pluralize} from "../../../helpers/utils";
import {Dialog} from "primereact/dialog";
import PropTypes from "prop-types";
import './editWin.scss';

class EditWin extends Component {

    constructor(props){
        super(props);

        this.state = {
            editItem: props.editItem || {},
            validForms: false
        };
        this.updateValue = this.updateValue.bind(this);
    }

    componentDidMount() {
        const {editItem} = this.state;
        const {baseSchema} = this.props;

        baseSchema.isValid(editItem).then(valid => this.setState({validForms: valid}));

    }

    updateValue(e) {
        const {baseSchema} = this.props;
        const {editItem} = this.state;
        let name = e.target.id;
        let value = e.target.value;
        let direct = false;
        let val;
        let item = Object.assign({}, editItem);
        item[name] = value;

        baseSchema.isValid(item).then(validForms => {
            this.setState({
                validForms: validForms,
                editItem: item
            })
        })
    }

    render() {
        const {t, show, style, onClose, saveItem, editComponent, className} = this.props;
        const {validForms, editItem} = this.state;

        return (

            <Dialog
                className={'main-edit-win ' + className}
                header={editItem.id?t('baseLayout.main.other.edit'):t('baseLayout.main.other.add')}
                visible={show}
                modal={true}
                closeOnEscape={true}
                onHide={() => onClose()}
                closable={true}
                style={style}
                footer={
                    (<div>
                    <Button disabled={!validForms} label={t('baseLayout.main.buttons.buttonAdd')} className="button-success" onClick={() => saveItem()} />
                    <Button label={t('baseLayout.main.buttons.buttonCancel')} className="button-delete-cancel" onClick={() => onClose()} />
                </div>)}
            >
                {editComponent(editItem, this.updateValue)}
            </Dialog>
        );
    }
}

EditWin.propTypes = {
    show: PropTypes.bool.isRequired,
    style: PropTypes.any,
    onClose: PropTypes.func.isRequired,
};

export default withTranslation()(EditWin);
