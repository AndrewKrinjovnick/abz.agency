import { useEffect, useState } from 'react';

interface Sizes {
	width: number;
	height: number;
}

export const useWindowSize = (): Sizes => {
	const [windowSize, setWindowSize] = useState<Sizes>({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const handleResize = (): void => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener('resize', handleResize);

		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return windowSize;
};
