import photoCover from 'assets/photo-cover.svg';
import classNames from 'classnames';
import { useValidImage } from 'hooks/useValidImage';
import { type FC, type ImgHTMLAttributes } from 'react';
import styles from './Avatar.module.scss';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
	src: string;
}

export const Avatar: FC<AvatarProps> = ({ className = '', src, ...props }) => {
	const validImage = useValidImage(src);

	return (
		<div className={classNames(styles.wrapper, { [className]: className })}>
			{validImage ? (
				<img src={src} className={styles.avatar} {...props} />
			) : (
				<img src={photoCover} {...props} />
			)}
		</div>
	);
};
