import { useState } from "react";
import WarningIcon from "./icons/WarningIcon";

type Props = {
	label: string;
	name: string;
	type?: 'text' | 'email';
	value: string;
	onChange: (key: string, value: string) => void;
}

const TextField = ({ label, name, type = 'text', value, onChange }: Props) => {
	const [isInputFocused, setIsInputFocused] = useState(false)
	const [error, setError] = useState(false)

	const validateEmail = (value: string) => {
		if (type === 'email') {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(value);
		}
		return true;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(name, e.target.value)
	}

	const handleFocus = () => setIsInputFocused(true)

	const handleBlur = () => {
		setIsInputFocused(false)
		setError(!validateEmail(value));
	}

	const baseStyle = 'text-base font-medium rounded-lg pl-4 h-12 w-full'
	let stateStyle = ''

	if (error) {
		stateStyle = 'border-2 border-danger-100 bg-danger-50';
	} else if (isInputFocused) {
		stateStyle = 'border-2 border-active-100 bg-active-50';
	} else {
		stateStyle = 'border border-lavander-100 bg-white';
	}

	return (
		<div>
			<label
				htmlFor={name}
				className='font-normal text-base block mb-2'
			>
				{label}
			</label>
			<input
				type={type}
				id={name} name={name}
				value={value}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				className={`${baseStyle} ${stateStyle}`}
				aria-invalid={error}
        aria-describedby={error ? `${name}-error` : undefined}
        required
			/>
			{
				error &&
				<div className='flex gap-2 mt-2.25'>
					<div>
						<WarningIcon aria-hidden='true' />
					</div>
					<div className=''>
						<p>Please use correct formatting</p>
						<p>Example: address@email.com</p>
					</div>
				</div>
			}
		</div>
	)
}

export default TextField