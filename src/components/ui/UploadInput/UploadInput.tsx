import classNames from 'classnames';
import { forwardRef, useState, type ChangeEvent, type InputHTMLAttributes } from 'react';
import { HelperText } from '../HelperText';
import { Typography } from '../Typography';
import styles from './UploadInput.module.scss';

interface UploadInputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: boolean;
	fullWidth?: boolean;
	helperText?: string;
}

export const UploadInput = forwardRef<HTMLInputElement, UploadInputProps>(
	({ className = '', error = false, fullWidth, helperText = '', onChange, ...props }, ref) => {
		const [fileName, setFileName] = useState<string>('Upload your photo');

		const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
			const files = event.target?.files;
			if (files?.length) {
				const { name } = files[0];

				setFileName(name.length > 20 ? `${name.slice(0, 20)}...` : name);
			} else {
				setFileName('Upload your photo');
			}

			onChange?.(event);
		};

		return (
			<>
				<label
					className={classNames(styles.file_wrapper, {
						[styles.error]: error,
						[styles.fullWidth]: fullWidth,
						[className]: className,
					})}
				>
					<div className={styles.upload}>
						<Typography>Upload</Typography>
					</div>
					<div className={styles.file_name}>
						<Typography>{fileName}</Typography>
					</div>
					<input
						{...props}
						ref={ref}
						onChange={handleChange}
						className={styles.real_file}
						type='file'
					/>
				</label>
				{helperText && <HelperText error>{helperText}</HelperText>}
			</>
		);
	}
);

UploadInput.displayName = 'UploadInputComponent';
