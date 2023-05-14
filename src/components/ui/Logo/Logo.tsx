import logo from 'assets/Logo.svg';
import { type FC } from 'react';

export const Logo: FC = () => {
	return <img src={logo} alt='logo' width={104} height={26} />;
};
