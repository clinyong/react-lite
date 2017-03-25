import { ReactElement } from "./ReactElement";
import { ReactCompositeComponent } from "./ReactCompositeComponent";
import { ReactDOMComponent } from "./ReactDOMComponent";

export function instantiateReactComponent(node: ReactElement, shouldHaveDebugID: boolean) {
    let instance: ReactCompositeComponent | ReactDOMComponent | null = null;

    if (typeof node === "object") {
        if (typeof node.type === "function") {
            instance = new ReactCompositeComponent(node);
        } else if (typeof node.type === "string") {
            instance = new ReactDOMComponent(node);
        }
    }

    if (!instance) {
        throw new Error("Unknown node type");
    }

    return instance;
}