import { PropsWithChildren } from "react";
import Modal from "../comman/Modal";
import cross from "/assets/icons/cross.svg";
import { Button } from "../ui/button";

interface AreYouSureModalProps extends PropsWithChildren {
	open: boolean;
	onClose: () => void;
	onDelete: () => void;
	value: string;
}

const AreYouSureModal = ({
	open,
	onClose,
	onDelete,
	value,
	children,
}: AreYouSureModalProps) => {
	return (
		<Modal open={open as boolean} onClose={onClose}>
			<div className="text-center">
				<div className="flex justify-center">
					<img src={cross} alt="" />
				</div>
				<h2 className="mt-[26px] text-[24px] font-bold">Are you sure</h2>
				<p className="mt-[19px] text-[16px]">
					Do you want to delete <span className="font-bold">{value}</span>{" "}
					record?
				</p>
				<div className="mt-[49px] flex justify-center gap-[14px]">
					<Button
						className="bg-[#FF5252] text-[16px] font-semibold px-[30px] py-[15px]"
						onClick={onClose}>
						NO
					</Button>
					<Button
						className="bg-[#58BA66] text-[16px] font-semibold px-[30px] py-[15px]"
						onClick={onDelete}>
						YES
					</Button>
				</div>
			</div>

			{children}
		</Modal>
	);
};
export default AreYouSureModal;
