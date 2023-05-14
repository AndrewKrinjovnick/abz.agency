import classNames from 'classnames';
import {
	forwardRef,
	useEffect,
	useRef,
	useState,
	type ChangeEvent,
	type InputHTMLAttributes,
} from 'react';
import { HelperText } from '../HelperText';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: boolean;
	fullWidth?: boolean;
	helperText?: string;
	label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			error = false,
			className = '',
			fullWidth = false,
			helperText = '',
			label = '',
			onChange,
			...props
		},
		ref
	) => {
		const [value, setValue] = useState<string>(props?.value?.toString() ?? '');
		const wrapperRef = useRef<HTMLDivElement | null>(null);

		const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
			setValue(event.target.value);

			onChange?.(event);
		};

		useEffect(() => {
			const wrapper = wrapperRef.current;

			if (wrapper) {
				const input = wrapper?.children[0] as HTMLInputElement;
				setValue(input.value);
			}
		}, [wrapperRef]);

		return (
			<div className={classNames(styles.wrapper, { [styles.fullWidth]: fullWidth })}>
				<div
					className={classNames(
						styles.input_wrapper,
						{ [className]: className },
						{ [styles.error]: error }
					)}
					ref={wrapperRef}
				>
					<input
						{...props}
						ref={ref}
						onChange={handleInput}
						className={classNames(styles.input, { [styles.has_content]: value })}
					/>
					<>
						<label className={styles.label}>{label}</label>
						<fieldset className={styles.shell}>
							<legend className={styles.legend}>
								<span>{label}</span>
							</legend>
						</fieldset>
					</>
				</div>
				{helperText && <HelperText error={error}>{helperText}</HelperText>}
			</div>
		);
	}
);

Input.displayName = 'InputComponent';
