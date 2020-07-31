import * as React from "react";

export const globalContext = {
    globalModal: {
        open: false,
        body: () => null,
        footer: () => null,
        toggle: () => null
    }
};
export const GlobalContext = React.createContext(globalContext);
