import { REACT_ELEMENT_TYPE } from "../utils/ReactElementSymbol";
import { ReactComponent } from "./ReactComponent";

type Key = string | number;

export interface ReactElement {
    $$typeof: number | symbol;
    type: string | typeof ReactComponent;
    props: any;
    key?: Key | null;
}

export function createElement(type: string | typeof ReactComponent, config?: Object, children?): ReactElement {
    let props: any = {};

    const childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
        props.children = children;
    } else if (childrenLength > 1) {
        const childArray = Array<string>(childrenLength);
        for (let i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
    }

    if (config) {
        for (let propsName in config) {
            if (config.hasOwnProperty(propsName)) {
                props[propsName] = config[propsName];
            }
        }
    }

    return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        props
    };
}
