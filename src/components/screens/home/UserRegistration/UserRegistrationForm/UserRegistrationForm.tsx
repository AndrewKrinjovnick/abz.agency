import { useQuery } from '@tanstack/react-query';
import successImage from 'assets/success-image.svg';
import { type AxiosError } from 'axios';
import { Button } from 'components/ui/Button';
import { HelperText } from 'components/ui/HelperText';
import { Input } from 'components/ui/Input';
import { Loader } from 'components/ui/Loader';
import { RadioButton } from 'components/ui/RadioButton';
import { Typography } from 'components/ui/Typography';
import { UploadInput } from 'components/ui/UploadInput';
import { avatarValidator, emailValidator, nameValidator, phoneValidator } from 'config/validator';
import { useCreateUserMutation } from 'hooks/useCreateUserMutation';
import { useEffect, type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { UserService } from 'services/user-service/user.service';
import { type GetUserPositionsResponse } from 'services/user-service/user.service.types';
import { withHookFormMask } from 'use-mask-input';
import { getNumbers } from 'utils/getNumbers';
import styles from './UserRegistrationForm.module.scss';
import { type UserFormFields } from './UserRegistrationForm.types';

export const UserRegistrationForm: FC = () => {
	const {
		error: createUserError,
		mutate: createUser,
		isLoading: isCreateUserLoading,
		isSuccess: isCreateUserSuccess,
	} = useCreateUserMutation();

	const {
		error: positionsError,
		data: positionsResponse,
		isSuccess: isPositionsSuccess,
		isLoading: isPositionsLoading,
	} = useQuery<GetUserPositionsResponse, AxiosError>({
		queryKey: ['positions'],
		queryFn: UserService.getUserPositions,
	});

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid },
	} = useForm<UserFormFields>({
		defaultValues: {
			email: '',
			name: '',
			phone: '',
		},
		mode: 'onChange',
		shouldFocusError: true,
	});

	const onSubmit: SubmitHandler<UserFormFields> = ({ file: files, phone, ...data }) => {
		const file = files[0];
		const formData = new FormData();
		formData.append('photo', file);
		formData.append('phone', `+${getNumbers(phone)}`);
		Object.entries(data).forEach(([key, field]) => {
			formData.append(key, field);
		});

		createUser(formData);
	};

	useEffect(() => {
		isPositionsSuccess && setValue('position_id', positionsResponse.positions[0].id.toString());
	}, [positionsResponse]);

	if (isCreateUserSuccess) {
		return (
			<div className={styles.form}>
				<img src={successImage} alt='success' className={styles.wrapper} />
			</div>
		);
	}

	if (isPositionsLoading || isCreateUserLoading) {
		return <Loader />;
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.wrapper}>
				<div className={styles.text_input_wrapper}>
					<Input
						{...register('name', nameValidator)}
						label='Your name'
						fullWidth
						error={!!errors.name}
						helperText={errors?.name?.message}
					/>
					<Input
						{...register('email', emailValidator)}
						label='Email'
						fullWidth
						error={!!errors.email}
						helperText={errors?.email?.message}
					/>
					<Input
						{...withHookFormMask(register('phone', phoneValidator), '+38 (999) 999 - 99 - 99')}
						label='Phone'
						fullWidth
						helperText='+38 (XXX) XXX - XX - XX'
						error={!!errors.phone}
					/>
				</div>
				<div className={styles.radio_group}>
					<Typography>Select your position</Typography>
					{isPositionsSuccess &&
						positionsResponse.positions.map(({ id, name }) => (
							<RadioButton key={id} {...register('position_id')} value={id} title={name} />
						))}
				</div>
				<UploadInput
					{...register('file', avatarValidator)}
					className={styles.file}
					fullWidth
					accept='image/*, .png, .jpg, .web'
					error={!!errors.file}
					helperText={errors?.file?.message}
				/>

				{(!!positionsError || !!createUserError) && (
					<HelperText error>{positionsError?.message ?? createUserError?.message}</HelperText>
				)}
				<div className={styles.button_wrapper}>
					<Button type='submit' disabled={!isValid}>
						Sign up
					</Button>
				</div>
			</div>
		</form>
	);
};
