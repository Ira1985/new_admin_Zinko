import {history} from "../App";
import {API} from "../helpers/configAxios";
import {connect as stompConnect, disconnect as stompDisconnect} from "../helpers/stomp-over-ws";
import i18n from "../i18n";
import {toast} from "react-toastify";
import {toastConfig} from "../helpers/toastConfig";

export const accountService = {
    login,
    logout,
    //getParams //TODO: продумать реализацию
};

function login(username, password) {
    return API.post(`/auth`, JSON.stringify({ username, password }))
        .then(res => {
            console.log(res);

            if(res && res.status === 200) {


                if(res.data) {


                    let response = res.data;

                    console.log(response);


                    if (response.token && response.identity) {
                        localStorage.setItem('cs2_user', JSON.stringify(response));

                        //history.push('/');

                        /*stompConnect({
                            userId: response.identity.id,
                            jwt: response.token,
                        });*/

                        return true;
                    } else {
                        if (response.errors && response.errors.length > 0) {
                            if (response.errors[0].code === 401) {
                                toast.error(i18n.t('services.auth.errorLoginPass'), toastConfig);
                            } else toast.error(i18n.t('services.auth.errorAuth'), toastConfig);
                        } else toast.error(i18n.t('services.auth.errorAuth'), toastConfig);
                        return false;
                    }
                } else {
                    console.log(i18n.t('services.base.errors.network'), res);
                    toast.error(i18n.t('services.base.errors.network'), toastConfig);
                }
                return false;
            } else {
                console.log(i18n.t('services.base.errors.network'), res);
                toast.error(i18n.t('services.base.errors.network'), toastConfig);
            }
            return false;
        })
        .catch(error => {
            console.log(error);
            return false;
        });

}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('cs2_user');
    history.push('/login');
}
