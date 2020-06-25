import {Component} from "react";
import {withTranslation} from "react-i18next";

class BaseGridLayout extends Component {

    render() {
        const {t} = this.props;
        return (
            <div>

            </div>
        );
    }

}

BaseGridLayout.propTypes = {
    activeTreeMenu: PropTypes.bool.isRequired,
    baseMenuFunc: PropTypes.func.isRequired
};


export default withTranslation()(BaseGridLayout);