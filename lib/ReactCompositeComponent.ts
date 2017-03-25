import { ReactElement } from "./ReactElement";
import { ReactComponent } from "./ReactComponent";
import { ReactDOMComponent } from "./ReactDOMComponent";
import { instantiateReactComponent } from "./instantiateReactComponent";
import * as ReactReconciler from "./ReactReconciler";

let nextMountID = 1;

export class ReactCompositeComponent {
    _currentElement: ReactElement;
    _mountOrder: number;
    _instance: ReactComponent | null;
    _renderedComponent: ReactCompositeComponent | ReactDOMComponent;

    constructor(element) {
        this._currentElement = element;
    }

    _constructComponent(publicProps) {
        let Component = this._currentElement.type;

        if (typeof Component !== "string") {
            return new Component(publicProps);
        }

        return null;
    }

    performInitialMount(renderedElement) {
        const inst = this._instance;

        // If not a stateless component, we now render
        if (renderedElement === undefined) {
            if (inst !== null) {
                renderedElement = inst.render();
            }
        }

        const child = instantiateReactComponent(renderedElement, true);
        this._renderedComponent = child;
        const markup = ReactReconciler.mountComponent(child);
        return markup;
    }

    mountComponent() {
        this._mountOrder = nextMountID++;
        const publicProps = this._currentElement.props;
        this._instance = this._constructComponent(publicProps);

        let renderedElement;
        const markup = this.performInitialMount(renderedElement);
        return markup;
    }
}