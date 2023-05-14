import { MainLayout } from 'components/layouts/MainLayout';
import { DeveloperDescription } from 'components/screens/home/DeveloperDescription';
import { UserRegistration } from 'components/screens/home/UserRegistration';
import { Users } from 'components/screens/home/Users';
import { type FC } from 'react';

export const HomePage: FC = () => {
	return (
		<MainLayout>
			<DeveloperDescription />
			<Users />
			<UserRegistration />
		</MainLayout>
	);
};
