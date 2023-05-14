import classNames from 'classnames';
import { type FC, type PropsWithChildren } from 'react';
import { Typography } from '../Typography';
import styles from './HelperText.module.scss';

interface HelperTextProps {
	error?: boolean;
	className?: string;
}

export const HelperText: FC<PropsWithChildren<HelperTextProps>> = ({
	children,
	className = '',
	error = false,
}) => {
	return (
		<Typography
			variant='caption'
			className={classNames(styles.text, { [className]: className, [styles.error]: error })}
		>
			{children}
		</Typography>
	);
};
