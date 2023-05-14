import classNames from 'classnames';
import { type FC, type PropsWithChildren } from 'react';
import styles from './Container.module.scss';

interface ContainerProps {
	className?: string;
	fluent?: boolean;
}

export const Container: FC<PropsWithChildren<ContainerProps>> = ({
	className = '',
	children,
	fluent,
}) => {
	return (
		<div
			className={classNames(styles.container, { [styles.fluent]: fluent, [className]: className })}
		>
			{children}
		</div>
	);
};
