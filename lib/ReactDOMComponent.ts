import { ReactElement } from "./ReactElement";
import { instantiateReactComponent } from "./instantiateReactComponent";
import * as ReactReconciler from "./ReactReconciler";

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

    mountChildren(nestedChildren) {
        const type = typeof nestedChildren;
        if (type === "undefined" || type === "boolean") {
            nestedChildren = null;
        }

        const renderedChildren = [].concat(nestedChildren).map(child => instantiateReactComponent(child, true));
        const mountImages = renderedChildren.map(child => ReactReconciler.mountComponent(child));

        return mountImages;
    }

    _createInitialChildren(props, lazyTree: HTMLElement) {
        const contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
        const childrenToUse = contentToUse != null ? null : props.children;

        if (contentToUse !== null) {
            lazyTree.textContent = contentToUse;
        } else if (childrenToUse !== null) {
            const mountImages = this.mountChildren(childrenToUse);
            for (let child of mountImages) {
                lazyTree.appendChild(child.node);
            }
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