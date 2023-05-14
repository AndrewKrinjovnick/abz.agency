import { useEffect, useState } from 'react';

export const useMount = (open: boolean, duration = 300): boolean => {
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		if (open && !mounted) {
			setMounted(true);
			return;
		}

		if (!open && mounted) {
			setTimeout(() => {
				setMounted(false);
			}, duration);
		}
	}, [open, duration]);

	return mounted;
};
