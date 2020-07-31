import i18n from "../../i18n";
import {informer} from "./../../App";

export const informerService = {
    success,
    info,
    warn,
    error,
    multiple,
    clearAll
};

function success(msg) {
    informer.current.show({life: 2000, severity: 'success', summary: i18n.t('services.informer.success'), detail: msg});
}

function info(msg) {
    informer.current.show({life: 2000, severity: 'info', summary: i18n.t('services.informer.info'), detail: msg});
}

function warn(msg) {
    informer.current.show({life: 2000, severity: 'warn', summary: i18n.t('services.informer.warn'), detail: msg});
}

function error(msg) {
    informer.current.show({life: 2000, severity: 'error', summary: i18n.t('services.informer.error'), detail: msg});
}

function multiple(msg) {
    informer.current.show(
        msg
        /*[{severity:'info', summary:'Message 1', detail:'PrimeReact rocks'},
        {severity:'info', summary:'Message 2', detail:'PrimeReact rocks'},
        {severity:'info', summary:'Message 3', detail:'PrimeFaces rocks'}]*/
    );

}

function clearAll() {
    informer.current.clear();
}
