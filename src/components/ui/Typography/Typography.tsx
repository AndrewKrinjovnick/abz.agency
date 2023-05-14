import classNames from 'classnames';
import { forwardRef, type PropsWithChildren } from 'react';
import styles from './Typography.module.scss';

interface TypographyProps {
	className?: string;
	variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
}

export const Typography = forwardRef<
	HTMLDivElement | HTMLHeadingElement,
	PropsWithChildren<TypographyProps>
>(({ children, className = '', variant = 'body' }, ref) => {
	const classN = classNames([styles[variant], { [className]: className }]);

	if (['h1'].includes(variant)) {
		return (
			<h1 className={classN} ref={ref}>
				{children}
			</h1>
		);
	}

	return (
		<div className={classN} ref={ref}>
			{children}
		</div>
	);
});

Typography.displayName = 'TypographyComponent';
