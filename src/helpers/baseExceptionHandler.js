import {toast} from "react-toastify";
import {pluralize, pluralizeServices} from "./utils";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import React from "react";

export function baseExceptionHandler(response, plurals, emptyLink, context) {

    if(response.errors && response.errors.length > 0) {
        let errorObj = response.errors[0];
        let msg = errorObj.error;
        switch(errorObj.code) {
            case 1000: {
                toast.error(msg?msg: pluralizeServices(1, plurals) + " не найден(а)", {onClose:()=>{toast.dismiss()}});
                break;
            }
            case 1001: {
                //let win = window.open(onEmptyLink + '&name='+textValue, '_blank');
                if(context) {
                    let newContext = {
                        open: true,
                        body: () => {return (<React.Fragment>
                                            {pluralizeServices(1, plurals) + ' с таким названием существует'}
                                        </React.Fragment>)},
                        footer: () => {return (<React.Fragment>
                                            <Button color="success" onClick={() => {window.open(emptyLink + '?id='+ errorObj.params, '_blank');}}>{'Перейти к дублю'}</Button>{'  '}
                                            <Button color="danger" onClick={() => context.toggle({open:false})}>{'Закрыть'}</Button>
                                        </React.Fragment>)}
                    };
                    context.toggle(newContext);
                }
                break;
            }
            case 1002: {
                toast.error(msg?msg:"Ошибка в переданых параметрах", {onClose:()=>{toast.dismiss()}});
                break;
            }
        }
    }
    //else
    //    toast.error(response.error, {onClose:()=>{toast.dismiss()}});
}
