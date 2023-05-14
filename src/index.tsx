import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from 'components/layouts/ErrorBoundary';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient: QueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 4 * 60 * 1000,
			retry: 3,
			retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
		},
	},
});

root.render(
	<React.StrictMode>
		<ErrorBoundary>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</ErrorBoundary>
	</React.StrictMode>
);
