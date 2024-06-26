import React, { ChangeEvent } from "react";

interface InputProps {
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	name: string;
	className?: string;
	onBlur: (event: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
}

const Input: React.FC<InputProps> = ({
	value,
	onChange,
	className,
	...rest
}) => {
	return (
		<div>
			<input
				value={value}
				onChange={onChange}
				className={`border-[1.53px] border-solid border-[#DFDFDF] rounded-[4px] pl-4 pr-10 ${
					className || ""
				}`}
				{...rest}
			/>
		</div>
	);
};

export default Input;
