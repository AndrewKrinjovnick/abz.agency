import { Button } from 'components/ui/Button';
import { Container } from 'components/ui/Container/Container';
import { Typography } from 'components/ui/Typography';
import { type FC } from 'react';
import styles from './DeveloperDescription.module.scss';

export const DeveloperDescription: FC = () => {
	return (
		<section className={styles.section}>
			<Container fluent className={styles.container}>
				<div className={styles.wrapper}>
					<Typography className={styles.header} variant='h1'>
						Test assignment for front-end developer
					</Typography>
					<Typography className={styles.text}>
						What defines a good front-end developer is one that has skilled knowledge of HTML, CSS,
						JS with a vast understanding of User design thinking as they&apos;ll be building web
						interfaces with accessibility in mind. They should also be excited to learn, as the
						world of Front-End Development keeps evolving.
					</Typography>
					<a href='#signup'>
						<Button>Sign up</Button>
					</a>
				</div>
			</Container>
		</section>
	);
};
