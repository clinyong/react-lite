import { createElement } from "./ReactElement";
import { ReactComponent } from "./ReactComponent";
import { instantiateReactComponent } from "./instantiateReactComponent";
import * as ReactReconciler from "./ReactReconciler";

let topLevelRootCounter = 1;

class TopLevelWrapper extends ReactComponent {
    static isReactComponent = {};
    static isReactTopLevelWrapper = true;

    rootID: number;

    constructor(props) {
        super(props);

        this.rootID = topLevelRootCounter++;
    }

    render() {
        return this.props.children;
    }
}

function mountImageIntoNode(markup, container: HTMLElement) {
    container.insertBefore(markup.node, null);
}

// Mounts this component and inserts it into the DOM.
export function mountComponentIntoNode(wrapperInstance, container) {
    const markup = ReactReconciler.mountComponent(wrapperInstance);
    mountImageIntoNode(markup, container);
}

export function render(nextElement, container) {
    const nextWrappedElement = createElement(TopLevelWrapper, { children: nextElement });
    const componentInstance = instantiateReactComponent(nextWrappedElement, false);

    mountComponentIntoNode(componentInstance, container);
}