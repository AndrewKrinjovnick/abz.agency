import { Container } from 'components/ui/Container/Container';
import { Typography } from 'components/ui/Typography';
import { screenSizes } from 'config/sizes';
import { useWindowSize } from 'hooks/useWindowSize';
import { type FC, type PropsWithChildren } from 'react';
import styles from './HomeSectionWrapper.module.scss';

interface HomeSectionWrapperProps {
	id?: string;
	title: string;
}

export const HomeSectionWrapper: FC<PropsWithChildren<HomeSectionWrapperProps>> = ({
	children,
	id,
	title,
}) => {
	const { width } = useWindowSize();

	return (
		<section className={styles.wrapper} id={id}>
			<Container fluent={width > screenSizes.xl}>
				<Typography variant='h2' className={styles.title}>
					{title}
				</Typography>
				{children}
			</Container>
		</section>
	);
};
