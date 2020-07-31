import {toast} from "react-toastify";

export const toastConfig = {
    onClose: () => {
        toast.dismiss()
    }
};