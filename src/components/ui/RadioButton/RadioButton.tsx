import { forwardRef, type InputHTMLAttributes, type PropsWithChildren } from 'react';
import styles from './RadioButton.module.scss';

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
	title: string;
}

export const RadioButton = forwardRef<HTMLInputElement, PropsWithChildren<RadioButtonProps>>(
	({ children, title, ...props }, ref) => {
		return (
			<label className={styles.label}>
				<input {...props} ref={ref} className={styles.input} type='radio' />
				<div className={styles.radio} />
				<span className={styles.title}>{title}</span>
			</label>
		);
	}
);

RadioButton.displayName = 'RadioButtonComponent';
