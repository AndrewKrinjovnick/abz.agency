import { Button } from 'components/ui/Button';
import { Container } from 'components/ui/Container/Container';
import { Logo } from 'components/ui/Logo';
import { screenSizes } from 'config/sizes';
import { useWindowSize } from 'hooks/useWindowSize';
import { type FC } from 'react';
import styles from './Header.module.scss';

export const Header: FC = () => {
	const { width } = useWindowSize();

	return (
		<div className={styles.wrapper}>
			<Container className={styles.container} fluent={width > screenSizes.xl}>
				<Logo />
				<div className={styles.buttons_wrapper}>
					<a href='#users'>
						<Button>Users</Button>
					</a>
					<a href='#signup'>
						<Button>Sign up</Button>
					</a>
				</div>
			</Container>
		</div>
	);
};
