import { ReactElement, StatelessComponent } from "./ReactElement";
import { ReactComponent } from "./ReactComponent";
import { ReactDOMComponent } from "./ReactDOMComponent";
import { instantiateReactComponent } from "./instantiateReactComponent";
import * as ReactReconciler from "./ReactReconciler";

let nextMountID = 1;

export class ReactCompositeComponent {
    _currentElement: ReactElement;
    _mountOrder: number;
    _instance: ReactComponent | ReactElement;
    _renderedComponent: ReactCompositeComponent | ReactDOMComponent;

    constructor(element) {
        this._currentElement = element;
    }

    _constructComponent(publicProps): ReactElement {
        let Component = this._currentElement.type as typeof ReactComponent;

        if (Component.isReactElement) {
            const inst = new Component(publicProps);
            return inst.render();
        } else {
            let Component = this._currentElement.type as StatelessComponent;
            return Component(publicProps);
        }
    }

    performInitialMount(renderedElement: ReactElement) {
        const child = instantiateReactComponent(renderedElement, true);
        this._renderedComponent = child;
        const markup = ReactReconciler.mountComponent(child);
        return markup;
    }

    mountComponent() {
        this._mountOrder = nextMountID++;
        const publicProps = this._currentElement.props;
        let renderedElement = this._constructComponent(publicProps);

        const markup = this.performInitialMount(renderedElement);
        return markup;
    }
}