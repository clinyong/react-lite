//
// Component Specs and Lifecycle
// ----------------------------------------------------------------------

interface ComponentLifecycle {
    componentWillMount?(): void;
    componentDidMount?(): void;
}

export class ReactComponent implements ComponentLifecycle {
    static isReactElement = true;
    props: any;
    state: any;
    context: any;
    refs: any;

    constructor(props) {
        this.props = props;
    }

    forceUpdate() {}
    setState() {}
    render(): any {}
}