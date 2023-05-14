import { type RegisterOptions } from 'react-hook-form';
import { bytesToMegabytes } from 'utils/bytesToMegabytes';

export const validEmailReg =
	/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
const requiredField = 'Required field';

export const phoneReg =
	/^\+38 \((039|067|068|096|097|098|050|066|095|099|063|073|093|091|092|089|094)\) \d{3} - \d{2} - \d{2}$/;

export const emailValidator: RegisterOptions = {
	minLength: {
		value: 2,
		message: 'At least 2 characters',
	},
	maxLength: {
		value: 100,
		message: 'Less than 100 characters',
	},
	pattern: {
		value: validEmailReg,
		message: 'Incorrect email address entered',
	},
	required: requiredField,
};

export const nameValidator: RegisterOptions = {
	minLength: {
		value: 2,
		message: 'At least 2 characters',
	},
	maxLength: {
		value: 60,
		message: 'Less than 60 characters',
	},
	required: requiredField,
};

export const phoneValidator: RegisterOptions = {
	pattern: {
		value: phoneReg,
		message: 'Enter your name in Latin',
	},
	required: requiredField,
};

export const avatarValidator: RegisterOptions = {
	validate: {
		maxSize: (files: FileList) => {
			const file = files[0];

			if (bytesToMegabytes(file.size) > 5) return 'The file must be less than 5mb';
		},
		minSizes: async (files: FileList) => {
			const file = files[0];
			const minSize = 70;
			let width = 0;
			let height = 0;

			if (!file.type.includes('image')) return 'Not a picture is selected';

			return await new Promise(resolve => {
				const img = new Image();

				img.onload = function () {
					width = img.width;
					height = img.height;

					if (width < minSize || height < minSize) {
						resolve('Minimum dimensions 70x70');
					}

					resolve(true);
				};

				img.src = window.URL.createObjectURL(file);
			});
		},
	},
	required: 'File is required',
};
