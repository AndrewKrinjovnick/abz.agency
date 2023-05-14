import { useEffect, useState } from 'react';

export const useValidImage = (src: string): boolean => {
	const [validImage, setValidImage] = useState<boolean>(true);

	useEffect(() => {
		const image = new Image();
		image.src = src;
		image.onerror = () => {
			setValidImage(false);
		};
	}, [src]);

	return validImage;
};
