import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {Button} from "primereact/button";
import {pluralize} from "../../../helpers/utils";
import {Dialog} from "primereact/dialog";
import PropTypes from "prop-types";

class ApprovalWin extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const {t, button, show, style, header, baseText, onClose, onApprove} = this.props;

        return (
            <Dialog header={header}
                    visible={show}
                    modal={true}
                    closeOnEscape={true}
                    onHide={() => onClose(button.approval, button.type)}
                    closable={true}
                    style={style}
                    footer={ (<div>
                        <Button label={t(button.approval.yes)} className="button-success" onClick={() => onApprove(button, button.type)} />
                        <Button label={t(button.approval.cancel)} className="button-delete-cancel" onClick={() => onClose(button.approval, button.type)} />
                    </div>)}
            >
                <p>{baseText}</p>
            </Dialog>
        );
    }
}

ApprovalWin.propTypes = {
    header: PropTypes.string.isRequired,
    button: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    style: PropTypes.any,
    baseText: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onApprove: PropTypes.func.isRequired
};

export default withTranslation()(ApprovalWin);