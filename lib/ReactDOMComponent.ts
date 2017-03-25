import { ReactElement } from "./ReactElement";

// For quickly matching children type, to test if can be treated as content.
const CONTENT_TYPES = { "string": true, "number": true };

let globalIdCounter = 1;

function toString() {
    return this.node.nodeName;
}

export class ReactDOMComponent {
    static displayName = "ReactDOMComponent";

    _currentElement: ReactElement;
    _tag: string;
    rootNodeID: number;

    constructor(element: ReactElement) {
        const tag = element.type as string;
        this._currentElement = element;
        this._tag = tag.toLowerCase();
    }

    _createInitialChildren(props, lazyTree: HTMLElement) {
        const contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
        const childrenToUse = contentToUse != null ? null : props.children;

        if (contentToUse !== null) {
            lazyTree.textContent = contentToUse;
        } else if (childrenToUse !== null) {
            // TODO
        }
    }

    mountComponent() {
        this.rootNodeID = globalIdCounter++;
        const el = document.createElement(this._tag);
        this._createInitialChildren(this._currentElement.props, el);
        return {
            node: el,
            children: [],
            html: null,
            text: null,
            toString: toString
        };
    }
}