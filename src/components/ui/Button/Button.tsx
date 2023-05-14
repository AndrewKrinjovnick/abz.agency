import classNames from 'classnames';
import { type ButtonHTMLAttributes, type FC, type PropsWithChildren } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	fullWidth?: boolean;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
	children,
	className = '',
	fullWidth = false,
	type = 'button',
	...props
}) => {
	return (
		<button
			{...props}
			type={type}
			className={classNames(styles.btn, {
				[className]: className,
				[styles.fullWidth]: fullWidth,
			})}
		>
			{children}
		</button>
	);
};
