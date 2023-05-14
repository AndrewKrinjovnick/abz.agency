import { Component, type ReactElement } from 'react';

class ErrorBoundary extends Component<{ children: ReactElement }, { hasError: boolean }> {
	state = { hasError: false };

	static getDerivedStateFromError(): { hasError: boolean } {
		return { hasError: true };
	}

	render(): ReactElement {
		if (this.state.hasError) {
			return (
				<div>
					<h3>Oops... something went wrong</h3>
					<p>We apologize and are fixing the problem</p>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
