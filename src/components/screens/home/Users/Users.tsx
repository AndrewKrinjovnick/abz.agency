import { useInfiniteQuery } from '@tanstack/react-query';
import { Button } from 'components/ui/Button';
import { HelperText } from 'components/ui/HelperText';
import { Loader } from 'components/ui/Loader';
import { Fragment, type FC } from 'react';
import { UserService } from 'services/user-service/user.service';
import { type GetUsersResponse } from 'services/user-service/user.service.types';
import { HomeSectionWrapper } from '../HomeSectionWrapper';
import { UserCard } from './UserCard';
import styles from './Users.module.scss';

export const Users: FC = () => {
	const { error, data, isLoading, isSuccess, isFetching, hasNextPage, fetchNextPage } =
		useInfiniteQuery<GetUsersResponse, Error, GetUsersResponse>(
			['users'],
			async ({ pageParam = 1 }) => await UserService.getUsers({ page: pageParam, count: 6 }),
			{
				getNextPageParam: lastPage => {
					if (!lastPage.links.next_url) return undefined;
					return lastPage.page + 1;
				},
			}
		);

	const getMoreUsers = (): void => {
		fetchNextPage();
	};

	if (isLoading) {
		return (
			<HomeSectionWrapper title='Working with GET request'>
				<div className={styles.loader_wrapper}>
					<Loader />
				</div>
			</HomeSectionWrapper>
		);
	}

	return (
		<HomeSectionWrapper title='Working with GET request' id='users'>
			{isSuccess && (
				<div className={styles.users}>
					{data.pages.map((page, index) => (
						<Fragment key={index}>
							{page.users.map(user => (
								<UserCard key={user.id} {...user} />
							))}
						</Fragment>
					))}
				</div>
			)}
			{isFetching ? (
				<Loader />
			) : (
				hasNextPage &&
				!error && (
					<div className={styles.button_wrapper}>
						<Button onClick={getMoreUsers}>Show more</Button>
					</div>
				)
			)}
			{!!error && <HelperText error>{error.message}</HelperText>}
		</HomeSectionWrapper>
	);
};
