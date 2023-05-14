import { Avatar } from 'components/ui/Avatar';
import { Tooltip } from 'components/ui/Tooltip';
import { Typography } from 'components/ui/Typography';
import { type FC } from 'react';
import { type User } from 'types/user';
import styles from './UserCard.module.scss';

interface UserCardProps extends User {}

export const UserCard: FC<UserCardProps> = ({ email, name, phone, photo, position }) => {
	return (
		<div className={styles.wrapper}>
			<Avatar alt={name} src={photo} />
			<Tooltip title={name} position='bottom' mode='content'>
				<Typography className={`${styles.text} ${styles.name}`}>{name}</Typography>
			</Tooltip>
			<Typography className={styles.text}>{position}</Typography>
			<Typography className={styles.text}>{email}</Typography>
			<Typography className={styles.text}>{phone}</Typography>
		</div>
	);
};
