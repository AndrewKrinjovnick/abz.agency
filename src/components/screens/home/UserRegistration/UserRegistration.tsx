import { type FC } from 'react';
import { HomeSectionWrapper } from '../HomeSectionWrapper';
import { UserRegistrationForm } from './UserRegistrationForm';

export const UserRegistration: FC = () => {
	return (
		<HomeSectionWrapper title='Working with POST request' id='signup'>
			<UserRegistrationForm />
		</HomeSectionWrapper>
	);
};
