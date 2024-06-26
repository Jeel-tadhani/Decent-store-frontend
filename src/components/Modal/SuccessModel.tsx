import { PropsWithChildren } from "react";
import Modal from "../comman/Modal";
import SuccessModelImage from "/assets/images/SuccessModelImage.png";

interface SuccessModelProps extends PropsWithChildren {
	open: boolean;
	onClose: () => void;
	title: string;
}

const SuccessModel = ({ open, onClose, title }: SuccessModelProps) => {
	return (
		<Modal
			open={open}
			onClose={onClose}
			className="flex flex-col items-center w-full sm:w-[459px] rounded-[15px]">
			<div className="flex flex-col items-center font-inter">
				<img
					src={SuccessModelImage}
					alt="success model image"
					className="sm:h-[186.47] h-32"
				/>
				<h2 className="font-semibold  text-xl text-[#58BA66] sm:mt-[50px] mt-6 leading-[30px]">
					Well done
				</h2>
				<p className="font-medium mt-[6px] text-sm">{title}</p>
			</div>
		</Modal>
	);
};
export default SuccessModel;
