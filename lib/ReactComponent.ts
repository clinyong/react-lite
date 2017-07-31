//
// Component Specs and Lifecycle
// ----------------------------------------------------------------------

export class ReactComponent<P, S> {
	static isReactElement = true;
	props: any;
	state: S;
	context: any;
	refs: any;

	constructor(props?: P) {
		this.props = props;
	}

	forceUpdate() {}
	setState() {}
	render(): any {}
}
